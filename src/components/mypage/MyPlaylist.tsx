import React, { useState } from 'react'
import CheckboxItem from './CheckboxItem'
import { getUserMyPlaylistData, updateMyMusicIds } from '@/shared/mypage/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { UserInfo } from '@/types/mypage/types'
import Image from 'next/image'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import { useSession } from 'next-auth/react'
import ButtonPrimary from './ButtonPrimary'
import { queryClient } from '@/app/provider'

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [checkedList, setCheckedList] = useState<string[]>([])

  const { data: playlistMyData } = useQuery({
    queryFn: () => getUserMyPlaylistData(uid),
    queryKey: ['myMusicIds'], //data
    enabled: !!uid,
  })

  const playlistMyIds = playlistMyData?.playlistMyIds
  const myPlaylistData = playlistMyData?.myPlaylistData

  const { data: playlistCurrentData } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })

  const updateMyPlayListMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMusicIds'] })
      queryClient.invalidateQueries({ queryKey: ['getMyMusicList'] })
    },
  })

  const updateCurrentPlayListMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
  })

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  const onClickDeleteHandler = async () => {
    if (checkedList.length === 0) {
      alert('삭제할 노래를 선택해주세요!')
      return
    }
    const myMusicIds = playlistMyIds as string[]
    const newData = myMusicIds.filter((el) => !checkedList.includes(el))

    try {
      await updateMyPlayListMutation.mutateAsync({
        userId: uid,
        myMusicIds: newData,
      })
      alert('삭제가 완료되었습니다.')
      setCheckedList([])
    } catch (error) {
      console.log(error)
    }
  }

  const onClickAddHandler = () => {
    if (checkedList.length === 0) {
      alert('추가할 노래를 선택해주세요!')
      return
    }

    const playListCurrentIds = !playlistCurrentData?.[0].currentMusicIds
      ? []
      : playlistCurrentData?.[0]?.currentMusicIds
    let newData = []

    if ((playListCurrentIds?.length as number) > 0) {
      const addData = checkedList.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      if (addData.length === 0) {
        alert(
          `선택하신 ${checkedList.length}개의 곡 모두 이미 추가되어 있습니다.`,
        )
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      newData = [...checkedList]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })

      alert('추가가 완료되었습니다.')
      setCheckedList([])
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const onClickAllAddHandler = () => {
    const playListCurrentIds = !playlistCurrentData?.[0]?.currentMusicIds
      ? []
      : playlistCurrentData?.[0].currentMusicIds
    const playListMyIds = !playlistMyIds ? [] : playlistMyIds
    let newData = []

    if (playListMyIds?.length === 0) {
      alert('추가할 곡이 없습니다.')
      return
    }

    if ((playListCurrentIds?.length as number) > 0) {
      const addData = playListMyIds.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      if (addData.length === 0) {
        alert(`${playListMyIds.length}개 모두 이미 추가되어 있습니다.`)
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      newData = [...playListMyIds]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })
      alert('추가가 완료되었습니다.')
      setCheckedList([])
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const shadow =
    'shadow-[-4px_-4px_8px_rgba(255,255,255,0.05),4px_4px_8px_rgba(0,0,0,0.7)]'

  return (
    <div className='mt-[5rem]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[1.25rem] font-bold'>
          {data?.nickname}님의 플레이리스트
        </h2>
        <ButtonPrimary onClick={onClickAllAddHandler}>전체 담기</ButtonPrimary>
      </div>
      <div
        className={`fixed bottom-10 flex min-w-[232px] items-center rounded-2xl border-2 border-[rgba(0,0,0,0.05)] ${shadow} overflow-hidden bg-[#ffffff19] backdrop-blur-sm`}
        style={{ left: 'calc(50% + (388px / 2) - 56px)' }}
      >
        <button
          type='button'
          onClick={onClickDeleteHandler}
          className='w-1/2 p-4'
        >
          삭제
        </button>
        <button
          type='button'
          onClick={onClickAddHandler}
          className='w-1/2 border-l border-l-[rgba(255,255,255,0.5)] p-4'
        >
          {checkedList.length}곡 담기
        </button>
      </div>
      <ul className='tracking-[-0.03em]'>
        {myPlaylistData && myPlaylistData?.length > 0
          ? myPlaylistData?.map((item) => {
              return (
                <li
                  key={item.musicId}
                  className='flex items-center justify-between p-4'
                >
                  <div className='flex items-center'>
                    <CheckboxItem
                      checked={checkedList.includes(item.musicId)}
                      id={`my-${item.musicId}`}
                      onChangeCheckMusicHandler={(e) =>
                        onChangeCheckMusicHandler(
                          e.target.checked,
                          item.musicId,
                        )
                      }
                    />
                    <figure className='ml-7 mr-4 overflow-hidden rounded-full'>
                      <Image
                        src={item.thumbnail}
                        width={56}
                        height={56}
                        alt={`${item.musicTitle} 앨범 이미지`}
                      />
                    </figure>
                    <label
                      htmlFor={`my-${item.musicId}`}
                      className='flex flex-col'
                    >
                      <span className='text-[1.125rem]'>{item.musicTitle}</span>
                      <span className='text-[0.875rem] text-[#ffffff7f]'>
                        {item.artist}
                      </span>
                    </label>
                  </div>
                  <span className='text-[0.875rem] font-medium text-[#ffffff7f]'>
                    {item.runTime}
                  </span>
                </li>
              )
            })
          : '데이터가 없습니다'}
      </ul>
    </div>
  )
}

export default MyPlaylist
