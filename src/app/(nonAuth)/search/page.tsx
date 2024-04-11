'use client'
import NoSearchResult from '@/components/search/NoSearchResult'
import SearchedCommunityData from '@/components/search/SearchedCommunityData'
import SearchedMusicData from '@/components/search/SearchedMusicData'
import {
  getSearchedCommunityData,
  getSearchedMusicData,
} from '@/shared/search/api'
import {
  useSearchedKeywordStore,
  useSearchedResultStore,
} from '@/shared/store/searchStore'
import { CommunityType } from '@/types/community/type'
import { CurrentPlaylistType } from '@/types/musicPlayer/types'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { searchedKeyword } = useSearchedKeywordStore()
  const { keyword, selectedTabs } = searchedKeyword
  const searchResultData = useSearchedResultStore(
    (state) => state.searchResultData,
  )

  const {
    data: musicResult,
    isLoading: musicDataIsLoading,
    isError: musicDataIsError,
  } = useQuery({
    queryFn: () => getSearchedMusicData(keyword),
    queryKey: ['getSearchedMusicData', keyword],
  })

  const {
    data: communityResult,
    isLoading: communityDataIsLoading,
    isError: communityDataIsError,
  } = useQuery({
    queryFn: () => getSearchedCommunityData(keyword),
    queryKey: ['getSearchedCommunityData', keyword],
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
    return item && item.userInfo && item.musicInfo
  }) as CommunityType[]

  const filteredMusic = musicResult?.filter((item) => {
    return item
  }) as CurrentPlaylistType[]

  const searchedResult =
    selectedTabs === 'musicInfo' ? filteredMusic : filteredCommunity

  const isSearchedResult = searchedResult && searchedResult.length > 0

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    searchedResult,
    currentPage,
    setCurrentPage,
  )

  if (!keyword) {
    return
  }
  searchResultData(
    selectedTabs === 'musicInfo' ? currentItems : [],
    selectedTabs === 'community' ? currentItems : [],
  )

  return (
    <div>
      {isSearchedResult ? (
        <div>
          <SearchedMusicData />
          <SearchedCommunityData />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <NoSearchResult />
      )}
    </div>
  )
}

export default Search
