'use client'

import type { Song } from '@/lib/songs'
import usePickSong from '@/hooks/usePickSong'
import usePickedSongDetail from '@/hooks/usePickedSongDetail'
import RandomSongSlogun from './RandomSongSlogun'
import RandomSongTrigger from './RandomSongTrigger'
import RandomSongCardSkeleton from './RandomSongCardSkeleton'
import RandomSongCard from './RandomSongCard'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

interface RandomSongPickerProps {
  songs: Song[]
}

export default function RandomSongPicker({ songs }: RandomSongPickerProps) {
  const { pickedSong, setPickedSong } = usePickedSongStore()
  const { pick } = usePickSong({ songs })
  const { pickedSongDetail } = usePickedSongDetail()

  const isSongsReady = Array.isArray(songs) && songs.length > 0

  const handlePickRandomSong = () => {
    const randomSong = pick()
    if (randomSong) {
      setPickedSong(randomSong)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <RandomSongSlogun />

      {pickedSong ? (
        <RandomSongCard pickedSong={pickedSong} pickedSongDetail={pickedSongDetail} />
      ) : (
        <RandomSongCardSkeleton />
      )}
      <RandomSongTrigger
        onPickRandomSong={handlePickRandomSong}
        isSongsReady={isSongsReady}
      />
    </div>
  )
}
