export type UserInfo = {
  userId: string;
  email: string;
  userType: number;
  nickname: string;
  following: string[];
  follower: string[];
  userChar: {
    gender: boolean;
    age: number;
    mbti: number;
  };
  mbtiOpen: boolean;
  personalMusicOpen: boolean;
  playlistOpen: boolean;
  postsOpen: boolean;
  likedPostsOpen: boolean;
  userImage: string;
};
