export type SignUp = {
  userId?: string;
  email: string;
  password?: string;
  nickname?: string;
};

export type TopLikedBoard = {
  boardId: string;
  boardTitle: string;
  likeList: string[];
  userId: string;
  userInfo: {
    nickname: string;
    userImage: string;
  };
  comment: {
    commentId: string;
  }[];
};
