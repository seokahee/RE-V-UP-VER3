import { getRandomMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import GenreMusicItem from '../main/GenreMusicItem'
import { useSearchedKeywordStore } from '@/shared/store/searchStore'

const GenreRandomMusic = () => {
  const { searchedKeyword } = useSearchedKeywordStore()
  const { keyword } = searchedKeyword
  const { data, isLoading } = useQuery({
    queryFn: () => getRandomMusicData(),
    queryKey: ['mainGenreMusic'],
  })
  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }
  return (
    <section className='p-4'>
      {`'${keyword}'에 대한 검색결과가 없습니다.`}
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
