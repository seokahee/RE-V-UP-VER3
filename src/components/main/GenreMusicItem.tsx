import { GenreMusicInfo } from "@/types/types";
import Image from "next/image";
import React from "react";

const GenreMusicItem = ({ item }: { item: GenreMusicInfo }) => {
  return (
    <li key={item.musicId} className="w-[136px] p-2 mr-6 list-none">
      <figure>
        <Image src={item.thumbnail} width={120} height={120} alt={`${item.musicTitle} 앨범 썸네일`} />
      </figure>
      <strong>{item.musicTitle}</strong>
      <span>{item.artist}</span>
      장르 : {item.genre}
    </li>
  );
};

export default GenreMusicItem;
