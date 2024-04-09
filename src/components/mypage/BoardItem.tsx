import type { Board } from '@/types/mypage/types'
import { onDateHandler } from '@/util/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BoardItem = ({ data: item }: { data: Board }) => {
  return (
    <li className='flex justify-between p-4 border-b border-black border-solid'>
      <figure>
        {item.userInfo?.userImage && (
          <Image
            src={item.userInfo.userImage}
            width={50}
            height={50}
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
        <button type='button'>재생</button>
      </div>
    </li>
  )
}

export default BoardItem
