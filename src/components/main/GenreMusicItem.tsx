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
import Swal from 'sweetalert2'

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

  const onClickAddCurrentMusicHandler = async (
    userId: string,
    musicId: string,
  ) => {
    if (!userId) {
      await Swal.fire({
        icon: 'error',
        title:
          '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds
      if (currentList.find((el) => el === musicId)) {
        await Swal.fire({
          icon: 'warning',
          title: '이미 추가된 노래입니다.',
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }
      currentList.push(musicId)
      updateMutation.mutate({ userId, currentList })
    } else {
      insertMutation.mutate({ userId, musicId })
    }
    await Swal.fire({
      icon: 'success',
      title: '현재 재생목록에 추가 되었습니다.',
      showConfirmButton: false,
      timer: 1500,
      background: '#2B2B2B',
      color: '#ffffff',
    })
  }

  const itemShadow =
    'shadow-[0px_4px_1px_-1px_#00000033,0px_4px_8px_#00000019,0px_0px_0px_1px_#ffffff19,inset_0px_-1px_2px_#00000033]'

  return (
    <li
      key={item.musicId}
      className={`mr-6 w-[144px] list-none bg-[#ffffff19] ${itemShadow} overflow-hidden rounded-[2rem] border-4 border-[#00000070] p-2 text-center`}
    >
      <div>
        <div className='group relative mb-2 h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-[#ffffff19]'>
          <figure className='h-[120px] w-[120px] [&_img]:h-auto [&_img]:w-full'>
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
            className='absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center group-hover:flex [&_img]:h-[32px] [&_img]:w-[32px]'
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
