"use client";

import { getUserAndPlaylistData, getUserPlaylistMyData } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";

const MyInfo = () => {
  const { userInfo } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(userInfo.uid),
    queryKey: ["mypage", userInfo.uid],
    enabled: !!userInfo.uid
  });

  const { data: playlistMyData } = useQuery({
    queryFn: () => getUserPlaylistMyData(data?.playlistMy?.[0].myMusicIds as string[]),
    queryKey: ["playlistMy", data?.playlistMy],
    enabled: !!data?.playlistMy?.length
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isError) {
    return <>에러발생</>;
  }

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <section>
      <div>
        <figure className="w-5 h-5 flex overflow-hidden rounded-full bg-slate-200">
          {data?.userImage && <Image src={data?.userImage} width={150} height={150} alt={`${data?.nickname} 프로필 이미지`} />}
        </figure>
        <button type="button">퍼스널 뮤직 진단 다시받기</button>
        {data?.nickname}
        팔로우 {data?.following.length} 팔로워 {data?.follower.length}
        {data?.userChar?.mbti}
        {data?.personalMusic?.resultSentence}
      </div>
      <div>
        <h2>{data?.nickname}님의 플레이리스트</h2>
        <button type="button">전체 재생 하기</button>
        <ul>
          {playlistMyData?.map((item) => {
            return (
              <li key={item.musicId}>
                <div>
                  <label>
                    <input type="checkbox" />
                  </label>
                  <figure>
                    <Image src={item.thumbnail} width={56} height={56} alt={`${item.musicTitle} 앨범 이미지`} />
                  </figure>
                  <div className="flex flex-col">
                    {item.musicTitle}
                    <span>{item.artist}</span>
                  </div>
                </div>
                <span>재생시간..</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MyInfo;
