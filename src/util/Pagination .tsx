'use client'
import Image from 'next/image'
import React from 'react'
import prevPageButton from '@/../public/images/prevPageButton.svg'
import nextPageButton from '@/../public/images/nextPageButton.svg'

type PaginationProps = {
  currentPage: number
  totalPages: number
  prevPage: () => void
  nextPage: () => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className='text-center'>
      {currentPage !== 1 && (
        <button className='mx-[4px] px-[4px]' onClick={prevPage}>
          <Image
            src={prevPageButton}
            alt='이전페이지 버튼'
            width={13}
            height={15}
          />
        </button>
      )}
      {totalPages &&
        Array(totalPages)
          .fill(0)
          .map((_, idx) => {
            return (
              <button
                key={idx + 1}
                className={`mx-[4px] px-[4px] text-[18px] ${idx + 1 !== currentPage && 'opacity-[30%]'}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            )
          })}

      {currentPage !== totalPages && (
        <button className='mx-[4px] px-[4px]' onClick={nextPage}>
          <Image
            src={nextPageButton}
            alt='다음페이지 버튼'
            width={13}
            height={15}
          />
        </button>
      )}
    </div>
  )
}

export default Pagination
