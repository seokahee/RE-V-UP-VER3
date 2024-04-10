import { getUserPlaylistMyMusicInfoData } from '@/shared/mypage/api'
import type { UserInfo } from '@/types/mypage/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import CheckboxItem from '../mypage/CheckboxItem'
import Image from 'next/image'
import { useStore } from '@/shared/store'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import LockContens from './LockContents'

const UserPlaylist = ({
  data,
  isVisibility,
}: {
  data: UserInfo
  isVisibility: boolean
}) => {
  const { userInfo } = useStore()
  const [checkedList, setCheckedList] = useState<string[]>([])
  // const [myCurrentMusicList, setMyCurrentMusicList] = useState<string[]>([])

  const queryClient = useQueryClient()

  const { data: myPlaylistCurrentData } = useQuery({
    queryFn: () => getCurrentMusicData(userInfo.uid),
    queryKey: ['playListCurrent', userInfo.uid],
    enabled: !!userInfo.uid,
  })

  const { data: userPlaylistMyData } = useQuery({
    queryFn: () =>
      getUserPlaylistMyMusicInfoData(
        data?.playlistMy?.[0].myMusicIds as string[],
      ),
    queryKey: ['userMyMusicIds', data?.playlistMy],
    enabled: !!data?.playlistMy?.length,
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
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

  const onClickAddHandler = () => {
    if (checkedList.length === 0) {
      alert('추가할 노래를 선택해주세요!')
      return
    }

    const myCurrentMusicIds = myPlaylistCurrentData?.[0].currentMusicIds!
    let newData = []

    if ((myCurrentMusicIds?.length as number) > 0) {
      const addData = checkedList.filter(
        (el) => !myCurrentMusicIds.includes(el),
      )

      if (addData.length === 0) {
        alert(
          `선택하신 ${checkedList.length}개의 곡 모두 이미 추가되어 있습니다.`,
        )
        return
      }

      newData = [...myCurrentMusicIds, ...addData]
    } else {
      newData = [...checkedList]
    }

    updateMutation.mutate({
      userId: userInfo.uid,
      currentList: newData,
    })

    alert('추가가 완료되었습니다.')
    setCheckedList([])
  }

  const onClickAllAddHandler = () => {
    const userPlaylistCurrent = !data.playlistCurrent?.[0].currentMusicIds
      ? []
      : data.playlistCurrent?.[0].currentMusicIds
    const myPlayListCurrent = !myPlaylistCurrentData?.[0].currentMusicIds
      ? []
      : myPlaylistCurrentData?.[0].currentMusicIds
    let newData = []
    if (userPlaylistCurrent?.length === 0) {
      alert('추가할 곡이 없습니다.')
      return
    }
    if ((myPlayListCurrent?.length as number) > 0) {
      // const set = new Set([...myPlayListCurrent, ...userPlaylistCurrent])
      // const arr = Array.from(set)

      const addData = userPlaylistCurrent.filter(
        (el) => !myPlayListCurrent!.includes(el),
      )

      if (addData.length === 0) {
        alert(`${userPlaylistCurrent.length}개 모두 이미 추가되어 있습니다.`)
        return
      }

      newData = [...myPlayListCurrent, ...addData]
    } else {
      newData = [...userPlaylistCurrent!]
    }
    debugger
    updateMutation.mutate({
      userId: userInfo.uid,
      currentList: newData,
    })
    alert('추가가 완료되었습니다.')
    setCheckedList([])
  }

  return (
    <div className='mt-[5rem]'>
      <h2>{data?.nickname}님의 플레이리스트</h2>
      {isVisibility ? (
        <>
          <button type='button' onClick={onClickAllAddHandler}>
            전체 재생 하기
          </button>
          <div>
            <button type='button' onClick={onClickAddHandler}>
              {checkedList.length}곡 재생
            </button>
          </div>
          <ul className='list-none'>
            {userPlaylistMyData?.map((item) => {
              return (
                <li key={item.musicId}>
                  <div>
                    <CheckboxItem
                      checked={checkedList.includes(item.musicId)}
                      id={item.musicId}
                      onChangeCheckMusicHandler={(e) =>
                        onChangeCheckMusicHandler(
                          e.target.checked,
                          item.musicId,
                        )
                      }
                    />
                    <figure>
                      <Image
                        src={item.thumbnail}
                        width={56}
                        height={56}
                        alt={`${item.musicTitle} 앨범 이미지`}
                      />
                    </figure>
                    <label htmlFor={item.musicId} className='flex flex-col'>
                      {item.musicTitle}
                      <span>{item.artist}</span>
                    </label>
                  </div>
                  <span>재생시간..</span>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <LockContens />
      )}
    </div>
  )
}

export default UserPlaylist
