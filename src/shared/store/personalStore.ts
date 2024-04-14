import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 설정에 대한 타입 정의
type configType = {
  numberOfQuestion: number
  status: string
  userGender: string
  userMBTI: string
  userChar: { gender: string; mbti: string; uid: string }
  addNumberOfQuestion: (count: number) => void
  addStatus: (status: string) => void
  addGender: (gender: string) => void
  addUserChar: (userChar: { gender: string; mbti: string; uid: string }) => void
}

// 기본 설정
const defaultConfig: configType = {
  numberOfQuestion: 5,
  status: '',
  userGender: '',
  userMBTI: '',
  userChar: { gender: '', mbti: '', uid: '' },
  addNumberOfQuestion: (count: number) => {},
  addStatus: (status: string) => {},
  addGender: (gender: string) => {},
  addUserChar: (userChar: { gender: string; mbti: string; uid: string }) => {},
}

// Zustand 훅 생성 및 영속성 추가
export const useSurvey = create(
  persist<configType>(
    (set, get) => ({
      ...defaultConfig,
      // 질문 수 추가 함수
      addNumberOfQuestion: (count: number) =>
        set((state) => ({
          ...state,
          numberOfQuestion: count,
        })),
      // 상태 추가 함수
      addStatus: (status: string) =>
        set((state) => ({
          ...state,
          status: status,
        })),
      addGender: (gender: string) => set({ userGender: gender }),
      // 사용자 특성 추가 함수
      addUserChar: (userChar: { gender: string; mbti: string; uid: string }) =>
        set((state) => ({
          ...state,
          userChar: userChar, // 수정: userChar로 변경
        })),
    }),
    {
      name: 'store',
    },
  ),
)
