"use client";
import { supabase } from "@/shared/supabase/supabase";
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
}

const Community = () => {
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);

  useEffect(() => {
    const getCommunity = async () => {
      const { data, error } = await supabase
        .from("community")
        .select("*")
        .order("date", { ascending: false });

      if (!data) {
        console.log("커뮤니티 리스트를 가져오지 못했습니다", error);
      } else {
        const communityImage = data.map((item) => {
          const imgData = supabase.storage
            .from("thumbnail")
            .getPublicUrl("main.png");
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
  }, []);

  return (
    <div>
      {communityList.map((item) => {
        console.log("item.thumbnail", item.thumbnail);
        return (
          <div key={item.boardId}>
            <img src={item.thumbnail} alt="" />
            <div>{item.boardTitle}</div>
            <div>{item.content}</div>
            <div>좋아요 {item.likeList.length}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Community;
