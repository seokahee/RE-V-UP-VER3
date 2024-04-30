import { GENRE_MUSIC_QUERY_KEY } from '@/query/genreMusic/queryKeys'
import { getRandomMusicData } from '@/shared/main/api'
import { usePaginationStore } from '@/shared/store/paginationStore'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import NoSearchResultItem from './NoSearchResultItem'
import { useEffect, useState } from 'react'
import { GenreMusicInfo } from '@/types/main/types'

const GenreRandomMusic = () => {
  const [randomMusic, setRandomMusic] = useState<GenreMusicInfo[]>([])

  const setCurrentPageData = usePaginationStore(
    (state) => state.setCurrentPageData,
  )
  const { currentPageData } = usePaginationStore()
  const { currentPage } = currentPageData

  const { data, isLoading } = useQuery({
    queryFn: () => getRandomMusicData(),
    queryKey: [GENRE_MUSIC_QUERY_KEY.GET_MAIN_GENRE_MUSIC],
  })

  useEffect(() => {
    if (data) {
      const randomIndex = new Set<number>()
      while (randomIndex.size < 10) {
        randomIndex.add(Math.floor(Math.random() * data.length))
      }
      const randomMusic = Array.from(randomIndex).map((index) => data[index])
      setRandomMusic(randomMusic)
    }
  }, [data])

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    randomMusic,
    currentPage,
    setCurrentPageData,
    5,
  )

  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }

  return (
    <div>
      <h2 className='focus-bold h-[28px] text-[20px] leading-[140%]'>
        이런 음악은 어떠신가요? 🎶
      </h2>
      <div>
        {currentItems?.map((item: any) => {
          return <NoSearchResultItem key={item.musicId} item={item} />
        })}
      </div>
      <div className='mb-[82px]'>
        <Pagination
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  )
}

export default GenreRandomMusic
