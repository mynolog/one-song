import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LikedSong = Song & Omit<SongDetailResult, 'id'>

interface GuestStore {
  likedSongs: LikedSong[]
  addLike: (song: LikedSong) => void
  removeLike: (song: LikedSong) => void
  isLiked: (song: LikedSong) => boolean
}

export const useGuestStore = create<GuestStore>()(
  persist(
    (set, get) => ({
      likedSongs: [],
      addLike: (targetSong: LikedSong) => {
        const current = get().likedSongs
        if (current.length >= 10) {
          toast('체험 모드에서는 최대 10곡까지 찜할 수 있어요.')
          return
        }
        if (!current.find((song) => song.id === targetSong.id)) {
          set({ likedSongs: [...current, targetSong] })
        }
      },
      removeLike: (targetSong: LikedSong) => {
        set({
          likedSongs: get().likedSongs.filter((song) => song.id !== targetSong.id),
        })
      },
      isLiked: (targetSong: LikedSong) => {
        return get().likedSongs.some((song) => song.id === targetSong.id)
      },
    }),
    { name: 'guest-store' },
  ),
)
