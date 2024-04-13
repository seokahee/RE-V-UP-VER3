import { getCommunityList } from '@/shared/community/api'
import { useQuery } from '@tanstack/react-query'

export const GET_COMMUNITYLIST_QUERY_KEY = {
  GET_COMMUNITYLIST: 'getCommunityList',
}

export const getCommunityListInCommunity = (isSort: boolean) => {
  const {
    data: communityList,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getCommunityList(isSort),
    queryKey: ['getCommunityList'],
  })

  return { communityList, isLoading, isError, refetch }
}
