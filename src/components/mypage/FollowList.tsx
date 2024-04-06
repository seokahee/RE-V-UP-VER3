"use client";

import { getFollowData } from "@/shared/mypage/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type FollowProps = {
  data: string[];
  dataKey: string;
};

const FollowList = ({ data, dataKey }: FollowProps) => {
  const {
    data: followData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => getFollowData(data),
    queryKey: [dataKey],
    enabled: !!data
  });

  if (isError) {
    return "에러가 발생했습니다!";
  }

  if (isLoading) {
    return "데이터를 불러오는 중입니다.";
  }

  return (
    <ul className="list-none">
      {followData?.map((item) => {
        return (
          <li key={item.userId}>
            <figure>{item.userImage && <Image src={item.userImage} width={50} height={50} alt={`${item.nickname} 프로필 이미지`} />}</figure>
            <Link href={`/userpage/${item.userId}`}>{item.nickname}</Link>
          </li>
        );
      })}
      {followData?.length === 0 && <li className="text-center">{dataKey === "following" ? "팔로잉" : "팔로워"} 리스트가 나타납니다.</li>}
    </ul>
  );
};

export default FollowList;
