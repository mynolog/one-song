'use client'

import type { LikedSong } from '@/stores/useGuestStore'

import { useGuestStore } from '@/stores/useGuestStore'

import LikedSongsTable from '../liked-songs/LikedSongsTable'

export default function GuestLikedSongs() {
  const { likedSongs, removeLike } = useGuestStore()

  const handleRemoveLike = (song: LikedSong) => {
    removeLike(song)
  }

  return <LikedSongsTable likedSongs={likedSongs} onRemoveLike={handleRemoveLike} />
}
