import { queryClient } from "@/app/provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { COMMUNITY_QUERY_KEY } from "./communityQueryKey";

export const useCommunityQuery = (uid: string) => {
  const readCommunityDetailQuery: unknown = useQuery({
    queryKey: [COMMUNITY_QUERY_KEY.READ_BOARD, uid],
    queryFn: readCommunityDetail,
  });
  return { readCommunityDetailQuery };
};

export const useMutationItem = () => {
  const addCommunityMutation = useMutation({
    mutationFn: addCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.ADD_BOARD],
      }),
    onError: () => {
      console.error("오류가 발생했습니다.");
    },
  });

  const updateCommunityMutation = useMutation({
    mutationFn: updateCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.UPDATE_BOARD],
      }),
    onError: () => {
      console.error("오류가 발생했습니다.");
    },
  });

  const deleteCommunityMutation = useMutation({
    mutationFn: deleteCommnityBoard,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [COMMUNITY_QUERY_KEY.DELETE_BOARD],
      }),
    onError: () => {
      console.error("오류가 발생했습니다.");
    },
  });

  return {
    addCommunityMutation,
    updateCommunityMutation,
    deleteCommunityMutation,
  };
};
