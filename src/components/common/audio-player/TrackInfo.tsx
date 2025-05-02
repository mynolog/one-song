'use client'

import Image from 'next/image'
import { Music2 } from 'lucide-react'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

interface TrackInfoProps {
  isInitialPlayer: boolean
  isSkeletonVisible: boolean
  isWatingForDetail: boolean
  isReady: boolean
}

export default function TrackInfo({
  isInitialPlayer,
  isSkeletonVisible,
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
      {isSkeletonVisible && (
        <>
          <div className="flex h-full w-full items-center gap-2 text-xs">
            <div className="h-9 w-9 animate-pulse rounded-sm bg-gray-300"></div>
            <div className="flex h-full w-3/4 flex-col justify-center gap-2">
              <div className="h-3 w-2/3 max-w-30 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-2/3 max-w-30 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </>
      )}
      {(isReady || isWatingForDetail) && pickedSong && (
        <>
          <div className="h-9 w-9 rounded-sm bg-gray-400">
            <Image
              src={pickedSong.artworkUrl100}
              width={36}
              height={36}
              className="rounded-sm"
              alt={pickedSong.name}
            />
          </div>
          <div className="flex w-3/4 flex-col gap-1 overflow-hidden">
            <span className="truncate">{pickedSong.name}</span>
            <span className="truncate">{pickedSong.artistName}</span>
          </div>
        </>
      )}
    </div>
  )
}
