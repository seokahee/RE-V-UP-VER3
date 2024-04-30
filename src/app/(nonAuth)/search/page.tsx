'use client'
import NoSearchResult from '@/components/search/NoSearchResult'
import SearchedCommunityData from '@/components/search/SearchedCommunityData'
import SearchedMusicData from '@/components/search/SearchedMusicData'
import { searchedData } from '@/query/search/searchQueryKeys'
import {
  usePaginationStore,
  useSearchedKeywordStore,
} from '@/shared/store/searchStore'
import Pagination from '@/util/Pagination '
import { paging } from '@/util/util'

const Search = () => {
  const setCurrentPageData = usePaginationStore(
    (state) => state.setCurrentPageData,
  )
  const { currentPageData } = usePaginationStore()
  const { currentPage } = currentPageData
  const { searchedKeyword } = useSearchedKeywordStore()
  const { keyword, selectedTabs } = searchedKeyword

  const { musicResult, musicDataIsLoading, musicDataIsError } = searchedData(
    keyword,
    selectedTabs,
  )
  const { communityResult, communityDataIsLoading, communityDataIsError } =
    searchedData(keyword, selectedTabs)

  const isLoadingSate = musicDataIsLoading && communityDataIsLoading
  const isErrorState = musicDataIsError && communityDataIsError

  if (isLoadingSate) {
    return <div>정보를 가져오고 있습니다</div>
  }

  if (isErrorState) {
    console.error('검색 결과를 가져오지 못했습니다')
    return
  }

  const searchedResult =
    selectedTabs === 'musicInfo' ? musicResult : communityResult

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    searchedResult,
    currentPage,
    setCurrentPageData,
    5,
  )

  return (
    <div>
      {searchedResult && searchedResult.length > 0 ? (
        <div className='flex h-[440px] w-[732px] flex-col'>
          <div className='my-[48px] h-[28px] text-[20px] font-bold leading-[140%]'>
            {selectedTabs === 'musicInfo'
              ? `'${keyword}'에 대한 노래 검색 결과`
              : `'${keyword}'에 대한 게시글 검색 결과`}
          </div>
          {selectedTabs === 'musicInfo' ? (
            <SearchedMusicData currentItems={currentItems} />
          ) : (
            <SearchedCommunityData currentItems={currentItems} />
          )}
          {currentItems && currentItems.length > 0 && (
            <div
              className={
                selectedTabs === 'musicInfo' ? 'mt-[82px]' : 'mt-[32px]'
              }
            >
              <Pagination
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className='my-[48px] h-[28px] text-[20px] font-bold leading-[140%]'>
            {`'${keyword}'에 대한 검색 결과가 없습니다`}
          </h2>
          <NoSearchResult />
        </div>
      )}
    </div>
  )
}

export default Search
