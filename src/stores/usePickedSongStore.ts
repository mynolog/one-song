import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PickedSongState {
  pickedSong: Song | null
  pickedSongDetail: SongDetailResult | null
  hydrated: boolean

  setPickedSong: (song: Song) => void
  setPickedSongDetail: (songDetail: SongDetailResult | null) => void
  setHydrated: () => void
}

export const usePickedSongStore = create<PickedSongState>()(
  persist(
    (set) => ({
      pickedSong: null,
      pickedSongDetail: null,
      hydrated: false,

      setPickedSong: (song) => set({ pickedSong: song }),
      setPickedSongDetail: (songDetail) => set({ pickedSongDetail: songDetail }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'audio-player',
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated?.()
        }
      },
    },
  ),
)
