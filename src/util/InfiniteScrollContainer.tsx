import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

type props = {
  children: React.ReactNode
  isFetchingNextPage: boolean
  isFetchingPreviousPage: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  previousPage: () => void
  nextPage: () => void
}

const InfiniteScrollContainer = ({
  children,
  isFetchingNextPage,
  isFetchingPreviousPage,
  hasNextPage,
  hasPreviousPage,
  previousPage,
  nextPage,
}: props) => {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  //역방향
  const onIntersectTop = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && previousPage()

  useIntersectionObserver({
    target: topRef,
    onIntersect: onIntersectTop,
    enabled: hasPreviousPage,
  })

  //정방향
  //감시하는 요소가 보여지면 fetchNextPage 실행하도록 하는 onIntersect로직을 useIntersectionObserver 에 넘겨줌
  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && nextPage()

  useIntersectionObserver({
    target: bottomRef,
    onIntersect,
    enabled: hasNextPage,
  })

  return (
    <>
      {hasPreviousPage && <div ref={topRef}></div>}
      {isFetchingPreviousPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )}
      {children}
      {isFetchingNextPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )}
      {hasNextPage && <div className='h-2' ref={bottomRef}></div>}
    </>
  )
}

export default InfiniteScrollContainer
