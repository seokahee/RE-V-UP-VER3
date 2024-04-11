import { CurrentPlaylistType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentMusicStore = {
  currentMusicData: {
    currentPlayList: CurrentPlaylistType[]
    musicIndex: number
  }
  currentMusic: (
    currentPlayList: CurrentPlaylistType[],
    musicIndex: number,
  ) => void
}

const currentMusicState = {
  currentMusicData: {
    currentPlayList: [],
    musicIndex: 0,
  },
}

export const useCurrentMusicStore = create(
  persist<CurrentMusicStore>(
    (set, _) => ({
      ...currentMusicState,
      currentMusic: (
        currentPlayList: CurrentPlaylistType[],
        musicIndex: number,
      ) => {
        set({ currentMusicData: { currentPlayList, musicIndex } })
      },
    }),
    {
      name: 'currentMusicStore',
    },
  ),
)

// type CurrentMusicPageStore = {
//   currentMusicPageData: {
//     musicIndex: number
//     currentPage: number
//   }
//   currentPageData: (musicIndex: number, currentPage: number) => void
// }

// const currentMusicPageState = {
//   currentMusicPageData: {
//     musicIndex: 0,
//     currentPage: 1,
//   },
// }

// export const useCurrentMusicPageStore = create(
//   persist<CurrentMusicPageStore>(
//     (set, _) => ({
//       ...currentMusicPageState,
//       currentPageData: (musicIndex: number, currentPage: number) => {
//         set({ currentMusicPageData: { musicIndex, currentPage } })
//       },
//     }),
//     {
//       name: 'currentMusicPageStore',
//     },
//   ),
// )
