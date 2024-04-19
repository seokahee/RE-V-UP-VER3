'use client'
import { useSearchedResultStore } from '@/shared/store/searchStore'
import { onDateHandler } from '@/util/util'
import Image from 'next/image'
import Link from 'next/link'
import comment from '@/../public/images/comment.svg'
import like from '@/../public/images/like.svg'
import userDefaultImg from '@/../public/images/userDefaultImg.svg'

const SearchedCommunityData = () => {
  const { searchedData } = useSearchedResultStore()
  const { communityData } = searchedData

  return (
    <div>
      {communityData.map((item) => {
        const keys = Object.keys(item.comment)
        const numKeys = keys.length
        return (
          <Link href={`/community/${item.boardId}`}>
            <div
              key={item.boardId}
              className='flex h-[112px] w-[732px] justify-between border-b border-black p-[16px]'
            >
              <div className='flex h-[80px] w-[620px] items-center gap-[16px]'>
                {item.userInfo.userImage ? (
                  <Image
                    src={item.userInfo.userImage}
                    alt={`${item.userInfo.nickname}님의 이미지`}
                    width={56}
                    height={56}
                    className='h-[59px] w-[59px] rounded-full'
                  />
                ) : (
                  <Image
                    src={userDefaultImg}
                    alt='유저 이미지'
                    width={56}
                    height={56}
                    className='h-[59px] w-[59px] rounded-full'
                  />
                )}

                <div className='flex h-[53px] w-[548px] flex-col gap-[8px]'>
                  <div className='text-[18px]'>{item.boardTitle}</div>
                  <div className='flex h-[20px] w-[548px] items-center justify-between pr-[32px]'>
                    <div className='flex h-[20px] w-[160px] gap-[16px] text-[14px] opacity-[50%]'>
                      <div>{item.userInfo.nickname}</div>
                      <div>{onDateHandler(item.date)}</div>
                    </div>
                    <div className='flex h-[20px] w-[112px] items-center gap-[8px] text-[14px] opacity-[50%]'>
                      <div className='h-20px flex w-[52px] items-center gap-1'>
                        <Image
                          src={like}
                          alt='좋아요 이미지'
                          width={18}
                          height={18}
                          className='h-[18] w-[18px]'
                        />
                        {!item.likeList
                          ? 0
                          : item.likeList.length > 99
                            ? '99+'
                            : item.likeList.length}
                      </div>
                      <div className='h-20px flex w-[52px] items-center gap-1'>
                        <Image
                          src={comment}
                          alt='댓글 이미지'
                          width={18}
                          height={18}
                          className='h-[18px] w-[18px]'
                        />
                        {!numKeys ? 0 : numKeys > 99 ? '99+' : numKeys}
                      </div>
                    </div>
                  </div>
                </div>
                <Image
                  src={item.musicInfo.thumbnail}
                  alt='앨범 썸네일'
                  width={80}
                  height={80}
                  className='h-[80] w-[80] rounded-full'
                />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchedCommunityData
