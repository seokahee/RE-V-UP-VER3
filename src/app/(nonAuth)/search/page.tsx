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
import { CommunityType } from "@/types/types";
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

  const filteredData = communityResult?.filter((item) => {
    return item && item.userInfo && item.musicInfo;
  }) as CommunityType[];

  return (
    <div>
      <SearchComponent />
      <div>
        {selectedTabs === "musicInfo" && musicInfoResult && (
          <div>
            {musicInfoResult.map((item) => (
              <SearchedMusicData key={item.musicId} item={item} />
            ))}
          </div>
        )}
        {selectedTabs !== "musicInfo" && communityResult && (
          <div>
            {filteredData.map((item) => (
              <SearchedCommunityData key={item.boardId} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
