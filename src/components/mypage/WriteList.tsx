"use client";

import { getMyWriteListCount, getMyWriteListData } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { onDateHandler } from "@/util/util";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "./Pagination";

const WriteList = () => {
  const { userInfo } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: totalCount } = useQuery({
    queryFn: () => getMyWriteListCount(userInfo.uid),
    queryKey: ["myWriteListAllCount"],
    enabled: !!userInfo.uid
  });

  const PER_PAGE = 2;
  const totalPages = Math.ceil(totalCount! / PER_PAGE);
  const start = (currentPage - 1) * PER_PAGE;
  const end = currentPage * PER_PAGE - 1;

  const { data } = useQuery({
    queryFn: () => getMyWriteListData(userInfo.uid, start, end),
    queryKey: ["myWriteList", currentPage],
    enabled: !!userInfo.uid
  });

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <section>
      <ul className="mb-8">
        {data?.map((item) => {
          return (
            <li key={item.boardId} className="p-4 border-b border-black border-solid">
              <figure>
                <figure>{item.userInfo?.userImage && <Image src={item.userInfo.userImage} width={50} height={50} alt={`${item.userInfo.nickname} 프로필 이미지`} />}</figure>
              </figure>
              <Link href={`/community/${item.boardId}`}>{item.boardTitle}</Link>
              <figure>{item.musicInfo?.thumbnail && <Image src={item.musicInfo.thumbnail} width={80} height={80} alt={`${item.musicInfo.musicTitle} 앨범 이미지`} />}</figure>
              {item.userInfo?.nickname}
              {onDateHandler(item.date)}
              <div>
                좋아요 수 {item.likeList.length} / 댓글 수 {item.comment.length}
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} setCurrentPage={setCurrentPage} />
    </section>
  );
};

export default WriteList;
