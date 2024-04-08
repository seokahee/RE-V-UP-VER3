import React, { useState } from "react";
import CheckboxItem from "./CheckboxItem";
import { getUserPlaylistMyMusicInfoData, updateMyMusicIds } from "@/shared/mypage/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserInfo } from "@/types/mypage/types";
import { useStore } from "@/shared/store";
import Image from "next/image";

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { userInfo } = useStore();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const queryClient = useQueryClient();

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
    if (checkedList.length === 0) {
      alert("삭제할 노래를 선택해주세요!");
      return;
    }
    const myMusicIds = data?.playlistMy?.[0].myMusicIds as string[];
    const newData = myMusicIds.filter((el) => !checkedList.includes(el));

    deleteMutation.mutate({ userId: userInfo.uid, myMusicIds: newData });
    alert("삭제가 완료되었습니다.");
    setCheckedList([]);
  };

  return (
    <div className="mt-[5rem]">
      <h2>{data?.nickname}님의 플레이리스트</h2>
      <button type="button">전체 재생 하기</button>
      <div>
        <button type="button" onClick={onClickDeleteHandler}>
          삭제
        </button>
        <button type="button">{checkedList.length}곡 재생</button>
      </div>
      <ul className="list-none">
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
  );
};

export default MyPlaylist;
