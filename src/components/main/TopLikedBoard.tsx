"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopLikedBoard = {
  boardId: string;
  boardTitle: string;
  likeList: string[];
  userId: string;
  userInfo: {
    nickname: string;
    userImage: string;
  };
  comment: {
    commentId: string;
  }[];
};

const TopLikedBoard = () => {
  const getTopLikedBoardData = async (): Promise<TopLikedBoard[]> => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    oneWeekAgo.setHours(0, 0, 0, 0);

    try {
      const { data, error } = await supabase
        .from("community")
        .select("boardId, boardTitle, likeList, userId, userInfo(nickname, userImage), comment(commentId)")
        .gte("date", oneWeekAgo.toISOString())
        .lte("date", currentDate.toISOString());
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
    <section className="p-4">
      <h2>지금 핫한 게시글</h2>
      <div className="relative">
        <ul className="flex relative ">
          {data
            ?.sort((a, b) => {
              return b.likeList.length - a.likeList.length;
            })
            .map((item) => {
              const likedLength = item.likeList.length;

              return (
                <li key={item.boardId} className="flex w-2/5 my-2 border border-solid border-slate-300">
                  <div className="flex">
                    <span className="w-5 h-5 flex overflow-hidden rounded-full bg-slate-200">
                      {item.userInfo.userImage && <Image src={item.userInfo.userImage} alt={item.userInfo.nickname!} width={20} height={20} />}
                    </span>
                    {item.userInfo.nickname}
                  </div>
                  <Link href={`/community/${item.boardId}`}>{item.boardTitle}</Link>
                  <div>
                    댓글 {item.comment.length} 좋아요 {likedLength}
                  </div>
                </li>
              );
            })}
        </ul>
        <div>
          <button type="button" className="absolute left-0 top-1/2 -translate-y-1/2">
            왼쪽
          </button>
          <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2">
            오른쪽
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopLikedBoard;
