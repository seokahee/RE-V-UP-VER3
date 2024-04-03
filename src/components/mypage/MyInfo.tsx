"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type UserInfo = {
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

const MyInfo = () => {
  const USER_ID = "016011ee-39dc-41d4-92a1-1ea7316c55dc"; //임시값

  const getUserData = async (userId: string): Promise<UserInfo[]> => {
    try {
      const { data, error } = await supabase
        .from("userInfo")
        .select("userId, email, userType, nickname, following, follower, userChar, mbtiOpen, personalMusicOpen, playlistOpen, postsOpen, likedPostsOpen, userImage")
        .eq("userId", userId);
      console.log(data);
      return data as UserInfo[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserData(USER_ID),
    queryKey: ["mypage"]
  });

  if (isError) {
    return <>에러발생</>;
  }

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <div>
      <div>
        {data?.[0].nickname}
        팔로우 {data?.[0].following.length} 팔로워 {data?.[0].follower.length}
      </div>
    </div>
  );
};

export default MyInfo;
