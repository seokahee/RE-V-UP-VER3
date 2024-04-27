import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type customListMusicStore = {
  customListData: {
    customPlayList: CurrentPlayListType[]
  }

  customListMusic: (customPlayList: CurrentPlayListType[]) => void
}

const customListMusicState = {
  customListData: {
    customPlayList: [],
  },
}

export const useCustomListMusicStore = create(
  persist<customListMusicStore>(
    (set, _) => ({
      ...customListMusicState,
      customListMusic: (customPlayList: CurrentPlayListType[]) => {
        set({ customListData: { customPlayList } })
      },
    }),
    {
      name: 'customListMusicStore',
    },
  ),
)
