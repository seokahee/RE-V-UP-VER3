"use client";

import { getMyWriteListCount, getMyWriteListData } from "@/shared/mypage/api";
import { useStore } from "@/shared/store";
import { onDateHandler } from "@/util/util";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "./Pagination";
import BoardItem from "./BoardItem";

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
          return <BoardItem key={item.boardId} data={item} />;
        })}
      </ul>
      {data && data?.length > 0 ? <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} setCurrentPage={setCurrentPage} /> : ""}
    </section>
  );
};

export default WriteList;
