import React, { Dispatch, SetStateAction, useState } from 'react'

const CommunityListSort = ({
  isSort,
  setIsSort,
}: {
  isSort: boolean
  setIsSort: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className='flex gap-2 m-10'>
      <p
        onClick={() => {
          setIsSort(true)
        }}
        className={`${isSort ? 'text-zinc-400' : 'text-black'}`}
      >
        최신순
      </p>
      <p
        onClick={() => {
          setIsSort(false)
        }}
        className={`${isSort ? 'text-black' : 'text-zinc-400'}`}
      >
        좋아요
      </p>
    </div>
  )
}

export default CommunityListSort
