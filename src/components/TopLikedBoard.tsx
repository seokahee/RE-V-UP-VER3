"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type TopLikedBoard = {
  boardId: string;
  boardTitle: string;
  likeList: string[];
};

const TopLikedBoard = () => {
  const getTopLikedBoardData = async (): Promise<TopLikedBoard[]> => {
    try {
      const { data, error } = await supabase.from("community").select("boardId, boardTitle, likeList");
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
