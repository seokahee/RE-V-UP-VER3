import React, { useState } from 'react'
import CheckboxItem from './CheckboxItem'
import {
  getMyMusicCount,
  getUserPlaylistMyMusicInfoData,
  updateMyMusicIds,
} from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UserInfo } from '@/types/mypage/types'
import { useStore } from '@/shared/store'
import Image from 'next/image'
import { updateCurrentMusic } from '@/shared/main/api'
import Pagination from './Pagination'

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { userInfo } = useStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedList, setCheckedList] = useState<string[]>([])

  const queryClient = useQueryClient()

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

  const { data: playlistMyData } = useQuery({
    queryFn: () =>
      getUserPlaylistMyMusicInfoData(
        data?.playlistMy?.[0].myMusicIds as string[],
        start,
        end,
      ),
    queryKey: ['myMusicIds', currentPage],
    enabled: !!data?.playlistMy?.length,
  })

  const updateMyPlayListMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const updateCurrentPlayListMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
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

  const onClickDeleteHandler = () => {
    if (checkedList.length === 0) {
      alert('삭제할 노래를 선택해주세요!')
      return
    }
    const myMusicIds = data?.playlistMy?.[0].myMusicIds as string[]
    const newData = myMusicIds.filter((el) => !checkedList.includes(el))

    updateMyPlayListMutation.mutate({
      userId: userInfo.uid,
      myMusicIds: newData,
    })
    alert('삭제가 완료되었습니다.')
    setCheckedList([])
  }

  const onClickAddHandler = () => {
    if (checkedList.length === 0) {
      alert('추가할 노래를 선택해주세요!')
      return
    }

    const playListCurrentIds = !data.playlistCurrent?.[0].currentMusicIds
      ? []
      : data.playlistCurrent?.[0].currentMusicIds
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

    updateCurrentPlayListMutation.mutate({
      userId: userInfo.uid,
      currentList: newData,
    })

    alert('추가가 완료되었습니다.')
    setCheckedList([])
  }

  const onClickAllAddHandler = () => {
    const playListCurrentIds = !data.playlistCurrent?.[0].currentMusicIds
      ? []
      : data.playlistCurrent?.[0].currentMusicIds
    const playListMyIds = !data.playlistMy?.[0].myMusicIds
      ? []
      : data.playlistMy?.[0].myMusicIds
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

    updateCurrentPlayListMutation.mutate({
      userId: userInfo.uid,
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
      <button type='button' onClick={onClickAllAddHandler}>
        전체 재생 하기
      </button>
      <div>
        <button type='button' onClick={onClickDeleteHandler}>
          삭제
        </button>
        <button type='button' onClick={onClickAddHandler}>
          {checkedList.length}곡 재생
        </button>
      </div>
      <ul className='list-none'>
        {playlistMyData && playlistMyData?.length > 0
          ? playlistMyData?.map((item) => {
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
      {playlistMyData && playlistMyData?.length > 0 ? (
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
    </div>
  )
}

export default MyPlaylist
