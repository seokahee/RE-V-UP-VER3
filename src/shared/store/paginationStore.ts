import { create } from 'zustand'

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
