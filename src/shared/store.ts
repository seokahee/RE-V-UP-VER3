// store
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  userInfo: {
    uid: string;
  };
  count: number;
  inc: () => void;
};

const initialState = {
  userInfo: {
    uid: "",
  },
};

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      ...initialState,
      saveUserInfo: (uid: string) => set({ userInfo: { uid } }),
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "store",
    }
  )
);
