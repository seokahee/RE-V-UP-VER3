import { CurrentPlaylistType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CurrentMusicStore = {
  currentMusicData: {
    currentItems: CurrentPlaylistType[]
  }
  currentMusic: (music: CurrentPlaylistType[]) => void
}

const currentMusicState = {
  currentMusicData: {
    currentItems: [],
  },
}

export const useCurrentMusicStore = create(
  persist<CurrentMusicStore>(
    (set, _) => ({
      ...currentMusicState,
      currentMusic: (currentItems: CurrentPlaylistType[]) => {
        set({ currentMusicData: { currentItems } })
      },
    }),
    {
      name: 'currentMusicStore',
    },
  ),
)
