import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import { ChevronRightIcon, Heart } from 'lucide-react'

import RandomSongArtwork from './RandomSongArtwork'
import ListenOnAppleMusicBadge from '../common/audio-player/ListenOnAppleMusicBadge'
import LikeControl from '../common/LikeControl'
import { Button } from '../ui/button'

interface RandonSongCardProps {
  pickedSong: Song
  pickedSongDetail: SongDetailResult | null
}

export default function RandomSongCard({
  pickedSong,
  pickedSongDetail,
}: RandonSongCardProps) {
  return (
    <div className="flex w-[50vw] flex-col gap-4 sm:w-75">
      <RandomSongArtwork pickedSong={pickedSong} />

      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-center">
          <span className="w-full truncate overflow-hidden text-center text-lg font-extrabold">
            {pickedSong.name}
          </span>
          {pickedSong && pickedSongDetail ? (
            <LikeControl pickedSong={pickedSong} pickedSongDetail={pickedSongDetail} />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              disabled={!pickedSong || !pickedSongDetail}
              className="rounded-full"
            >
              <Heart className="gray-400 !h-6 !w-6" />
            </Button>
          )}
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
        <div className="flex w-full items-center justify-center pt-2">
          <a
            href={pickedSong.url ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center hover:text-green-600"
          >
            <ListenOnAppleMusicBadge />
          </a>
        </div>
      </div>
    </div>
  )
}
