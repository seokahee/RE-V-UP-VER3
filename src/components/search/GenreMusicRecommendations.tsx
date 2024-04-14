'use client'

import { getGenreMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import NoSearchResultItem from './NoSearchResultItem'
import { useState } from 'react'
import { modalPaging } from '@/util/util'
import Pagination from '@/util/Pagination '

const GenreMusicRecommendations = ({
  musicPreferenceData,
}: {
  musicPreferenceData: number[]
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryFn: () => getGenreMusicData(musicPreferenceData),
    queryKey: ['mainGenreMusic', musicPreferenceData],
    enabled: !!musicPreferenceData,
  })
  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }
  const { currentItems, nextPage, prevPage, totalPages } = modalPaging(
    data,
    currentPage,
    setCurrentPage,
  )

  return (
    <div>
      <div className='focus-bold h-[28px] text-[20px] leading-[140%]'>
        이런 음악은 어떠신가요? 🎶
      </div>
      <div>
        {data?.map((item) => {
          return <NoSearchResultItem key={item.musicId} item={item} />
        })}
      </div>
      <div className='mb-[82px]'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default GenreMusicRecommendations
