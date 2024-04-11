import {
  getMyMusicCount,
  getUserPlaylistMyMusicInfoData,
} from '@/shared/mypage/api'
import type { UserInfo } from '@/types/mypage/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import CheckboxItem from '../mypage/CheckboxItem'
import Image from 'next/image'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import LockContents from './LockContents'
import Pagination from '../mypage/Pagination'
import { useSession } from 'next-auth/react'

const UserPlaylist = ({
  data,
  isVisibility,
}: {
  data: UserInfo
  isVisibility: boolean
}) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [checkedList, setCheckedList] = useState<string[]>([])
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)

  const { data: myPlaylistCurrentData } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent', uid],
    enabled: !!uid,
  })

  const { data: totalCount } = useQuery({
    queryFn: () =>
      getMyMusicCount(data?.playlistMy?.[0].myMusicIds as string[]),
    queryKey: ['myMusicAllCount'],
    enabled: !!data?.playlistMy?.length,
  })

  const PER_PAGE = 5
  const totalPages = Math.ceil(totalCount! / PER_PAGE)
  const start = (currentPage - 1) * PER_PAGE
  const end = currentPage * PER_PAGE - 1

  const { data: userPlaylistMyData } = useQuery({
    queryFn: () =>
      getUserPlaylistMyMusicInfoData(
        data?.playlistMy?.[0].myMusicIds as string[],
        start,
        end,
      ),
    queryKey: ['userMyMusicIds', currentPage],
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
      userId: uid,
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

    updateMutation.mutate({
      userId: uid,
      currentList: newData,
    })
    alert('추가가 완료되었습니다.')
    setCheckedList([])
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1)
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
            {userPlaylistMyData && userPlaylistMyData?.length > 0
              ? userPlaylistMyData?.map((item) => {
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
                      <span>{item.runTime}</span>
                    </li>
                  )
                })
              : '데이터가 없습니다'}
          </ul>
          {userPlaylistMyData && userPlaylistMyData?.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <LockContents />
      )}
    </div>
  )
}

export default UserPlaylist
