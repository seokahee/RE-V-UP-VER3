'use client'

import { getMyWriteListCount, getMyWriteListData } from '@/shared/mypage/api'
import { useStore } from '@/shared/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import Pagination from './Pagination'
import BoardItem from './BoardItem'
import BoardNoData from './BoardNoData'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'

const WriteList = () => {
  const { userInfo } = useStore()
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()

  const { data: totalCount } = useQuery({
    queryFn: () => getMyWriteListCount(userInfo.uid),
    queryKey: ['myWriteListAllCount'],
    enabled: !!userInfo.uid,
  })

  const PER_PAGE = 2
  const totalPages = Math.ceil(totalCount! / PER_PAGE)
  const start = (currentPage - 1) * PER_PAGE
  const end = currentPage * PER_PAGE - 1

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getMyWriteListData(userInfo.uid, start, end),
    queryKey: ['myWriteList', currentPage],
    enabled: !!userInfo.uid,
  })

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(userInfo.uid),
    queryKey: ['playListCurrent'],
    enabled: !!userInfo.uid,
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const onClickAddCurrentMusicHandler = (musicId: string) => {
    const currentList = playListCurrent?.length
      ? playListCurrent[0].currentMusicIds
      : []
    if (currentList.find((el) => el === musicId)) {
      alert('이미 추가된 노래입니다.')
      return
    }
    currentList.push(musicId)
    updateMutation.mutate({ userId: userInfo.uid, currentList })
    alert('현재 재생목록에 추가 되었습니다.')
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  if (isError) {
    return '에러가 발생했어요!'
  }

  if (isLoading) {
    return '데이터를 불러오는 중입니다.'
  }

  return (
    <section>
      <ul className='mb-8'>
        {data && data?.length > 0 ? (
          data?.map((item) => {
            return (
              <BoardItem
                key={item.boardId}
                data={item}
                onClick={() => onClickAddCurrentMusicHandler(item.musicId)}
              />
            )
          })
        ) : (
          <BoardNoData />
        )}
      </ul>
      {data && data?.length > 0 ? (
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
    </section>
  )
}

export default WriteList
