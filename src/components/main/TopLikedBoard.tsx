'use client'

import { getTopLikedBoardData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

const TopLikedBoard = () => {
  const slideRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)

  const MOVE_POINT = 354 + 16 //임시값 - 슬라이드로 이동할 값

  const { data, isError, isLoading } = useQuery({
    queryFn: () => getTopLikedBoardData(),
    queryKey: ['topLikedBoard'],
  })

  const onClickPrevHandler = () => {
    if (position < 0) {
      setPosition((prev) => prev + MOVE_POINT)
    }
  }

  const onClickNextHandler = () => {
    setPosition((prev) => prev - MOVE_POINT)
  }

  if (isError) {
    return '에러 발생'
  }

  if (isLoading) {
    return '로딩중'
  }

  return (
    <section className='p-4'>
      <h2 className='my-4'>지금 핫한 게시글 🔥</h2>
      <div className='relative flex overflow-hidden' ref={slideRef}>
        <ul
          className='flex flex-nowrap'
          style={{
            transition: 'all 0.4s ease-in-out',
            transform: `translateX(${position}px)`,
          }}
        >
          {data
            ?.sort((a, b) => {
              return (
                (!b.likeList ? 0 : b.likeList?.length) -
                (!a.likeList ? 0 : a.likeList?.length)
              )
            })
            .map((item) => {
              const likedLength = item.likeList ? item.likeList.length : 0

              return (
                <li
                  key={item.boardId}
                  className='w-[356px] p-4 mr-4 border border-solid border-slate-300 list-none rounded-[2rem]'
                >
                  <div className='flex items-center'>
                    <span className='w-5 h-5 flex overflow-hidden rounded-full bg-slate-200'>
                      {item.userInfo.userImage && (
                        <Image
                          src={item.userInfo.userImage}
                          alt={item.userInfo.nickname!}
                          width={20}
                          height={20}
                        />
                      )}
                    </span>
                    {item.userInfo.nickname}
                  </div>
                  <Link
                    href={`/community/${item.boardId}`}
                    className='block text-ellipsis whitespace-nowrap overflow-hidden'
                  >
                    {item.boardTitle}
                  </Link>
                  <div className='mt-4 text-right'>
                    댓글 {item.comment.length} 좋아요 {likedLength}
                  </div>
                </li>
              )
            })}
        </ul>
        <div>
          {position !== ((data?.length as number) - 1) * -MOVE_POINT && (
            <button
              type='button'
              className='absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white'
              onClick={onClickNextHandler}
            >
              NEXT
            </button>
          )}
          {position !== 0 && (
            <button
              type='button'
              className='absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white'
              onClick={onClickPrevHandler}
            >
              PREV
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default TopLikedBoard
