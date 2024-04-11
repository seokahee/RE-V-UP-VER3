'use client'

import { getGenreMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import GenreMusicItem from '../main/GenreMusicItem'

const GenreMusicRecommendations = ({
  musicPreferenceData,
}: {
  musicPreferenceData: number[]
}) => {
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getGenreMusicData(musicPreferenceData),
    queryKey: ['mainGenreMusic', musicPreferenceData],
    enabled: !!musicPreferenceData,
  })
  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }
  return (
    <section className='p-4'>
      <h2>이런 음악은 어떠신가요? 🎶</h2>
      <div>
        {data?.map((item) => {
          return <GenreMusicItem key={item.musicId} item={item} />
        })}
      </div>
    </section>
  )
}

export default GenreMusicRecommendations
