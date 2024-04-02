"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
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
    <ul>
      {data?.map((item) => {
        const likedLength = item.likeList.length;
        return (
          <li key={item.boardId} className="my-2 border border-solid border-slate-300">
            {item.boardTitle}
            <div>좋아요 {likedLength}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default TopLikedBoard;
