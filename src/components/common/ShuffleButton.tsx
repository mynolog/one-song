'use client'

import type { Song, SongsFeedResponse } from '@/lib/songs'
import { Loader2, Shuffle } from 'lucide-react'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import { getBaseUrl, getRandomIndex } from '@/lib/getter'
import { Button } from '../ui/button'

interface ShuffleButtonProps {
  isLoading: boolean
  className?: string
}

export default function ShuffleButton({ isLoading, className }: ShuffleButtonProps) {
  const { countryCode, pickedSongDetail, setPickedSong } = usePickedSongStore()
  const baseURL = getBaseUrl()

  const handleShuffle = async () => {
    const res = await fetch(`${baseURL}/api/songs?countryCode=${countryCode}`, {
      cache: 'no-store',
    })

    const json: SongsFeedResponse = await res.json()
    const songs: Song[] = json.results ?? []

    const randomIndex = getRandomIndex(songs.length)
    setPickedSong(songs[randomIndex])
  }
  const pickedSong = usePickedSongStore((state) => state.pickedSong)
  const isInitial = !pickedSong && !pickedSongDetail
  const isPending = !!pickedSong && !pickedSongDetail
  const isDisabled = isLoading || isPending

  return (
    <Button
      variant="ghost"
      className={`relative h-10 w-10 rounded-full hover:text-green-600 ${className}`}
      disabled={isDisabled && !isInitial}
      onClick={handleShuffle}
    >
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="!h-12 !w-12 animate-spin !text-green-600 !opacity-100" />
        </span>
      )}
      <Shuffle className="!h-6 !w-6" />
    </Button>
  )
}
