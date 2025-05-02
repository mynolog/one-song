import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { ChevronRightIcon, Heart } from 'lucide-react'
import LikeControl from '../common/LikeControl'
import { Button } from '../ui/button'
import RandomSongArtwork from './RandomSongArtwork'
import { formatDate } from '@/lib/format'

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

      <div className="flex w-full flex-col items-center justify-center gap-2">
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
              <Heart className="gray-400" />
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
        <div className="text-muted-foreground text-xs">
          {formatDate(pickedSong.releaseDate)}
        </div>
      </div>
    </div>
  )
}
