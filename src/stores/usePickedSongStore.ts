import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PickedSongState {
  pickedSong: Song | null
  pickedSongDetail: SongDetailResult | null

  setPickedSong: (song: Song) => void
  setPickedSongDetail: (songDetail: SongDetailResult | null) => void
}

export const usePickedSongStore = create<PickedSongState>()(
  persist(
    (set) => ({
      pickedSong: null,
      pickedSongDetail: null,

      setPickedSong: (song) => set({ pickedSong: song }),
      setPickedSongDetail: (songDetail) => set({ pickedSongDetail: songDetail }),
    }),
    { name: 'audio-player' },
  ),
)
