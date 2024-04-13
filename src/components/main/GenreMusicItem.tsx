import {
  getCurrentMusicData,
  insertCurrentMusic,
  updateCurrentMusic,
} from '@/shared/main/api'
import type { GenreMusicInfo } from '@/types/main/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSession } from 'next-auth/react'

const GenreMusicItem = ({ item }: { item: GenreMusicInfo }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

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

  const onClickAddCurrentMusicHandler = (userId: string, musicId: string) => {
    if (!userId) {
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
      updateMutation.mutate({ userId, currentList })
    } else {
      insertMutation.mutate({ userId, musicId })
    }
    alert('현재 재생목록에 추가 되었습니다.') //이후에 삭제 예정
  }

  const itemShadow =
    'shadow-[0px_4px_1px_-1px_#00000033,0px_4px_8px_#00000019,0px_0px_0px_1px_#ffffff19,inset_0px_2px_0px_#ffffff26,inset_0px_2px_0px_#00000019,inset_0px_-1px_2px_#00000033,inset_0px_-4px_1px_#00000033]'

  return (
    <li
      key={item.musicId}
      className={`mr-6 w-[136px] list-none bg-[#ffffff1a] ${itemShadow} overflow-hidden rounded-[2rem] border-4 border-[#0000001a] p-2 text-center`}
    >
      <div className='relative h-[120px] w-[120px] overflow-hidden rounded-full '>
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
          onClick={() => onClickAddCurrentMusicHandler(uid, item.musicId)}
        >
          +
        </button>
      </div>
      <strong className='text-white'>{item.musicTitle}</strong>
      <p className='text-sm font-semibold text-[#ffffff4c]'>{item.artist}</p>
    </li>
  )
}

export default GenreMusicItem
