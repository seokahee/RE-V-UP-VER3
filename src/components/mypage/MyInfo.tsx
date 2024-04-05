"use client";

import { getUserData } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const MyInfo = () => {
  const { userInfo } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserData(userInfo.uid),
    queryKey: ["mypage", userInfo.uid],
    enabled: !!userInfo
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
        <figure className="w-5 h-5 flex overflow-hidden rounded-full bg-slate-200">
          {data?.userImage && <Image src={data?.userImage} width={150} height={150} alt={`${data?.nickname} 프로필 이미지`} />}
        </figure>
        {data?.nickname}
        팔로우 {data?.following.length} 팔로워 {data?.follower.length}
      </div>
    </div>
  );
};

export default MyInfo;
