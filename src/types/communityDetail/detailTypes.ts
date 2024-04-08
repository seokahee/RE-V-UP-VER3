export type readCommuDetail = {
  boardId?: string;
  boardTitle?: string;
  content?: string;
  date?: string;
  musicId?: string;
  likeList?: string[];
  userId?: string;
  userInfo?: {
    nickname?: string;
    userImage?: string;
  };
  comment?: {
    commentId?: string;
  }[];
  musicInfo?: {
    musicId?: string;
    musicTitle?: string;
    artist?: string;
    thumbnail?: string;
  };
};
