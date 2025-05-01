import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import type { CountryCode } from '@/constants/rssQueryParams'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PickedSongState {
  pickedSong: Song | null
  pickedSongDetail: SongDetailResult | null
  countryCode: CountryCode

  setPickedSong: (song: Song) => void
  setPickedSongDetail: (songDetail: SongDetailResult | null) => void
  setCountryCode: (code: CountryCode) => void
}

export const usePickedSongStore = create<PickedSongState>()(
  persist(
    (set) => ({
      pickedSong: null,
      pickedSongDetail: null,
      countryCode: 'kr',

      setPickedSong: (song) => set({ pickedSong: song }),
      setPickedSongDetail: (songDetail) => set({ pickedSongDetail: songDetail }),
      setCountryCode: (code) => set({ countryCode: code ?? 'kr' }),
    }),
    { name: 'audio-player' },
  ),
)
