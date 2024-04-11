'use client'
import MusicPlayer from '@/components/player/MusicPlayer'
import SearchedCommunityData from '@/components/search/SearchedCommunityData'
import SearchedMusicData from '@/components/search/SearchedMusicData'
import {
  getSearchedCommunityData,
  getSearchedMusicData,
} from '@/shared/search/api'
import { useSearchedKeywordStore } from '@/shared/store/searchStore'
import { CommunityType } from '@/types/community/type'
import { MusicInfoType } from '@/types/musicPlayer/types'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { searchedKeyword } = useSearchedKeywordStore()
  const { keyword, selectedTabs } = searchedKeyword
  const router = useRouter()

  const {
    data: musicResult,
    isLoading: musicDataIsLoading,
    isError: musicDataIsError,
  } = useQuery({
    queryFn: () => getSearchedMusicData(keyword, selectedTabs),
    queryKey: ['getSearchedMusicData', keyword, selectedTabs],
  })

  const {
    data: communityResult,
    isLoading: communityDataIsLoading,
    isError: communityDataIsError,
  } = useQuery({
    queryFn: () => getSearchedCommunityData(keyword, selectedTabs),
    queryKey: ['getSearchedCommunityData', keyword, selectedTabs],
  })

  const isLoadingSate = musicDataIsLoading && communityDataIsLoading
  const isErrorState = musicDataIsError && communityDataIsError
  if (isLoadingSate) {
    return <div>정보를 가져오고 있습니다</div>
  }
  if (isErrorState) {
    console.error('검색 결과를 가져오지 못했습니다')
    return
  }

  const filteredCommunity = communityResult?.filter((item) => {
    return item && item.userInfo && item.musicInfo && item.boardId
  }) as CommunityType[]

  const filteredMusic = musicResult?.filter((item) => {
    return item && item.musicId
  }) as MusicInfoType[]

  const isFilteredCommunity =
    filteredCommunity && filteredCommunity.length === 0
  const isFilteredMusic = filteredMusic && filteredMusic.length === 0

  useEffect(() => {
    if (isFilteredCommunity || isFilteredMusic) {
      alert('검색 결과가 없습니다')
      router.push('/')
    }
  }, [filteredCommunity, filteredMusic])

  const searchedResult =
    selectedTabs === 'musicInfo' ? filteredMusic : filteredCommunity

  const isSearchedResult = searchedResult && searchedResult.length > 0

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    searchedResult,
    currentPage,
    setCurrentPage,
  )

  return (
    <div>
      <div>
        {isSearchedResult && (
          <div>
            {currentItems.map((item: any, idx: any) => (
              <SearchedMusicData
                // key={item.musicId}
                // key={idx}
                item={item as MusicInfoType}
              />
            ))}
          </div>
        )}
        {isSearchedResult && (
          <div>
            {currentItems.map((item: any, idx: any) => (
              <SearchedCommunityData
                // key={item.boardId}
                // key={idx}
                item={item as CommunityType}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Search
