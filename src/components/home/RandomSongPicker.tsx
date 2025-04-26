'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getRandomIndex } from '@/lib/random'
import RandomSongButton from './RandomSongButton'
import { getArtworkUrl, Song } from '@/lib/songs'
import { ChevronRightIcon, Loader2, Music2 } from 'lucide-react'
import { Button } from '../ui/button'

interface RandomSongPickerProps {
  songs: Song[]
}

export default function RandomSongPicker({ songs }: RandomSongPickerProps) {
  const [pickedSong, setPickedSong] = useState<Song | null>(null)

  const handlePickRandomSong = () => {
    const randomSongIndex = getRandomIndex(songs.length)
    const song = songs[randomSongIndex]
    setPickedSong(song)
  }

  const isSongsReady = songs.length > 0

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {isSongsReady ? (
        <RandomSongButton onClick={handlePickRandomSong} />
      ) : (
        <Button disabled>
          <Loader2 className="animate-spin" />
          잠시만 기다려주세요..
        </Button>
      )}
      {pickedSong ? (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src={getArtworkUrl(pickedSong.artworkUrl100)}
              width={300}
              height={300}
              alt={pickedSong.name}
              className="rounded-md transition-all duration-200 ease-in-out hover:scale-115"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-lg font-bold">{pickedSong.name}</span>
            <div className="flex font-semibold text-gray-600">
              <a href={pickedSong.artistUrl}>{pickedSong.artistName}</a>
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex h-[300px] w-[300px] items-center justify-center bg-gray-300">
              <Music2 size={100} className="text-white" />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-lg font-bold">우연처럼 만나는 한 곡</span>
              <span className="font-semibold text-gray-600">
                추천 받기를 눌러 새로운 곡을 만나보세요!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
