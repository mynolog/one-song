'use client'

import type { LikedSong } from '@/stores/useGuestStore'

import { toast } from 'sonner'

import { useGuestStore } from '@/stores/useGuestStore'

import LikedSongsTable from '../liked-songs/LikedSongsTable'

export default function GuestLikedSongs() {
  const { likedSongs, removeLike } = useGuestStore()

  const handleRemoveLike = (song: LikedSong) => {
    try {
      removeLike(song)
      toast.success('1곡이 삭제되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('삭제 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return <LikedSongsTable likedSongs={likedSongs} onRemoveLike={handleRemoveLike} />
}
