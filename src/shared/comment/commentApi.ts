import { comment, newComment } from "@/types/comment/type";
import { supabase } from "../supabase/supabase";

//댓글 조회
export const getComments = async (): Promise<comment[]> => {
  let { data: comment, error } = await supabase
    .from("comment")
    .select(
      "commentId,commentContent,commentDate,userInfo(userId, nickname, userImage)"
    );
  if (error) {
    throw error.message;
  }
  return comment as comment[];
};

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

//댓글 수정
