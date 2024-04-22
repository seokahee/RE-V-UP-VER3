import { getCommunityList } from '@/shared/community/api'
import { useQuery } from '@tanstack/react-query'

export const GET_COMMUNITY_LIST_QUERY_KEY = {
  GET_COMMUNITY_LIST: 'getCommunityList',
}

export const getCommunityListInCommunity = (isSort: boolean) => {
  const {
    data: communityList,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getCommunityList(isSort),
    queryKey: [GET_COMMUNITY_LIST_QUERY_KEY.GET_COMMUNITY_LIST],
  })

  return { communityList, isLoading, isError, refetch }
}
