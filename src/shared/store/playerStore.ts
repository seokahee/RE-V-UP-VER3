import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CurrentMusicStore = {
  currentMusicData: {
    currentPlayList: CurrentPlayListType[]
  }
  customList: {
    data: CurrentPlayListType[]
  }
  currentMusic: (currentPlayList: CurrentPlayListType[]) => void
  setCustomList: (customList: CurrentPlayListType[]) => void
}

const currentMusicState = {
  currentMusicData: {
    currentPlayList: [],
  },
  customList: {
    data: [],
  },
}

export const useCurrentMusicStore = create(
  persist<CurrentMusicStore>(
    (set, _) => ({
      ...currentMusicState,
      currentMusic: (currentPlayList: CurrentPlayListType[]) => {
        set({ currentMusicData: { currentPlayList } })
      },
      setCustomList: (data: CurrentPlayListType[]) => {
        set({ customList: { data } })
      },
    }),
    {
      name: 'currentMusicStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
