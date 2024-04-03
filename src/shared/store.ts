// store
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  count: number;
  inc: () => void;
};

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "store",
    }
  )
);
