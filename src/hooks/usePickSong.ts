'use client'

import type { Song } from '@/lib/songs'
import { getRandomIndex } from '@/lib/getter'

interface UsePickSongProps {
  songs: Song[]
}

export default function usePickSong({ songs }: UsePickSongProps) {
  const pick = () => {
    const randomIndex = getRandomIndex(songs.length)
    return songs[randomIndex]
  }

  return { pick }
}
