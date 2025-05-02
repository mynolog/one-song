import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import ShuffleButton from './ShuffleButton'
import { Button } from '@/components/ui/button'

interface PlaybackControlsProps {
  isInitialPlayer: boolean
  isWatingForDetail: boolean
  isPlaying: boolean
  isMuted: boolean
  onPlay: () => void
  onPause: () => void
  onToggleMute: () => void
}

export default function PlaybackControls({
  isInitialPlayer,
  isWatingForDetail,
  isPlaying,
  isMuted,
  onPlay,
  onPause,
  onToggleMute,
}: PlaybackControlsProps) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 pl-1">
      <div className="flex h-full w-full items-center justify-center gap-3 pl-1">
        <ShuffleButton isLoading={isWatingForDetail} />
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
