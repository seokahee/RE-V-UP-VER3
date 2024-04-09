'use client'
import SearchedCommunityData from '@/components/search/SearchedCommunityData'
import SearchedMusicData from '@/components/search/SearchedMusicData'
import {
  getSearchedCommunityData,
  getSearchedMusicData,
} from '@/shared/search/api'
import { useSearchedStore } from '@/shared/store/searchStore'
import { CommunityType } from '@/types/musicPlayer/types'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Search = () => {
  const { searchedKeyword } = useSearchedStore()
  const { keyword, selectedTabs } = searchedKeyword
  const router = useRouter()

  const { data: musicResult } = useQuery({
    queryFn: () => getSearchedMusicData(keyword, selectedTabs),
    queryKey: ['getSearchedMusicData', keyword, selectedTabs],
  })

  const { data: communityResult } = useQuery({
    queryFn: () => getSearchedCommunityData(keyword, selectedTabs),
    queryKey: ['getSearchedCommunityData', keyword, selectedTabs],
  })

  const filteredData = communityResult?.filter((item) => {
    return item && item.userInfo && item.musicInfo
  }) as CommunityType[]

  useEffect(() => {
    if (
      (filteredData && filteredData.length === 0) ||
      (musicResult && musicResult.length === 0)
    ) {
      alert('검색 결과가 없습니다')
      router.push('/')
    }
  }, [filteredData, musicResult])

  return (
    <div>
      <div>
        {selectedTabs === 'musicInfo' && musicResult && (
          <div>
            {musicResult.map((item) => (
              <SearchedMusicData key={item.musicId} item={item} />
            ))}
          </div>
        )}
        {selectedTabs !== 'musicInfo' && communityResult && (
          <div>
            {filteredData.map((item) => (
              <SearchedCommunityData key={item.boardId} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
