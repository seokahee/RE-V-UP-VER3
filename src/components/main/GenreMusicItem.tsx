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
import plus from '@/../public/images/plus.svg'

const GenreMusicItem = ({ item }: { item: GenreMusicInfo }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['getCurrentMusicList'],
    enabled: !!uid,
  })

  const insertMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
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
    'shadow-[0px_4px_1px_-1px_#00000033,0px_4px_8px_#00000019,0px_0px_0px_1px_#ffffff19,inset_0px_-1px_2px_#00000033]'

  return (
    <li
      key={item.musicId}
      className={`mr-6 w-[144px] list-none bg-[#ffffff19] ${itemShadow} overflow-hidden rounded-[2rem] border-4 border-[#00000070] p-2 text-center`}
    >
      <div>
        <div className='group relative mb-2 h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-[#ffffff19] [&_img]:h-auto [&_img]:w-full'>
          <figure>
            <Image
              className='group-hover:blur-sm'
              src={item.thumbnail}
              width={120}
              height={120}
              alt={`${item.musicTitle} 앨범 썸네일`}
            />
          </figure>
          <button
            type='button'
            className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:block'
            onClick={() => onClickAddCurrentMusicHandler(uid, item.musicId)}
          >
            <Image
              src={plus}
              width={32}
              height={32}
              alt='현재 플레이리스트로 추가'
            />
          </button>
        </div>

        <strong className='text-white'>{item.musicTitle}</strong>
        <p className='text-sm font-semibold text-[#ffffff4c]'>{item.artist}</p>
      </div>
    </li>
  )
}

export default GenreMusicItem
