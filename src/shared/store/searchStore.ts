import { CommunityType } from '@/types/community/type'
import { MusicInfoType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SearchedKeywordStore = {
  searchedKeyword: {
    keyword: string
    selectedTabs: string
  }
  searched: (keyword: string, selectedTabs: string) => void
}

const keywordState = {
  searchedKeyword: {
    keyword: '',
    selectedTabs: 'musicInfo',
  },
}

export const useSearchedKeywordStore = create(
  persist<SearchedKeywordStore>(
    (set, _) => ({
      ...keywordState,
      searched: (keyword: string, selectedTabs: string) => {
        set({ searchedKeyword: { keyword, selectedTabs } })
      },
    }),
    {
      name: 'keywordStore',
    },
  ),
)

type ModalMusicResultStore = {
  modalMusicData: {
    musicData: MusicInfoType[]
  }
  modalMusicResult: (musicData: MusicInfoType[]) => void
}

const modalMusicState = {
  modalMusicData: {
    musicData: [],
  },
}

export const useModalMusicResultStore = create(
  persist<ModalMusicResultStore>(
    (set, _) => ({
      ...modalMusicState,
      modalMusicResult: (musicData: MusicInfoType[]) => {
        set({ modalMusicData: { musicData } })
      },
    }),
    {
      name: 'musicStore',
    },
  ),
)

type SearchedResultStore = {
  searchedData: {
    musicData: MusicInfoType[]
    communityData: CommunityType[]
  }
  searchResultData: (
    musicData: MusicInfoType[],
    communityData: CommunityType[],
  ) => void
}

const resultState = {
  searchedData: {
    musicData: [],
    communityData: [],
  },
}

export const useSearchedResultStore = create(
  persist<SearchedResultStore>(
    (set, _) => ({
      ...resultState,
      searchResultData: (
        musicData: MusicInfoType[],
        communityData: CommunityType[],
      ) => {
        set({ searchedData: { musicData, communityData } })
      },
    }),
    {
      name: 'searchedResultStore',
    },
  ),
)
