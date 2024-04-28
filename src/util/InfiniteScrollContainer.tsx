import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

type props = {
  children: React.ReactNode
  isFetchingNextPage: boolean
  isFetchingPreviousPage: boolean
  hasNextPage: boolean
  nextPage: () => void
  root?: HTMLUListElement | HTMLDivElement | null
}

const InfiniteScrollContainer = ({
  children,
  isFetchingNextPage,
  isFetchingPreviousPage,
  hasNextPage,
  nextPage,
  root,
}: props) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const rootTarget = root ? root : null

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && nextPage()

  useIntersectionObserver({
    target: bottomRef,
    onIntersect,
    enabled: hasNextPage,
    root: rootTarget,
  })

  return (
    <>
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
      {hasNextPage && <div className='h-[20px]' ref={bottomRef}></div>}
    </>
  )
}

export default InfiniteScrollContainer
