"use client";

import { useQuery } from "@tanstack/react-query";
import { getComments, deleteComment } from "@/shared/comment/commentApi";
import Image from "next/image";
import { onCommentHandler } from "@/util/comment/util";
import { useStore } from "@/shared/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CommentsList = () => {
  const { userInfo } = useStore();
  const queryClient = useQueryClient();

  const { data: commentsData } = useQuery({
    queryFn: () => getComments(),
    queryKey: ["comments"],
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });

  const onDeleteCommentHandler = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
    alert("삭제가 완료됐습니다.");
  };

  return (
    <div>
      {commentsData?.map((item) => (
        <div key={item.commentId}>
          <span className="w-5 h-5 flex overflow-hidden rounded-full bg-slate-200">
            {item.userInfo?.userImage && (
              <Image
                src={item.userInfo.userImage}
                alt=""
                width={20}
                height={20}
              />
            )}
          </span>
          닉네임 :{item.userInfo?.nickname}
          <br />
          {item.commentContent} <br />
          {onCommentHandler(item.commentDate)} <br />
          {item.userInfo.userId === userInfo.uid ? (
            <>
              <button onClick={() => onDeleteCommentHandler(item.commentId)}>
                삭제
              </button>
              <button>수정</button>
            </>
          ) : (
            ""
          )}
        </div>
      ))}

      <div></div>
      <div></div>
    </div>
  );
};

export default CommentsList;
