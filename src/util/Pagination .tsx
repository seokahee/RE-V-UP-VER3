'use client'
import nextPageButton from '@/../public/images/nextPageButton.svg'
import prevPageButton from '@/../public/images/prevPageButton.svg'
import { usePaginationStore } from '@/shared/store/paginationStore'
import Image from 'next/image'

type PaginationProps = {
  totalPages: number
  prevPage: () => void
  nextPage: () => void
}

const Pagination = ({ totalPages, prevPage, nextPage }: PaginationProps) => {
  const setCurrentPageData = usePaginationStore(
    (state) => state.setCurrentPageData,
  )

  const { currentPageData } = usePaginationStore()
  const { currentPage } = currentPageData

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
                onClick={() => setCurrentPageData(idx + 1)}
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
