'use client'
import CommunityListData from '@/components/communityList/CommunityListData'
import CommunityListSort from '@/components/communityList/CommunityListSort'
import { getCommunityList } from '@/shared/community/api'
import { CommunityType } from '@/types/community/type'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Community = () => {
  const [isSort, setIsSort] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getCommunityList(isSort),
    queryKey: ['getCommunityList'],
  })

  useEffect(() => {
    refetch()
  }, [isSort, refetch])

  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }

  if (!data) {
    return
  }

  if (isError) {
    console.error('커뮤니티 리스트를 가져오지 못했습니다')
    return
  }
  const filteredData = data.filter((item) => {
    return item && item.userInfo && item.musicInfo
  }) as CommunityType[]

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    filteredData,
    currentPage,
    setCurrentPage,
  )

  return (
    <div>
      <Link href='/communitycreate'>글 등록하기</Link>
      <div className='m-10 flex gap-2'>
        <CommunityListSort isSort={isSort} setIsSort={setIsSort} />
      </div>
      {currentItems.map((item: any) => {
        return <CommunityListData key={item.boardId} item={item} />
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
