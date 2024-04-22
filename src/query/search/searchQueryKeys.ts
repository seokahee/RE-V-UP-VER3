import {
  getSearchedCommunityData,
  getSearchedMusicData,
} from '@/shared/search/api'
import { useQuery } from '@tanstack/react-query'

export const GET_SEARCHED_DATA_QUERY_KEYS = {
  SEARCHED_MUSIC_DATA: 'getSearchedMusicData',
  SEARCHED_COMMUNITY_DATA: 'getSearchedCommunityData',
}

export const searchedData = (keyword: string) => {
  const {
    data: musicResult,
    isLoading: musicDataIsLoading,
    isError: musicDataIsError,
  } = useQuery({
    queryFn: () => getSearchedMusicData(keyword),
    queryKey: [GET_SEARCHED_DATA_QUERY_KEYS.SEARCHED_MUSIC_DATA, keyword],
  })

  const {
    data: communityResult,
    isLoading: communityDataIsLoading,
    isError: communityDataIsError,
  } = useQuery({
    queryFn: () => getSearchedCommunityData(keyword),
    queryKey: [GET_SEARCHED_DATA_QUERY_KEYS.SEARCHED_COMMUNITY_DATA, keyword],
  })

  return {
    musicResult,
    musicDataIsLoading,
    musicDataIsError,
    communityResult,
    communityDataIsLoading,
    communityDataIsError,
  }
}
