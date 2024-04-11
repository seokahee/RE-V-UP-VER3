'use client'
import {
  getCurrentMusicData,
  insertCurrentMusic,
  updateCurrentMusic,
} from '@/shared/main/api'
import { useSearchedResultStore } from '@/shared/store/searchStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchedMusicData = () => {
  const { searchedData } = useSearchedResultStore()
  const { musicData } = searchedData
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid

  console.log('userSessionInfo', userSessionInfo)
  console.log('uid', uid)

  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })

  const insertMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const onClickAddCurrentMusicHandler = (musicId: string) => {
    if (uid === '') {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds

      console.log('currentList', currentList)

      if (currentList.find((el) => el === musicId)) {
        alert('이미 추가된 노래입니다.') //이후에 삭제 예정
        return
      }
      currentList.push(musicId)
      updateMutation.mutate({ userId: uid, currentList: currentList })
    } else {
      insertMutation.mutate({ userId: uid, musicId })
    }
    alert('현재 재생목록에 추가 되었습니다.') //이후에 삭제 예정
  }
  return (
    <div>
      {musicData.map((item) => {
        return (
          <li key={item.musicId} className='w-[136px] p-2 mr-6 list-none'>
            <div className='relative w-[120px] h-[120px]'>
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
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                onClick={() => onClickAddCurrentMusicHandler(item.musicId)}
              >
                +
              </button>
            </div>
            <strong>{item.musicTitle}</strong>
            <span>{item.artist}</span>
          </li>
        )
      })}
    </div>
  )
}
export default SearchedMusicData
