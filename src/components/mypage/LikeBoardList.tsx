import { getLikeBoardData } from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import BoardItem from './BoardItem'
import BoardNoData from './BoardNoData'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import { useSession } from 'next-auth/react'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import { Board } from '@/types/mypage/types'
import Swal from 'sweetalert2'

const LikeBoardList = () => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getLikeBoardData(uid),
    queryKey: ['likeBoard', currentPage],
    enabled: !!uid,
  })

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    data,
    currentPage,
    setCurrentPage,
    5,
  )

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
  })

  const onClickAddCurrentMusicHandler = async (musicId: string) => {
    const currentList = playListCurrent?.length
      ? playListCurrent[0].currentMusicIds
      : []
    if (currentList.find((el) => el === musicId)) {
      await Swal.fire({
        icon: 'warning',
        title: '이미 추가된 노래입니다.',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }
    currentList.push(musicId)
    updateMutation.mutate({ userId: uid, currentList })
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
        {currentItems && currentItems?.length > 0 ? (
          (currentItems as Board[])?.map((item) => {
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
      {currentItems && currentItems?.length > 0 ? (
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

export default LikeBoardList
