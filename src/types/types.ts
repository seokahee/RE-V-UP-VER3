import { Tables } from "./supabase";

export type SignUp = {
  userId?: string;
  email: string;
  password?: string;
  nickname?: string;
};

export type CommunityType = {
  boardId: string;
  boardTitle: string;
  date: string;
  likeList: string[];
  userInfo: {
    nickname: string;
    userImage: string;
  };
  musicInfo: {
    thumbnail: string;
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

export type GenreMusicInfo = {
  artist: string;
  genre: number;
  lyrics: string;
  musicId: string;
  musicSource: string;
  musicTitle: string;
  release: string;
  thumbnail: string;
};

export type MusicPreference = {
  ballad: number;
  dance: number;
  hiphop: number;
  rnb: number;
  rock: number;
};

export type UserChar = {
  userChar: {
    gender?: boolean;
    age?: number;
    mbti?: number;
  };
};

export type PlaylistCurrent = {
  currentId: string;
  userId: string;
  currentMusicIds: string[];
};

export type Banner = {
  adId: string;
  userId: string;
  imageUrl: string[];
};
