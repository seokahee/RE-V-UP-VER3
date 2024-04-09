import { create } from "zustand";
import { persist } from "zustand/middleware";

// 설정에 대한 타입 정의
type configType = {
  numberOfQuestion: number;
  status: string;
  userChar: { gender: string; mbti: string };
  addNumberOfQuestion: (count: number) => void;
  addStatus: (status: string) => void;
  addUserChar: (userChar: { gender: string; mbti: string }) => void; // 수정: addUserChar의 타입 정의 수정
};

// 기본 설정
const defaultConfig: configType = {
  numberOfQuestion: 5,
  status: "",
  userChar: { gender: "", mbti: "" },
  addNumberOfQuestion: (count: number) => {}, // 추가
  addStatus: (status: string) => {}, // 추가
  addUserChar: (userChar: { gender: string; mbti: string }) => {}, // 추가
};

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
      // 사용자 특성 추가 함수
      addUserChar: (userChar: { gender: string; mbti: string }) =>
        set((state) => ({
          ...state,
          userChar: userChar, // 수정: userChar로 변경
        })),
    }),
    {
      name: "store",
    }
  )
);
