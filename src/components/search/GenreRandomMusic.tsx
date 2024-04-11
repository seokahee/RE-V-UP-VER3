import { getRandomMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import GenreMusicItem from '../main/GenreMusicItem'

const GenreRandomMusic = () => {
  //없을 때
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getRandomMusicData(),
    queryKey: ['mainGenreMusic'],
  })
  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }
  return (
    <section className='p-4'>
      <h2>이런 음악은 어떠신가요? 🎶</h2>
      <div className='relative flex overflow-hidden'>
        {data?.map((item) => {
          return <GenreMusicItem key={item.musicId} item={item} />
        })}
      </div>
    </section>
  )
}

export default GenreRandomMusic
