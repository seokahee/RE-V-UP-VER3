"use client";
import SearchComponent from "@/components/search/SearchForm";
import SearchedCommunityData, {
  CommunityDataType,
  getCommunityData,
} from "@/components/search/SearchedCommunityData";
import SearchedMusicData, {
  MusicInfoDataType,
  getMusicInfoData,
} from "@/components/search/SearchedMusicData";
import { useSearchedStore } from "@/shared/store/searchStore";
import { useEffect, useState } from "react";

const Search = () => {
  const { searchedKeyword } = useSearchedStore();
  const { keyword, selectedTabs } = searchedKeyword;
  const [musicInfoResult, setMusicInfoResult] = useState<MusicInfoDataType>();
  const [communityResult, setCommunityResult] = useState<CommunityDataType>();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTabs === "musicInfo") {
        const { data } = await getMusicInfoData(keyword);
        setMusicInfoResult(data);
      }
      if (selectedTabs === "community") {
        const { data } = await getCommunityData(keyword);
        setCommunityResult(data);
      }
    };
    fetchData();
  }, [keyword, selectedTabs]);

  console.log("musicInfoResult", musicInfoResult);
  console.log("communityResult", communityResult);
  return (
    <div>
      <SearchComponent />
      <div>
        {selectedTabs === "musicInfo"
          ? musicInfoResult?.map((item) => {
              return <SearchedMusicData key={item.musicId} item={item} />;
            })
          : communityResult?.map((item) => {
              return <SearchedCommunityData key={item.boardId} item={item} />;
              // 썸네일 속성 필수래서 넣어줬는데 계속 빨갛게 뜸 기능은 정상작동
            })}
      </div>
    </div>
  );
};

export default Search;
