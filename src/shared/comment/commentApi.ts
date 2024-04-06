import { comment } from "@/types/comment/type";
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

//댓글 추가
// export const addComment = async () => {
//   const { data, error } = await supabase
//     .from("comment")
//     .insert([{ commentContent: "commentContent", commentDate: "commentDate" }])
//     .select();
//   if (error) {
//     throw error.message;
//   }
// };

//댓글 삭제

//댓글 수정
