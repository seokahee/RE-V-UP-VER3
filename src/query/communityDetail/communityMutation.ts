import { queryClient } from '@/app/provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { COMMUNITY_QUERY_KEY } from './communityQueryKey'
import {
  addCommnityBoard,
  deleteCommunityBoard,
  updateCommnityBoard,
} from '@/shared/communitydetail/detailApi'
import { addCommnity } from '@/types/communityDetail/detailTypes'
import { insertCurrentMusic, updateCurrentMusic } from '@/shared/main/api'

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

export const useCoummunityCreateItem = () => {
  const insertMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })
  return { updateMutation, insertMutation }
}
