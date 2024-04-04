"use client";

import { getMusicPreferenceData, getUserChar } from "@/shared/main/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RecommendationMusicList from "./RecommendationMusicList";
import RandomMusicList from "./RandomMusicList";

const GenreMusicList = () => {
  const USER_ID = "016011ee-39dc-41d4-92a1-1ea7316c55dc"; //임시 값

  const { data: userData } = useQuery({
    queryFn: () => getUserChar(USER_ID),
    queryKey: ["userChar"]
  });

  const { data: musicPreferenceData } = useQuery({
    queryFn: () => getMusicPreferenceData(userData?.userChar.mbti as number),
    queryKey: ["userMusicPreference", userData],
    enabled: !!userData
  });

  return <>{musicPreferenceData ? <RecommendationMusicList musicPreferenceData={musicPreferenceData} /> : <RandomMusicList />}</>;
};

export default GenreMusicList;
