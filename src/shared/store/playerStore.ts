import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MusicStore = {
  musicData: {
    item: CurrentPlayListType[]
  }
  addMusic: (item: CurrentPlayListType) => void
}

const musicState = {
  musicData: {
    item: [],
  },
}

export const useMusicStore = create(
  persist<MusicStore>(
    (set, _) => ({
      ...musicState,
      addMusic: (item: CurrentPlayListType) => {
        set((state) => ({
          musicData: { item: [...state.musicData.item, item] },
        }))
      },
    }),
    {
      name: 'musicStore',
    },
  ),
)
