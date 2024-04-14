'use client'
import musicList from '@/../public/images/musicList.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import { getMusicList } from '@/query/musicPlayer/musicPlayerQueryKey'
import { insertCurrentMusic, updateCurrentMusic } from '@/shared/main/api'
import { insertMyPlayMusic, updateMyPlayMusic } from '@/shared/musicPlayer/api'
import { useSearchedResultStore } from '@/shared/store/searchStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

  const { playListCurrent, myPlayList } = getMusicList(uid)

  const insertCurrentMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
  })
  const updateCurrentMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
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
    <div className='flex h-[440px] w-[732px] flex-col'>
      {musicData.map((item) => {
        return (
          <li
            key={item.musicId}
            className='flex h-[88px] w-[732px] list-none items-start gap-[19px] p-[16px]'
          >
            <div className='flex h-[56px] w-[588px] gap-[16px]'>
              <div className='h-[56px] w-[56px]'>
                <Image
                  src={item.thumbnail}
                  width={56}
                  height={56}
                  alt={`${item.musicTitle} 앨범 썸네일`}
                  className='rounded-full'
                />
              </div>
              <div className='flex h-[48px] w-[516px] items-center justify-between pr-[32px]'>
                <div className='flex flex-col gap-[3px]'>
                  <span className='text-[18px] font-bold'>
                    {item.musicTitle}
                  </span>
                  <span className='text-[14px] font-bold opacity-[50%]'>
                    {item.artist}
                  </span>
                </div>
                <span className='text-[14px]  opacity-[50%]'>
                  {item.runTime}
                </span>
              </div>
            </div>
            <div className='h-48px flex w-[122px] gap-[16px]'>
              <button
                onClick={() => onClickAddCurrentMusicHandler(item.musicId)}
              >
                <Image
                  src={musicList}
                  width={48}
                  height={48}
                  alt='현재 플레이리스트 등록 버튼'
                />
              </button>
              <button onClick={() => onClickAddMyPlayListHandler(item.musicId)}>
                <Image
                  src={myPlayListButton}
                  width={48}
                  height={48}
                  alt='마이플레이리스트 등록 버튼'
                />
              </button>
            </div>
          </li>
        )
      })}
    </div>
  )
}
export default SearchedMusicData
