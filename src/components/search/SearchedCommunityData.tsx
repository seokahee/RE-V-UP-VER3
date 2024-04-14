'use client'
import { useSearchedResultStore } from '@/shared/store/searchStore'
import { onDateHandler } from '@/util/util'
import Link from 'next/link'

const SearchedCommunityData = () => {
  const { searchedData } = useSearchedResultStore()
  const { communityData } = searchedData
  return (
    <div className='flex h-[440px] w-[732px] flex-col'>
      {communityData.map((item) => {
        return (
          <Link href={`/community/${item.boardId}`}>
            <div key={item.boardId} className='flex h-[80px] w-[620px]'>
              <img
                src={item.userInfo.userImage}
                alt={`${item.userInfo.nickname}님의 이미지`}
                className='w-28'
              />
              <img
                src={item.musicInfo.thumbnail}
                alt='앨범 썸네일'
                className='w-28'
              />
              <div>
                <div>{item.boardTitle}</div>
                <div>
                  <div>{item.userInfo.nickname}</div>
                  <div>{onDateHandler(item.date)}</div>
                  <div>좋아요 {item.likeList.length}</div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchedCommunityData
