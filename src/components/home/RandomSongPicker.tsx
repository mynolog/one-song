'use client'

import type { Song } from '@/lib/songs'
import type { SongDetail } from '@/lib/song'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getRandomIndex } from '@/lib/random'
import RandomSongButton from './RandomSongButton'
import { getArtworkUrl } from '@/lib/songs'
import { ChevronRightIcon, Loader2, Music2, Music3 } from 'lucide-react'
import { Button } from '../ui/button'

interface RandomSongPickerProps {
  songs: Song[]
}

export default function RandomSongPicker({ songs }: RandomSongPickerProps) {
  const [pickedSong, setPickedSong] = useState<Song | null>(null)
  const [pickedSongDetail, setPickedSongDetail] = useState<SongDetail | null>(null)

  useEffect(() => {
    setPickedSongDetail(null)
  }, [pickedSong])

  useEffect(() => {
    if (!pickedSong) return
    const loadSongDetail = async () => {
      const query = new URLSearchParams({
        artistName: pickedSong.artistName,
        title: pickedSong.name,
      })

      try {
        const detail = await fetch(`http://localhost:3000/api/song/detail?${query}`)
        const data: SongDetail = await detail.json()
        setPickedSongDetail(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadSongDetail()
  }, [pickedSong])

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
        <div className="flex w-75 flex-col gap-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src={getArtworkUrl(pickedSong.artworkUrl100)}
              width={300}
              height={300}
              alt={pickedSong.name}
              className="rounded-md transition-all duration-200 ease-in-out hover:scale-115"
            />
          </div>
          <div className="flex w-75 flex-col items-center justify-center gap-2">
            <span className="w-full truncate overflow-hidden text-center text-lg font-bold">
              {pickedSong.name}
            </span>
            <div className="flex w-full min-w-0 items-center justify-center font-semibold text-gray-600">
              <a
                href={pickedSong.artistUrl}
                className="max-w-full truncate"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pickedSong.artistName}
              </a>
              <ChevronRightIcon className="flex-shrink-0" />
            </div>
            <div className="relative flex h-[54px] w-full items-center justify-center overflow-hidden rounded-full bg-[#f1f3f4]">
              <div
                className={`absolute flex h-full w-full items-center justify-center gap-2 text-gray-500 transition-opacity duration-200 ${
                  pickedSongDetail ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Loader2 className="animate-spin" />
                <span className="text-sm font-semibold">미리듣기 준비 중..</span>
              </div>

              <audio
                src={pickedSongDetail?.previewUrl}
                controls
                autoPlay={false}
                loop={false}
                className={`absolute h-full w-full transition-opacity duration-200 ${
                  pickedSongDetail ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex h-[300px] w-[300px] items-center justify-center rounded-md bg-[#f1f3f4]">
              <Music2 size={100} className="text-white" />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-lg font-bold">우연처럼 만나는 한 곡</span>
              <span className="font-semibold text-gray-600">
                추천 받기를 눌러 새로운 곡을 만나보세요!
              </span>
              <div className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#f1f3f4] text-gray-500">
                <Music3 />
                <span className="text-sm">좋은 음악이 기다리고 있어요.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
