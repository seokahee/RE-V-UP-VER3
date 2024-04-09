import React from 'react'

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
    <div className='my-8 text-center'>
      {currentPage !== 1 && <button onClick={prevPage}>prev</button>}
      {totalPages &&
        Array(totalPages)
          .fill(0)
          .map((_, idx) => {
            return (
              <button
                key={idx + 1}
                className={`px-1 mx-1 ${idx + 1 === currentPage && 'text-red-600'}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            )
          })}
      {currentPage !== totalPages && <button onClick={nextPage}>next</button>}
    </div>
  )
}

export default Pagination
