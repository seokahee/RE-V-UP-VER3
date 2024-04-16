import type { Board } from '@/types/mypage/types'
import { onDateHandler } from '@/util/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BoardItem = ({
  data: item,
  onClick,
}: {
  data: Board
  onClick: () => void
}) => {
  return (
    <li className='flex justify-between border-b border-solid border-black p-4'>
      <div className='flex items-center'>
        <figure className='h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-[#ffffff1a] bg-[#2b2b2b]'>
          {item.userInfo?.userImage && (
            <Image
              src={item.userInfo.userImage}
              width={56}
              height={56}
              alt={`${item.userInfo.nickname} 프로필 이미지`}
            />
          )}
        </figure>
        <div>
          <Link href={`/community/${item.boardId}`}>{item.boardTitle}</Link>

          <div className='flex justify-between'>
            <div>
              {item.userInfo?.nickname}
              {onDateHandler(item.date)}
            </div>
            <div>
              좋아요 수 {item.likeList ? item.likeList.length : 0} / 댓글 수{' '}
              {item.comment ? item.comment.length : 0}
            </div>
          </div>
        </div>
      </div>
      <div>
        <figure>
          {item.musicInfo?.thumbnail && (
            <Image
              src={item.musicInfo.thumbnail}
              width={80}
              height={80}
              alt={`${item.musicInfo.musicTitle} 앨범 이미지`}
            />
          )}
        </figure>
        <button type='button' onClick={onClick}>
          재생
        </button>
      </div>
    </li>
  )
}

export default BoardItem
