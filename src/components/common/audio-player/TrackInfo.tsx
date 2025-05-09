'use client'

import { Music2 } from 'lucide-react'
import Image from 'next/image'

import { usePickedSongStore } from '@/stores/usePickedSongStore'

interface TrackInfoProps {
  isInitialPlayer: boolean
  isWatingForDetail: boolean
  isReady: boolean
}

export default function TrackInfo({
  isInitialPlayer,
  isWatingForDetail,
  isReady,
}: TrackInfoProps) {
  const { pickedSong } = usePickedSongStore()

  return (
    <div className="flex h-full w-full items-center gap-2 text-xs">
      {isInitialPlayer && (
        <>
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-gray-200">
            <Music2 className="!h-5 !w-5" />
          </div>
          <div className="flex h-full w-3/4 flex-col justify-center gap-2">
            재생 중이 아님
          </div>
        </>
      )}

      {(isReady || isWatingForDetail) && pickedSong && (
        <>
          <div className="h-8 w-8 rounded-sm bg-gray-400">
            <Image
              src={pickedSong.artworkUrl100}
              width={32}
              height={32}
              priority
              className="rounded-sm"
              alt={pickedSong.name}
            />
          </div>
          <div className="flex w-1/3 flex-col gap-1 overflow-hidden sm:w-3/4">
            <span className="truncate">{pickedSong.name}</span>
            <span className="truncate">{pickedSong.artistName}</span>
          </div>
        </>
      )}
    </div>
  )
}
