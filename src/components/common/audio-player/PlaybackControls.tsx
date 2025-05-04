'use client'

import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

import AppleMusicIcon from '@/components/icons/AppleMusicIcon'
import { Button } from '@/components/ui/button'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

import ShuffleButton from './ShuffleButton'

interface PlaybackControlsProps {
  isInitialPlayer: boolean
  isWatingForDetail: boolean
  isPlaying: boolean
  isMuted: boolean
  isCountryPage: boolean
  onPlay: () => void
  onPause: () => void
  onToggleMute: () => void
}

export default function PlaybackControls({
  isInitialPlayer,
  isWatingForDetail,
  isPlaying,
  isMuted,
  isCountryPage,
  onPlay,
  onPause,
  onToggleMute,
}: PlaybackControlsProps) {
  const { pickedSong } = usePickedSongStore()

  return (
    <div className="flex h-full w-full items-center gap-2 pl-1 sm:justify-center">
      <div className="flex h-full w-full items-center justify-center gap-3 pl-1">
        {isCountryPage ? (
          <ShuffleButton isLoading={isWatingForDetail} />
        ) : (
          <Button size="icon" variant="ghost" className="h-11 w-11 rounded-full">
            <a
              href={pickedSong?.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Music에서 듣기"
            >
              <AppleMusicIcon variant="black" />
            </a>
          </Button>
        )}
        {!isPlaying ? (
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11 rounded-full hover:text-green-600"
            disabled={isInitialPlayer || isWatingForDetail}
            onClick={onPlay}
          >
            <Play className="!h-9 !w-9" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11 rounded-full hover:cursor-pointer hover:text-green-600"
            disabled={isInitialPlayer || isWatingForDetail}
            onClick={onPause}
          >
            <Pause className="!h-9 !w-9" />
          </Button>
        )}

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full hover:cursor-pointer hover:text-green-600"
          disabled={isInitialPlayer || isWatingForDetail}
          onClick={onToggleMute}
        >
          {isMuted ? (
            <VolumeX className="!h-6 !w-6" />
          ) : (
            <Volume2 className="!h-6 !w-6" />
          )}
        </Button>
      </div>
    </div>
  )
}
