export type comment = {
  commentId: string;
  commentContent: string;
  commentDate: string;
  userInfo: {
    userId: string;
    nickname: string;
    userImage: string;
  };
};

export type newComment = {
  userId: string;
  boardId: string;
  commentLikeList: string[];
  commentDate: string;
  commentContent: string;
};
