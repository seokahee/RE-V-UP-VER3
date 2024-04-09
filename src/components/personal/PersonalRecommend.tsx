import React from "react";
import Image from "next/image";
import {
  recommendMusic,
  getRecommendMusic,
} from "@/shared/personal/personalApi";
import { insertUserChar } from "@/shared/personal/personalApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useStore } from "@/shared/store";
import type { UserChar } from "@/types/main/types";

type PersonalRecommendProps = {
  userChar: {
    gender: string;
    mbti: string;
  };
};

const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const mbtiStatus = userChar.mbti;
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(mbtiStatus),
    queryKey: ["test"],
  });

  const { data: recommend } = useQuery({
    queryFn: () => getRecommendMusic(musicPreferenceData),
    queryKey: ["testaaa"],
  });
  console.log("장르코드", musicPreferenceData);
  console.log("추천음악", recommend);

  const { userInfo } = useStore();

  const queryClient = useQueryClient();

  //입력한 userChar
  const insertUserCharMutation = useMutation({
    mutationFn: insertUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChar"] });
    },
  });

  return (
    <div>
      <p>추천음악</p>
      {recommend?.map((item) => (
        <div>
          <div>
            <Image
              src={item.thumbnail}
              width={120}
              height={120}
              alt={`${item.musicTitle} 앨범 썸네일`}
            />
          </div>
          <div>제목 : {item.musicTitle}</div>
          <div>가수 : {item.artist}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default PersonalRecommend;
