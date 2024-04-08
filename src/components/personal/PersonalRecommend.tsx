import React from "react";
import Image from "next/image";
import {
  recommendMusic,
  getRecommendMusic,
} from "@/shared/personal/personalApi";
import { addUserChar } from "@/shared/personal/personalApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useStore } from "@/shared/store";
import type { UserChar } from "@/types/main/types";

const PersonalRecommend = () => {
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(),
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
    mutationFn: addUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChar"] });
    },
  });

  //퍼스널 뮤직진단 결과 추가
  const onUserCharHandler = () => {
    const personalUser: UserChar = {
      age: 15,
      mbti: "ENFJ",
      gender: false,
      resultSentence: "당신은 R&B만 듣는 감성인입니다.",
    };
    insertUserCharMutation.mutate({ userId: userInfo.uid, personalUser });
  };

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
      <button onClick={onUserCharHandler}>유저정보 저장</button>
    </div>
  );
};

export default PersonalRecommend;
