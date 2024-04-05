"use client";

import { USER_ID, getMusicPreferenceData, getUserChar } from "@/shared/main/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RecommendationMusicList from "./RecommendationMusicList";
import RandomMusicList from "./RandomMusicList";

const GenreMusicList = () => {
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
