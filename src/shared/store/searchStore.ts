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

// type SearchedResultStore = {
//   searchedResultData: {
//     musicData: MusicInfoType[]
//     communityData: CommunityType[]
//   }
//   searchedResult: (
//     musicData: MusicInfoType[],
//     communityData: CommunityType[],
//   ) => void
// }

type ModalMusicResultStore = {
  modalMusicData: {
    musicData: MusicInfoType[]
  }
  modalMusicResult: (musicData: MusicInfoType[]) => void
}

const keywordState = {
  searchedKeyword: {
    keyword: '',
    selectedTabs: 'musicInfo',
  },
}

// const resultState = {
//   searchedResultData: {
//     musicData: [],
//     communityData: [],
//   },
// }

const modalMusicState = {
  modalMusicData: {
    musicData: [],
  },
}

export const useSearchedKeywordStore = create<SearchedKeywordStore>((set) => ({
  ...keywordState,
  searched: (keyword: string, selectedTabs: string) =>
    set({ searchedKeyword: { keyword, selectedTabs } }),
}))

// export const useSearchedResultStore = create<SearchedResultStore>((set) => ({
//   ...resultState,
//   searchedResult: (
//     musicData: MusicInfoType[],
//     communityData: CommunityType[],
//   ) => {
//     set({ searchedResultData: { musicData, communityData } })
//   },
// }))

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
