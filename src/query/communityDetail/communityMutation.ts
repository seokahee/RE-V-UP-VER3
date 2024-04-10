import { queryClient } from '@/app/provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { COMMUNITY_QUERY_KEY } from './communityQueryKey'
import {
  addCommnityBoard,
  deleteCommunityBoard,
  updateCommnityBoard,
} from '@/shared/communitydetail/detailApi'
import { addCommnity } from '@/types/communityDetail/detailTypes'

export const useCoummunityItem = () => {
  const updateCommunityMutation = useMutation({
    mutationFn: updateCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.COMMUNITY_DETAIL],
      }),
  })

  const deleteCommunityMutation = useMutation({
    mutationFn: deleteCommunityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.COMMUNITY_DETAIL],
      }),
  })

  const addCommunityMutation = useMutation({
    mutationFn: addCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.COMMUNITY_DETAIL],
      }),
  })
  return {
    updateCommunityMutation,
    deleteCommunityMutation,
    addCommunityMutation,
  }
}
