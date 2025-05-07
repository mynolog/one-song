import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthState {
  userId: string | null
  setUserId: (id: string) => void
  clearAuthStore: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,

      setUserId: (id) => set({ userId: id }),
      clearAuthStore: () => set({ userId: null }),
    }),
    { name: 'auth-store' },
  ),
)
