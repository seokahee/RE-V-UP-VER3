import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MusicSearchedKeywordStore = {
  musicSearchKeyword: {
    keyword: string
  }
  editValue: {
    boardTitle: string
    content: string
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
    boardTitle: '',
    content: '',
  },
}

export const useMusicSearchedStore = create(
  persist<MusicSearchedKeywordStore>(
    (set, get) => ({
      ...initialState,
      setMusicSearchKeyword: (keyword: string) =>
        set({ musicSearchKeyword: { keyword } }),
      setBoardContents: (boardTitle: string, content: string) =>
        set({ editValue: { boardTitle, content } }),
    }),
    {
      name: 'store',
    },
  ),
)
