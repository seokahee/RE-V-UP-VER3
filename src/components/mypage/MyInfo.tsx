"use client";

import { updateMyMusicIds, getUserAndPlaylistData, getUserPlaylistMyMusicInfoData, updateNickname, uploadUserThumbnail } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CheckboxItem from "./CheckboxItem";
import Modal from "./Modal";
import Link from "next/link";
import TabMenu from "./TabMenu";
import FollowList from "./FollowList";
import MyPlaylist from "./MyPlaylist";
import { UserInfo } from "@/types/mypage/types";

const MyInfo = () => {
  const { userInfo } = useStore();

  const [userImage, setUserImage] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [isFollowModal, setIsFollowModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [checkText, setCheckText] = useState("");
  const nicknameRef = useRef(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(userInfo.uid),
    queryKey: ["mypage", userInfo.uid],
    enabled: !!userInfo.uid
  });

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    }
  });

  const updateUserThumbnailMutation = useMutation({
    mutationFn: uploadUserThumbnail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    }
  });

  const onClickViewModalHandler = () => {
    setIsModal(true);
  };

  const onClickCloseModalHandler = () => {
    setIsModal(false);
    setNickname("");
    setCheckText("");
  };

  const onClickUpdateHandler = () => {
    if (!nickname.trim()) {
      setCheckText("닉네임을 입력해주세요");
      return;
    }
    updateNicknameMutation.mutate({ userId: userInfo.uid, nickname });
    alert("닉네임 변경이 완료되었습니다.");
    onClickCloseModalHandler();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);
  };

  const selectFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] as File;
    console.log(file);
    if (window.confirm("선택한 이미지로 업로드를 진행할까요?")) {
      const data = await updateUserThumbnailMutation.mutateAsync({ userId: userInfo.uid, file });
      setUserImage(data?.[0].userImage as string);
      alert("업로드 완료!");
    }
  };

  const onClickCloseFollowModalHandler = () => {
    setIsFollowModal(false);
  };

  const onClickViewFollowModalHandler = () => {
    setIsFollowModal(true);
  };

  const tabArr = [
    { id: 0, title: "팔로잉", content: <FollowList data={data?.following!} dataKey={"following"} /> },
    { id: 1, title: "팔로워", content: <FollowList data={data?.follower!} dataKey={"follower"} myFollowing={data?.following!} /> }
  ];

  useEffect(() => {
    if (data) {
      setUserImage(data?.userImage);
    }
  }, [data]);

  if (isError) {
    return <>에러발생</>;
  }

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <section className="p-[40px]">
      <div>
        <div className="flex justify-between">
          <div>
            <input type="file" onChange={selectFileHandler} accept="image/*" />
            <figure className="w-[80px] h-[80px] flex overflow-hidden rounded-full bg-slate-200">
              {userImage && <Image src={userImage} width={80} height={80} alt={`${data?.nickname} 프로필 이미지`} priority={true} />}
            </figure>
          </div>
          <Link href="/personal-music">퍼스널 뮤직 진단 다시받기</Link>
        </div>
        <span className="cursor-pointer" onClick={onClickViewModalHandler}>
          {data?.nickname} &gt;
        </span>
        <p onClick={onClickViewFollowModalHandler} className="cursor-pointer">
          팔로잉 {data?.following.length} 팔로워 {data?.follower.length}
        </p>
        <p>
          {data?.userChar?.mbti}
          {data?.personalMusic?.resultSentence}
        </p>
      </div>
      <MyPlaylist data={data!} />
      {isModal && (
        <Modal onClick={onClickCloseModalHandler}>
          <label>
            <input type="text" value={nickname} className="w-full" ref={nicknameRef} onChange={onChangeInput} placeholder="변경할 닉네임을 입력해주세요" />
          </label>
          <p className="h-5 text-sm text-red-500">{checkText}</p>
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={onClickCloseModalHandler}>
              취소
            </button>
            <button type="button" onClick={onClickUpdateHandler}>
              변경
            </button>
          </div>
        </Modal>
      )}

      {isFollowModal && (
        <Modal onClick={onClickCloseFollowModalHandler}>
          <TabMenu data={tabArr} width={"w-1/2"} />
        </Modal>
      )}
    </section>
  );
};

export default MyInfo;
