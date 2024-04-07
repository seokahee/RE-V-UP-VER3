"use client";
import { CommunityType } from "@/types/types";
import { onDateHandler } from "@/util/util";

const SearchedCommunityData = ({ item }: { item: CommunityType }) => {
  return (
    <div key={item.boardId} className="flex items-center">
      <img src={item.userInfo.userImage} alt="" className="w-28" />
      <img src={item.musicInfo.thumbnail} alt="" className="w-28" />
      <div className="flex flex-col gap-2">
        <div>{item.boardTitle}</div>
        <div className="flex gap-2">
          <div>{item.userInfo.nickname}</div>
          <div>{onDateHandler(item.date)}</div>
          <div>좋아요 {item.likeList.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchedCommunityData;
