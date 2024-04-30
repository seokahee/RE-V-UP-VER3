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

type PaginationStore = {
  currentPageData: {
    currentPage: number
  }
  setCurrentPageData: (page: number) => void
}

const currentPageState = {
  currentPageData: {
    currentPage: 1,
  },
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  ...currentPageState,
  setCurrentPageData: (currentPage: number) => {
    set({ currentPageData: { currentPage } })
  },
}))
