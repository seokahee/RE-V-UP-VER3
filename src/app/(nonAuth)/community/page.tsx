'use client'
import Pagination from '@/components/mypage/Pagination'
import { getCommunityList } from '@/shared/community/api'
import { CommunityType } from '@/types/community/type'
import { onDateHandler } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Community = () => {
  const [isSort, setIsSort] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, refetch } = useQuery({
    queryFn: () => getCommunityList(isSort),
    queryKey: ['getCommunityList'],
  })

  useEffect(() => {
    refetch()
  }, [isSort, refetch])

  if (!data) {
    return
  }
  const filteredData = data.filter((item) => {
    return item && item.userInfo && item.musicInfo
  }) as CommunityType[]

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <Link href='/communitycreate'>글 등록하기</Link>
      <div className='flex gap-2 m-10'>
        <p
          onClick={() => {
            setIsSort(true)
          }}
          className={`${isSort ? 'text-zinc-400' : 'text-black'}`}
        >
          최신순
        </p>
        <p
          onClick={() => {
            setIsSort(false)
          }}
          className={`${isSort ? 'text-black' : 'text-zinc-400'}`}
        >
          좋아요
        </p>
      </div>
      {currentItems.map((item) => {
        return (
          <div key={item!.boardId} className='flex items-center'>
            <img
              src={item?.userInfo?.userImage ?? ''}
              alt=''
              className='w-28'
            />
            <img
              src={item.musicInfo.thumbnail}
              alt='thumbnail'
              className='w-28'
            />
            <div className='flex flex-col gap-2'>
              <div>{item!.boardTitle}</div>
              <div className='flex gap-2'>
                <div>{item?.userInfo?.nickname ?? ''}</div>
                <div>{onDateHandler(item!.date)}</div>
                <div>좋아요 {item?.likeList.length}</div>
              </div>
            </div>
          </div>
        )
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Community
