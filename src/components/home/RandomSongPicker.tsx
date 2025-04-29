'use client'

import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getRandomIndex } from '@/lib/random'
import RandomSongButton from './RandomSongButton'
import { getArtworkUrl } from '@/lib/songs'
import {
  ChevronRightIcon,
  Heart,
  Loader2,
  Music,
  Music2,
  Music3,
  VolumeX,
} from 'lucide-react'
import { Button } from '../ui/button'
import { formatDate } from '@/lib/format'
import AudioPlayer from '../common/AudioPlayer'
import { getBaseUrl } from '@/lib/getter'

interface RandomSongPickerProps {
  songs: Song[]
}

export default function RandomSongPicker({ songs }: RandomSongPickerProps) {
  const [pickedSong, setPickedSong] = useState<Song | null>(null)
  const [pickedSongDetail, setPickedSongDetail] = useState<SongDetailResult | null>(null)

  useEffect(() => {
    setPickedSongDetail(null)
  }, [pickedSong])

  useEffect(() => {
    if (!pickedSong) return
    const baseUrl = getBaseUrl()
    const loadSongDetail = async () => {
      const query = new URLSearchParams({
        artistName: pickedSong.artistName,
        title: pickedSong.name,
      })

      try {
        const detail = await fetch(`${baseUrl}/api/song/detail?${query}`)
        const data: SongDetailResult = await detail.json()
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
      <div className="flex h-10 w-full items-center justify-center gap-2 text-lg font-bold text-gray-800">
        <Music />
        <span>한 곡의 음악이 하루를 바꿀지도 몰라요.</span>
      </div>
      <div className="relative flex h-12 w-full items-center justify-center">
        <div
          className={`absolute transition-opacity duration-200 ease-in-out ${
            !pickedSong || pickedSongDetail
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <RandomSongButton onClick={handlePickRandomSong} />
        </div>

        <div
          className={`absolute transition-opacity duration-200 ease-in-out ${
            !pickedSong || pickedSongDetail
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }`}
        >
          <Button disabled className="h-12 w-75 hover:cursor-not-allowed">
            <Loader2 className="animate-spin" />
            좋은 노래를 고르는 중..
          </Button>
        </div>

        {!isSongsReady && (
          <div className="absolute opacity-100 transition-opacity duration-200 ease-in-out">
            <Button disabled className="h-12 w-75">
              <Loader2 className="animate-spin" />
              잠시만 기다려주세요..
            </Button>
          </div>
        )}
      </div>
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
            <div className="flex w-full items-center justify-center">
              <span className="w-full truncate overflow-hidden text-center text-lg font-extrabold">
                {pickedSong.name}
              </span>
              {/* TODO: 즐겨찾기 기능 구현하기 */}
              <Heart />
            </div>
            <div className="flex w-full items-center justify-center overflow-hidden text-sm font-semibold text-gray-600 hover:text-green-600">
              <a
                href={pickedSong.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center"
              >
                <span className="truncate">{pickedSong.artistName}</span>
                <ChevronRightIcon className="h-4 flex-shrink-0" />
              </a>
            </div>
            <div className="text-muted-foreground text-xs">
              {formatDate(pickedSong.releaseDate)}
            </div>

            <div className="relative flex h-22 w-full items-center justify-center overflow-hidden rounded-md bg-[#f1f3f4] py-2">
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200 ${
                  pickedSongDetail ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <Loader2 className="animate-spin" />
                <span className="mt-2 text-sm font-semibold">미리듣기 준비 중..</span>
              </div>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  pickedSongDetail ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {pickedSongDetail ? (
                  pickedSongDetail.previewUrl ? (
                    <AudioPlayer
                      src={pickedSongDetail.previewUrl}
                      collectionName={pickedSongDetail.collectionName}
                      collectionViewUrl={pickedSongDetail.collectionViewUrl}
                    />
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2">
                      <VolumeX className="text-muted-foreground h-6" />
                      <span className="text-muted-foreground text-sm font-semibold">
                        이 곡은 미리 듣기를 지원하지 않습니다.
                      </span>
                    </div>
                  )
                ) : null}
              </div>
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
              <span className="text-lg font-extrabold">우연처럼 만나는 한 곡</span>
              <span className="text-sm font-semibold text-gray-600">
                추천 받기를 눌러 새로운 곡을 만나보세요!
              </span>
              <div className="text-muted-foreground text-xs">
                {formatDate(new Date())} 오늘의 노래
              </div>
              <div className="relative flex h-22 w-full items-center justify-center overflow-hidden rounded-md bg-[#f1f3f4] py-2">
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
