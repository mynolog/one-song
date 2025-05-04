import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RecommendedSong = Song & Omit<SongDetailResult, 'id'>

interface RecommendedHistoryState {
  history: RecommendedSong[]
  addHistory: (targetSong: RecommendedSong) => void
  clearHistory: () => void
}

export const useRecommendedHistoryStore = create<RecommendedHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addHistory: (targetSong) => {
        const current = get().history
        const filtered = current.filter((song) => song.id !== targetSong.id)
        set({ history: [targetSong, ...filtered].slice(0, 10) })
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'recommended-history',
    },
  ),
)
