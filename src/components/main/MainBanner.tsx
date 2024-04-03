"use client";

import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type Banner = {
  adId: string;
  userId: string;
  imageUrl: string[];
};

const MainBanner = () => {
  const USER_ID = "016011ee-39dc-41d4-92a1-1ea7316c55dc"; //임시 값

  const getBannerData = async (userId: string): Promise<Banner[]> => {
    try {
      const { data, error } = await supabase.from("advertisement").select("adId, userId, imageUrl").eq("userId", userId);
      console.log(data);
      return data as Banner[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data } = useQuery({
    queryFn: () => getBannerData(USER_ID),
    queryKey: ["mainBanner"],
    enabled: !!USER_ID
  });

  return (
    <div>
      {data && data?.[0].imageUrl.length > 0 ? (
        <>
          {data?.[0].imageUrl.map((item, idx) => {
            const splitUrl = item.split("/");
            return <Image key={splitUrl[splitUrl.length - 1]} src={item} width={1600} height={300} alt={`배너 이미지 ${idx}`} />;
          })}
        </>
      ) : (
        <div className="[&_img]:max-w-full [&_img]:h-auto">
          <Image src={"https://lukvbpxaabobwpzkacow.supabase.co/storage/v1/object/public/adBanner/Group_286.png"} alt="배너 이미지" width={1670} height={254} />
        </div>
      )}
    </div>
  );
};

export default MainBanner;
