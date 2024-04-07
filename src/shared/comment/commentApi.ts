import { comment, isEditComment, newComment } from "@/types/comment/type";
import { supabase } from "../supabase/supabase";

//댓글 조회
export const getComments = async (): Promise<comment[]> => {
  let { data: comment, error } = await supabase
    .from("comment")
    .select(
      "commentId,commentContent,commentDate,commentLikeList,userInfo(userId, nickname, userImage)"
    );
  if (error) {
    throw error.message;
  }
  return comment as comment[];
};

//추가
export const addComment = async (newComment: newComment) => {
  const { data, error } = await supabase
    .from("comment")
    .insert(newComment)
    .select();
  if (error) {
    console.log(error.message);
  }
  return data;
};

//댓글 삭제
export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from("comment")
    .delete()
    .eq("commentId", commentId);
  if (error) {
    console.log(error.message);
  }
};

//댓글 수정
export const updateComment = async ({
  commentId,
  editedComment,
}: {
  commentId: string;
  editedComment: isEditComment;
}) => {
  const { data, error } = await supabase
    .from("comment")
    .update(editedComment)
    .eq("commentId", commentId)
    .select();
  if (error) {
    console.log(error.message);
  }
  return data;
};

//선택한 댓글 좋아요 조회
// export const getLikedUser = async () => {
//   let { data: commentLiked, error } = await supabase
//     .from("comment")
//     .select("commentLikeList,userInfo(nickname)")
//     .eq("commentId", "ff085ccf-09e1-4ca9-b790-29b85422e08d")
//     .single();
//   if (error) {
//     console.log(error.message);
//   }
//   return commentLiked;
// };

//댓글 좋아요
export const addLikeComment = async ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => {
  //좋아요 조회
  let { data: commentLiked, error } = await supabase
    .from("comment")
    .select("commentLikeList")
    .eq("commentId", commentId)
    .single();

  if (error) {
    console.log(error.message);
  }

  if (!commentLiked) {
    console.log("좋아요 한 유저가 없습니다.");
    return null;
  }

  const updatedLikeList = [...commentLiked.commentLikeList, userId];

  const { data } = await supabase
    .from("comment")
    .update({
      commentLikeList: updatedLikeList,
    })
    .eq("commentId)", commentId);

  return data;
};

//좋아요 취소
export const cancelLikeComment = async ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => {
  const { data, error } = await supabase
    .from("comment")
    .update({
      commentLikeList: commentLikeList.filter((userId) => userId !== userId),
    })
    .eq("commentId)", commentId);
  return data;
};

//대댓글(?)
