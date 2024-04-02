"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type TopLikedBoard = {
  boardId: string;
  boardTitle: string;
  likeList: string[];
  userId: string;
};

const TopLikedBoard = () => {
  const getTopLikedBoardData = async (): Promise<TopLikedBoard[]> => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    oneWeekAgo.setHours(0, 0, 0, 0);

    try {
      const { data, error } = await supabase.from("community").select("boardId, boardTitle, likeList, userId").gte("date", oneWeekAgo.toISOString()).lte("date", currentDate.toISOString());
      console.log(data);
      return data as TopLikedBoard[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data } = useQuery({
    queryFn: () => getTopLikedBoardData(),
    queryKey: ["topLikedBoard"]
  });

  const userIds = data?.map((item) => item.userId);

  return (
    <>
      <h2>지금 핫한 게시글</h2>
      <ul>
        {data
          ?.sort((a, b) => {
            return b.likeList.length - a.likeList.length;
          })
          .map((item) => {
            const likedLength = item.likeList.length;
            return (
              <li key={item.boardId} className="my-2 border border-solid border-slate-300">
                <Link href={`/community/${item.boardId}`}>{item.boardTitle}</Link>
                <div>좋아요 {likedLength}</div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default TopLikedBoard;
