'use client'

import type { Song, SongsFeedResponse } from '@/lib/songs'
import { Shuffle } from 'lucide-react'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import { getBaseUrl, getRandomIndex } from '@/lib/getter'
import { Button } from '../ui/button'

export default function ShuffleButton() {
  const { countryCode, setPickedSong } = usePickedSongStore()
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

  return (
    <Button
      variant="ghost"
      className="h-10 w-10 rounded-full hover:cursor-pointer hover:text-green-600"
      onClick={handleShuffle}
    >
      <Shuffle className="!h-6 !w-6" />
    </Button>
  )
}
