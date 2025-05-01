'use client'

import type { Song } from '@/lib/songs'
import usePickSong from '@/hooks/usePickSong'
import usePickedSongDetail from '@/hooks/usePickedSongDetail'
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
    <div className="mt-40 mb-10 flex h-full w-[50vw] flex-col items-center justify-center gap-4 sm:w-full">
      <RandomSongTrigger
        onPickRandomSong={handlePickRandomSong}
        isSongsReady={isSongsReady}
      />

      {pickedSong ? (
        <RandomSongCard pickedSong={pickedSong} pickedSongDetail={pickedSongDetail} />
      ) : (
        <RandomSongCardSkeleton />
      )}
    </div>
  )
}
