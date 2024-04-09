import { queryClient } from '@/app/provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { COMMUNITY_QUERY_KEY } from './communityQueryKey'
import {
  addCommnityBoard,
  readCommunityDetail,
} from '@/shared/communitydetail/detailApi'

export const useCommunityQuery = (boardId: string | string[]) => {
  const readCommunityDetailQuery = useQuery({
    queryKey: [COMMUNITY_QUERY_KEY.READ_BOARD],
    queryFn: () => readCommunityDetail(boardId.toString()),
  })
  return { readCommunityDetailQuery }
}

export const useMutationItem = (
  uid: string,
  boardTitle: string,
  content: string,
  musicId: string,
) => {
  const addCommunityMutation = useMutation({
    mutationFn: () => addCommnityBoard(boardTitle, content, uid, musicId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.ADD_BOARD, uid],
      }),
    onError: () => {
      throw new Error('오류가 발생했습니다.')
    },
  })

  const updateCommunityMutation = useMutation({
    mutationFn: updateCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.UPDATE_BOARD, uid],
      }),
    onError: () => {
      throw new Error('오류가 발생했습니다.')
    },
  })

  const deleteCommunityMutation = useMutation({
    mutationFn: deleteCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.DELETE_BOARD, uid],
      }),
    onError: () => {
      console.error('오류가 발생했습니다.')
    },
  })

  return {
    addCommunityMutation,
    updateCommunityMutation,
    deleteCommunityMutation,
  }
}
