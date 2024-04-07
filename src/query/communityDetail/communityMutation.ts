// import { queryClient } from "@/app/provider";
// import { useMutation } from "@tanstack/react-query";

// export const useMutationItem = () => {
//   const addCommunityMutation = useMutation({
//     mutationFn: addCommnityBoard,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["쿼리키"] }),
//     onError: () => {
//       console.error("오류가 발생했습니다.");
//     },
//   });

//   const updateCommunityMutation = useMutation({
//     mutationFn: updateCommnityBoard,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["쿼리키"] }),
//     onError: () => {
//       console.error("오류가 발생했습니다.");
//     },
//   });

//   const deleteCommunityMutation = useMutation({
//     mutationFn: deleteCommnityBoard,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["쿼리키"] }),
//     onError: () => {
//       console.error("오류가 발생했습니다.");
//     },
//   });

//   return {
//     addCommunityMutation,
//     updateCommunityMutation,
//     deleteCommunityMutation,
//   };
// };
