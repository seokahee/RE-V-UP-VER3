"use client";
import Search from "@/components/search/Search";
import { supabase } from "@/shared/supabase/supabase";
import { onDateHandler } from "@/util/util";
import React, { useEffect, useState } from "react";

interface CommunityData {
  boardId: string;
  boardTitle: string;
  content: string;
  date: string;
  images: string;
  likeList: string[];
  musicId: string;
  thumbnail: string;
  userId: string;
  adId?: string;
  userInfo: {
    nickname: string;
    userImage: string;
  };
}

const Community = () => {
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);
  const [isSort, setIsSort] = useState(true);

  useEffect(() => {
    const getCommunity = async () => {
      const { data, error } = await supabase
        .from("community")
        .select(
          "boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage)"
        )
        .order(isSort ? "date" : "likeList", { ascending: false });

      if (!data) {
        console.log("커뮤니티 리스트를 가져오지 못했습니다", error);
      } else {
        const communityImage = data.map((item: any) => {
          const imgData = supabase.storage
            .from("musicThumbnail")
            .getPublicUrl("Coffee Shop Romance.png");
          if (imgData) {
            return { ...item, thumbnail: imgData.data.publicUrl };
          } else {
            console.log("이미지를 가져오지 못했습니다");
          }
        });
        setCommunityList(communityImage);
      }
    };
    getCommunity();
  }, [isSort]);

  return (
    <div>
      <Search />
      <div className="flex gap-2 m-10">
        <p
          onClick={() => {
            setIsSort(true);
          }}
          className={`${isSort ? "text-zinc-400" : "text-black"}`}
        >
          최신순
        </p>
        <p
          onClick={() => {
            setIsSort(false);
          }}
          className={`${isSort ? "text-black" : "text-zinc-400"}`}
        >
          좋아요
        </p>
      </div>

      {communityList.map((item) => {
        return (
          <div key={item.boardId} className="flex items-center">
            <img src={item.thumbnail} alt="" className="w-28" />
            <div className="flex flex-col gap-2">
              <div>{item.boardTitle}</div>
              <div className="flex gap-2">
                <div>{item.userInfo.nickname}</div>
                <div>{onDateHandler(item.date)}</div>
                <div>좋아요 {item.likeList.length}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Community;
