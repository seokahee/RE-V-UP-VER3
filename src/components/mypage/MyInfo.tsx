"use client";

import { updateMyMusicIds, getUserAndPlaylistData, getUserPlaylistMyMusicInfoData } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import CheckboxItem from "./CheckboxItem";

const MyInfo = () => {
  const { userInfo } = useStore();

  const [checkedList, setCheckedList] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(userInfo.uid),
    queryKey: ["mypage", userInfo.uid],
    enabled: !!userInfo.uid
  });

  const { data: playlistMyData } = useQuery({
    queryFn: () => getUserPlaylistMyMusicInfoData(data?.playlistMy?.[0].myMusicIds as string[]),
    queryKey: ["myMusicIds", data?.playlistMy],
    enabled: !!data?.playlistMy?.length
  });

  const deleteMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    }
  });

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      const checkList = checkedList.filter((el) => el !== id);
      setCheckedList(checkList);
    }
  };

  const onClickDeleteHandler = () => {
    const myMusicIds = data?.playlistMy?.[0].myMusicIds as string[];
    const newData = myMusicIds.filter((el) => !checkedList.includes(el));
    console.log(newData);
    deleteMutation.mutate({ userId: userInfo.uid, myMusicIds: newData });
    alert("삭제가 완료되었습니다.");
  };

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
        <div>
          <button type="button" onClick={onClickDeleteHandler}>
            삭제
          </button>
          <button type="button">{checkedList.length}곡 재생</button>
        </div>
        <ul>
          {playlistMyData?.map((item) => {
            return (
              <li key={item.musicId}>
                <div>
                  <CheckboxItem checked={checkedList.includes(item.musicId)} id={item.musicId} onChangeCheckMusicHandler={(e) => onChangeCheckMusicHandler(e.target.checked, item.musicId)} />
                  <figure>
                    <Image src={item.thumbnail} width={56} height={56} alt={`${item.musicTitle} 앨범 이미지`} />
                  </figure>
                  <label htmlFor={item.musicId} className="flex flex-col">
                    {item.musicTitle}
                    <span>{item.artist}</span>
                  </label>
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
