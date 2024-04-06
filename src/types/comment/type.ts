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
