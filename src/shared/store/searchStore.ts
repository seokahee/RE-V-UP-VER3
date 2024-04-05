import { create } from "zustand";

type SearchedKeywordStore = {
  searchedKeyword: {
    keyword: string;
    selectedTabs: string;
  };
  searched: (keyword: string, selectedTabs: string) => void;
};
// 크리에이트 함수의 반환값도 타입을 지정해줘야한다 지정하지 않을 경우, initialState의 타입으로 추론해버림 그래서 외부에서searched함수를 사용할 수 없음

const initialState = {
  searchedKeyword: {
    keyword: "",
    selectedTabs: "musicInfo",
  },
};

export const useSearchedStore = create<SearchedKeywordStore>((set) => ({
  ...initialState,
  searched: (keyword: string, selectedTabs: string) =>
    set({ searchedKeyword: { keyword, selectedTabs } }),
}));
