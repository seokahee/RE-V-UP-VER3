import { create } from 'zustand'

type SearchedKeywordStore = {
  searchedKeyword: {
    keyword: string
    selectedTabs: string
  }
  searched: (keyword: string, selectedTabs: string) => void
}

const initialState = {
  searchedKeyword: {
    keyword: '',
    selectedTabs: 'musicInfo',
  },
}

export const useSearchedStore = create<SearchedKeywordStore>((set) => ({
  ...initialState,
  searched: (keyword: string, selectedTabs: string) =>
    set({ searchedKeyword: { keyword, selectedTabs } }),
}))
