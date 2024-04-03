"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
  const slideRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  // const [currentSlide, setCurrentSlide] = useState(0);

  const MOVE_POINT = 354 + 16; //임시값 - 슬라이드로 이동할 값

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

      return data as TopLikedBoard[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryFn: () => getTopLikedBoardData(),
    queryKey: ["topLikedBoard"]
  });

  const onClickPrevHandler = () => {
    if (position < 0) {
      setPosition((prev) => prev + MOVE_POINT);
      // setCurrentSlide((prev) => prev - 1);
    }
  };

  const onClickNextHandler = () => {
    setPosition((prev) => prev - MOVE_POINT);
    // const slideWrapWidth = slideRef.current?.offsetWidth!;
    // const slideListWidth = MOVE_POINT * (data?.length as number);
    // const viewCount = slideWrapWidth / MOVE_POINT;

    // if (viewCount < currentSlide) {
    //   setPosition((prev) => prev - MOVE_POINT);
    // } else {
    //   setPosition((prev) => slideWrapWidth - slideListWidth);
    // }
    // setCurrentSlide((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(position, "position");
  }, [position]);

  if (isError) {
    return "에러 발생";
  }

  if (isLoading) {
    return "로딩중";
  }

  return (
    <section className="p-4">
      <h2 className="my-4">지금 핫한 게시글 🔥</h2>
      <div className="relative flex overflow-hidden" ref={slideRef}>
        <ul
          className="flex flex-nowrap"
          style={{
            transition: "all 0.4s ease-in-out",
            transform: `translateX(${position}px)`
          }}
        >
          {data
            ?.sort((a, b) => {
              return b.likeList.length - a.likeList.length;
            })
            .map((item) => {
              const likedLength = item.likeList.length;

              return (
                <li key={item.boardId} className="w-[356px] p-4 mr-4 border border-solid border-slate-300 list-none rounded-[2rem]">
                  <div className="flex items-center">
                    <span className="w-5 h-5 flex overflow-hidden rounded-full bg-slate-200">
                      {item.userInfo.userImage && <Image src={item.userInfo.userImage} alt={item.userInfo.nickname!} width={20} height={20} />}
                    </span>
                    {item.userInfo.nickname}
                  </div>
                  <Link href={`/community/${item.boardId}`} className="block text-ellipsis whitespace-nowrap overflow-hidden">
                    {item.boardTitle}
                  </Link>
                  <div className="mt-4 text-right">
                    댓글 {item.comment.length} 좋아요 {likedLength}
                  </div>
                </li>
              );
            })}
        </ul>
        <div>
          {position !== ((data?.length as number) - 1) * -MOVE_POINT && (
            <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white" onClick={onClickNextHandler}>
              NEXT
            </button>
          )}
          {position !== 0 && (
            <button type="button" className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white" onClick={onClickPrevHandler}>
              PREV
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopLikedBoard;
