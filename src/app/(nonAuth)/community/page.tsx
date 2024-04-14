'use client'
import { GOBACK_SHADOW } from '@/components/communityDetail/detailCss'
import CommunityListData from '@/components/communityList/CommunityListData'
import CommunityListSort from '@/components/communityList/CommunityListSort'
import { getCommunityListInCommunity } from '@/query/community/communityQueryKey'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Community = () => {
  const [isSort, setIsSort] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { communityList, isLoading, isError, refetch } =
    getCommunityListInCommunity(isSort)
  useEffect(() => {
    refetch()
  }, [isSort, refetch])

  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }

  if (!communityList) {
    return
  }

  if (isError) {
    console.error('커뮤니티 리스트를 가져오지 못했습니다')
    return
  }
  const filteredData = communityList.filter((item) => {
    return item && item.userInfo && item.musicInfo && item.comment
  })

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    filteredData,
    currentPage,
    setCurrentPage,
  )

  return (
    <div>
      <div className='shadow-mb relative mt-[32px] flex h-[72px] w-[732px] items-center justify-center rounded-xl border-4 border-white border-opacity-10 bg-white bg-opacity-10'>
        <h1 className='text-[20px] font-bold'>음악 추천 게시판🦻</h1>
        <div className='absolute right-[20px] flex h-12 w-40 items-center justify-center rounded-xl border border-dim-black bg-primary font-bold'>
          <Link href='/communitycreate'>글 등록하기</Link>
        </div>
      </div>

      <div className='my-[30px]'>
        <CommunityListSort isSort={isSort} setIsSort={setIsSort} />
      </div>
      {currentItems.map((item: any) => {
        return <CommunityListData key={item.boardId} item={item} />
      })}
      <div className='my-[32px]'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Community
