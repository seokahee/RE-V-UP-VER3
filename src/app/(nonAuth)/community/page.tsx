"use client";
import MusicSearchModal from "@/components/search/MusicSearch";
import SearchForm from "@/components/search/SearchForm";
import { supabase } from "@/shared/supabase/supabase";
import { CommunityType } from "@/types/types";
import { onDateHandler } from "@/util/util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Community = () => {
  const [isSort, setIsSort] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["communityList"],
    queryFn: async () => {
      const { data } = await supabase
        .from("community")
        .select(
          "boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail)"
        )
        .order(isSort ? "date" : "likeList", { ascending: false });

      if (data) {
        const communityImage = data.map((item) => {
          const imgData = supabase.storage
            .from("musicThumbnail")
            .getPublicUrl("Coffee Shop Romance.png");
          if (imgData) {
            return { ...item, thumbnail: imgData.data.publicUrl };
          }
        });
        return communityImage;
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [isSort, refetch]);

  if (!data) {
    return;
  }
  const filteredData = data.filter((item) => {
    return item && item.userInfo && item.musicInfo;
  }) as CommunityType[];

  return (
    <div>
      <SearchForm />
      <MusicSearchModal />
      <div className="flex gap-2 m-10">
        <p
          onClick={() => {
            setIsSort(true);
          }}
          className={`${isSort ? "text-zinc-400" : "text-black"}`}
        >
          최신순
        </p>
        <p
          onClick={() => {
            setIsSort(false);
          }}
          className={`${isSort ? "text-black" : "text-zinc-400"}`}
        >
          좋아요
        </p>
      </div>

      {filteredData.map((item) => {
        return (
          <div key={item!.boardId} className="flex items-center">
            <img
              src={item?.userInfo?.userImage ?? ""}
              alt=""
              className="w-28"
            />
            <img src={item.musicInfo.thumbnail} alt="" className="w-28" />
            <div className="flex flex-col gap-2">
              <div>{item!.boardTitle}</div>
              <div className="flex gap-2">
                <div>{item?.userInfo?.nickname ?? ""}</div>
                <div>{onDateHandler(item!.date)}</div>
                <div>좋아요 {item?.likeList.length}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Community;
