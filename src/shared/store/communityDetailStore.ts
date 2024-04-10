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
  setMusicSearchKeyword: (keyword: string) => void
  setBoardContents: (boardTitle: string, content: string) => void
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
}

export const useMusicSearchedStore = create(
  persist<MusicSearchedKeywordStore>(
    (set, get) => ({
      ...initialState,
      setMusicSearchKeyword: (keyword: string) =>
        set({ musicSearchKeyword: { keyword } }),
      setBoardContents: (editBoardTitle: string, editContent: string) =>
        set({ editValue: { editBoardTitle, editContent } }),
    }),
    {
      name: 'store',
    },
  ),
)
