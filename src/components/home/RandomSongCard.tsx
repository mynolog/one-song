import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { ChevronRightIcon, Heart, Loader2, VolumeX } from 'lucide-react'
import LikeControl from '../common/LikeControl'
import { Button } from '../ui/button'
import RandomSongArtwork from './RandomSongArtwork'
import AudioPlayer from '../common/AudioPlayer'
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
    <div className="flex w-75 flex-col gap-4">
      <RandomSongArtwork pickedSong={pickedSong} />

      <div className="flex w-75 flex-col items-center justify-center gap-2">
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

        <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-md py-2 transition-all duration-200 ease-in-out hover:bg-[#f1f3f4]">
          {pickedSongDetail ? (
            <div className="flex w-full flex-col items-center justify-center">
              {pickedSongDetail.previewUrl ? (
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
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="animate-spin" />
              <span className="mt-2 text-sm font-semibold">미리듣기 준비 중..</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
