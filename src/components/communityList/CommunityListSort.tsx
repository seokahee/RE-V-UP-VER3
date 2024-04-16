import { Dispatch, SetStateAction } from 'react'

const CommunityListSort = ({
  isSort,
  setIsSort,
}: {
  isSort: boolean
  setIsSort: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className='flex  gap-2'>
      <button
        onClick={() => {
          setIsSort(true)
        }}
        className={`${isSort ? 'text-zinc-400' : 'text-black'}`}
      >
        최신순
      </button>
      <button
        onClick={() => {
          setIsSort(false)
        }}
        className={`${isSort ? 'text-black' : 'text-zinc-400'}`}
      >
        좋아요
      </button>
    </div>
  )
}

export default CommunityListSort
