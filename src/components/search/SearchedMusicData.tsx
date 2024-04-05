"use client";
import { supabase } from "@/shared/supabase/supabase";
import { MusicInfoType } from "@/types/types";

export const getMusicInfoData = async (keyword: string) => {
  const { data } = await supabase
    .from("musicInfo")
    .select("musicId, musicTitle, artist, thumbnail, release, musicSource")
    .or(`musicTitle.ilike.%${keyword}%,artist.ilike.%${keyword}%`)
    .order("musicTitle", { ascending: false });
  return { data };
};
export type MusicInfoDataType = Awaited<
  ReturnType<typeof getMusicInfoData>
>["data"];
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
