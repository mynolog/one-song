'use client'

import { ChevronRightIcon } from 'lucide-react'

import { usePickedSongStore } from '@/stores/usePickedSongStore'

interface AlbumLinkProps {
  isSkeletonVisible: boolean
  isWatingForDetail: boolean
  isReady: boolean
}

export default function AlbumLink({
  isSkeletonVisible,
  isWatingForDetail,
  isReady,
}: AlbumLinkProps) {
  const { pickedSong, pickedSongDetail } = usePickedSongStore()
  return (
    <div className="flex h-full w-full items-center justify-end overflow-hidden text-xs">
      {isSkeletonVisible ? (
        <div className="h-3 w-4/5 max-w-40 animate-pulse rounded bg-gray-200" />
      ) : (
        (isReady || isWatingForDetail) &&
        pickedSong && (
          <a
            href={pickedSongDetail?.collectionViewUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-end hover:text-green-600"
          >
            <span className="truncate">{pickedSongDetail?.collectionName ?? ''}</span>
            <ChevronRightIcon className="h-4 flex-shrink-0" />
          </a>
        )
      )}
    </div>
  )
}
