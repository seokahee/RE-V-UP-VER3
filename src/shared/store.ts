import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  userInfo: {
    uid: string
  }
  userType?: number
  setUserInfo: (uid: string) => void
  setUserType: (userType: number) => void
}

const initialState = {
  userInfo: {
    uid: '',
  },
  userType: 0,
}

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      ...initialState,
      setUserInfo: (uid: string) => set({ userInfo: { uid } }),
      setUserType: (userType: number) => set({ userType }),
    }),
    {
      name: 'store',
    },
  ),
)
