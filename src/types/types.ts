import { Tables } from "./supabase";

export type SignUp = {
  userId?: string;
  email: string;
  password: string;
  nickname?: string;
};

export type CommunityType = {
  boardId: string;
  boardTitle: string;
  date: string;
  likeList: string[];
  thumbnail: string;
  userInfo: {
    userId: string;
    nickname: string;
    userImage: string;
  };
};

export type MusicInfoType = {
  artist: string;
  musicId: string;
  musicSource: string;
  musicTitle: string;
  release: string;
  thumbnail: string;
};
