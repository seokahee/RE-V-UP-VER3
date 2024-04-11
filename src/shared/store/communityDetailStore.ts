import { MusicInfoType } from '@/types/communityDetail/detailTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MusicSearchedKeywordStore = {
  musicSearchKeyword: {
    keyword: string
  }
  editValue: {
    editBoardTitle: string
    editContent: string
  }
  item: Partial<MusicInfoType>
  setMusicSearchKeyword: (keyword: string) => void
  setBoardContents: (boardTitle: string, content: string) => void
  setChooseMusics: (item: Partial<MusicInfoType>) => void
}
// 크리에이트 함수의 반환값도 타입을 지정해줘야한다 지정하지 않을 경우, initialState의 타입으로 추론해버림 그래서 외부에서searched함수를 사용할 수 없음

const initialState = {
  musicSearchKeyword: {
    keyword: '',
  },
  editValue: {
    editBoardTitle: '',
    editContent: '',
  },
  item: {},
}

export const useMusicSearchedStore = create(
  persist<MusicSearchedKeywordStore>(
    (set, get) => ({
      ...initialState,
      setMusicSearchKeyword: (keyword: string) =>
        set({ musicSearchKeyword: { keyword } }),
      setBoardContents: (editBoardTitle: string, editContent: string) =>
        set({ editValue: { editBoardTitle, editContent } }),
      setChooseMusics: (item: Partial<MusicInfoType>) =>
        set({ item: { ...item } }),
    }),
    {
      name: 'CreateMusicStore',
    },
  ),
)
