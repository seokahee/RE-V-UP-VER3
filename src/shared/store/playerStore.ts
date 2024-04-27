import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentMusicStore = {
  currentMusicData: {
    currentPlayList: CurrentPlayListType[]
  }

  currentMusic: (currentPlayList: CurrentPlayListType[]) => void
}

const currentMusicState = {
  currentMusicData: {
    currentPlayList: [],
  },
}

export const useCurrentMusicStore = create(
  persist<CurrentMusicStore>(
    (set, _) => ({
      ...currentMusicState,
      currentMusic: (currentPlayList: CurrentPlayListType[]) => {
        set({ currentMusicData: { currentPlayList } })
      },
    }),
    {
      name: 'currentMusicStore',
    },
  ),
)
