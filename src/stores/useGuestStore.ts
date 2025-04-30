import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LikedSong {
  id: string
  artistName: string
  name: string
  releaseDate: string
  artistUrl: string
  artworkUrl100: string
  url: string
  collectionName: string | null
  collectionViewUrl: string | null
  previewUrl: string | null
  primaryGenreName: string | null
}

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
