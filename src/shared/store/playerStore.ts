import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentMusicStore = {
  currentMusicData: {
    currentPlayList: CurrentPlayListType[]
    musicIndex: number
  }
  currentMusic: (
    currentPlayList: CurrentPlayListType[],
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
        currentPlayList: CurrentPlayListType[],
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

// type PlayMusicStore = {
//   playMusicData: {
//     currentPlaying: CurrentPlayListType | null
//   }
//   playMusic: (currentPlaying: CurrentPlayListType | null) => void
// }

// const playMusicState = {
//   playMusicData: {
//     currentPlaying: null,
//   },
// }

// export const usePlayMusicStore = create(
//   persist<PlayMusicStore>(
//     (set, _) => ({
//       ...playMusicState,
//       playMusic: (currentPlaying: CurrentPlayListType | null) => {
//         set({ playMusicData: { currentPlaying } })
//       },
//     }),
//     {
//       name: 'currentMusicStore',
//     },
//   ),
// )
