"use client";

import { getBannerData } from "@/shared/main/api";
import { useStore } from "@/shared/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

const MainBanner = () => {
  const { userInfo } = useStore();
  const [slide, setSlide] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getBannerData(userInfo.uid),
    queryKey: ["mainBanner", userInfo.uid],
    enabled: !!userInfo.uid
  });

  const onClickPrevHandler = () => {
    setSlide((prev) => prev - 1);
  };

  const onClickNextHandler = () => {
    setSlide((prev) => prev + 1);
  };

  if (isError) {
    return "에러 발생!!";
  }

  if (isLoading) {
    return "로딩중";
  }

  return (
    <div>
      {data && data?.[0]?.imageUrl.length > 0 ? (
        <div className="relative m-4">
          <ul className={`flex overflow-hidden transition-all`}>
            {data?.[0].imageUrl.map((item, idx) => {
              const splitUrl = item.split("/");

              return (
                <li key={splitUrl[splitUrl.length - 1]} className={`w-full [&_img]:w-full [&_img]:h-auto transition-opacity ${slide === idx ? "block" : "hidden"}`}>
                  <Image src={item} width={1600} height={300} alt={`배너 이미지 ${idx}`} />
                </li>
              );
            })}
          </ul>
          <div>
            <button type="button" className={`absolute left-0 top-1/2 -translate-y-1/2 ${slide === 0 ? "hidden" : "block"}`} onClick={onClickPrevHandler}>
              PREV
            </button>
            <button type="button" className={`absolute right-0 top-1/2 -translate-y-1/2 ${slide < data?.[0].imageUrl.length - 1 ? "block" : "hidden"}`} onClick={onClickNextHandler}>
              NEXT
            </button>
          </div>
        </div>
      ) : (
        <div className="[&_img]:w-full [&_img]:h-auto">
          <Image src={"https://lukvbpxaabobwpzkacow.supabase.co/storage/v1/object/public/adBanner/Group_286.png"} alt="배너 이미지" width={1670} height={254} />
        </div>
      )}
    </div>
  );
};

export default MainBanner;
