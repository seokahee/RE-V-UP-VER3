"use client";
import { MusicInfoType } from "@/types/types";

const SearchedMusicData = ({ item }: { item: MusicInfoType }) => {
  return (
    <div key={item.musicId} className="flex items-center">
      <img src={item.thumbnail} alt="" className="w-28" />
      <div className="flex flex-col gap-2">
        <div>{item.musicTitle}</div>
        <div className="flex gap-2">
          <div>{item.artist}</div>
          <div>{item.release}</div>
          <div>{item.musicSource}</div>
        </div>
      </div>
    </div>
  );
};
export default SearchedMusicData;
