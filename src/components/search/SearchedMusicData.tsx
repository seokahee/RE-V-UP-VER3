'use client'
import {
  getCurrentMusicData,
  insertCurrentMusic,
  updateCurrentMusic,
} from '@/shared/main/api'
import {
  getMyMusicList,
  insertMyPlayMusic,
  updateMyPlayMusic,
} from '@/shared/musicPlayer/api'
import { useSearchedResultStore } from '@/shared/store/searchStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchedMusicData = () => {
  const { searchedData } = useSearchedResultStore()
  const { musicData } = searchedData
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid as string
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })
  const insertCurrentMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })
  const updateCurrentMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: ['getMyMusicList', uid],
  })

  const insertMyMutation = useMutation({
    mutationFn: insertMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyMusicList'] })
    },
  })

  const updateMyMutation = useMutation({
    mutationFn: updateMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyMusicList'] })
    },
  })

  const onClickAddCurrentMusicHandler = (musicId: string) => {
    if (uid === '' || !uid) {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds

      if (currentList.find((el) => el === musicId)) {
        alert('이미 추가된 노래입니다.') //이후에 삭제 예정
        return
      }
      currentList.push(musicId)
      updateCurrentMutation.mutate({ userId: uid, currentList: currentList })
    } else {
      insertCurrentMutation.mutate({ userId: uid, musicId })
    }
    alert('현재 재생목록에 추가 되었습니다.') //이후에 삭제 예정
  }

  const onClickAddMyPlayListHandler = async (musicId: string) => {
    if (uid === '' || !uid) {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }
    if (window.confirm('마이플레이 리스트에 추가하시겠습니까?')) {
      if (myPlayList && myPlayList.length > 0) {
        const myList = myPlayList[0].myMusicIds

        if (myList.find((el) => el === musicId)) {
          alert('이미 추가된 노래입니다.')
          return
        }
        myList.push(musicId)
        updateMyMutation.mutate({ userId: uid, myMusicList: myList })
      } else {
        const myMusicId = [musicId]
        insertMyMutation.mutate({ userId: uid, musicId: myMusicId })
      }
      alert('마이플레이리스트에 추가 되었습니다.')
    }
  }

  return (
    <div>
      {musicData.map((item) => {
        return (
          <li key={item.musicId} className='mr-6 w-[136px] list-none p-2'>
            <div className='relative h-[120px] w-[120px]'>
              <figure>
                <Image
                  src={item.thumbnail}
                  width={120}
                  height={120}
                  alt={`${item.musicTitle} 앨범 썸네일`}
                />
              </figure>
              <button
                type='button'
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                onClick={() => onClickAddCurrentMusicHandler(item.musicId)}
              >
                +
              </button>
              <button
                type='button'
                className='absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2'
                onClick={() => onClickAddMyPlayListHandler(item.musicId)}
              >
                마플리
              </button>
            </div>
            <strong>{item.musicTitle}</strong>
            <span>{item.artist}</span>
            <span>{item.runTime}</span>
          </li>
        )
      })}
    </div>
  )
}
export default SearchedMusicData
