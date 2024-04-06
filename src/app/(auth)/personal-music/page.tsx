"use client";
import PersonalTest from "@/components/personal/PersonalTest";
import React from "react";
import { getUserChar } from "@/shared/main/api";
import { addUserChar } from "@/shared/personal/personalApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/shared/store";
import type { UserChar } from "@/types/main/types";

const PersonalMusicPage = () => {
  const { userInfo } = useStore();
  console.log("userInfo", userInfo);
  const queryClient = useQueryClient();
  //유저 정보 조회
  const { data: userData } = useQuery({
    queryFn: () => getUserChar(userInfo.uid),
    queryKey: ["userChar"],
  });
  console.log("로그인한 데이터", userData);

  //입력한 userChar
  const insertUserCharMutation = useMutation({
    mutationFn: addUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChar"] });
    },
  });

  //퍼스널 뮤직진단 결과
  const onUserCharHandler = () => {
    const personalUser: UserChar = {
      age: 27,
      mbti: "insert- test",
      gender: true,
      resultSentence: "당신은 힙합을 좋아하는 국힙원탑입니다.",
    };
    insertUserCharMutation.mutate({ userId: userInfo.uid, personalUser });
  };

  return (
    <div>
      <PersonalTest />
      나이 : <input type="text" />
      mbti : <input type="text" />
      gender : <input type="text" />
      <button onClick={onUserCharHandler}>ddd</button>
    </div>
  );
};

export default PersonalMusicPage;
