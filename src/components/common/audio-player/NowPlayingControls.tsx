'use client'

import { usePathname } from 'next/navigation'

import LikedSongListToggleButton from './LikedSongListButton'
import PlaybackControls from './PlaybackControls'
import SongInfoButton from './SongInfoButton'
import TrackInfo from './TrackInfo'

interface NowPlayingControlsProps {
  isInitialPlayer: boolean
  isSkeletonVisible: boolean
  isWatingForDetail: boolean
  isReady: boolean
  isPlaying: boolean
  isMuted: boolean
  onPlay: () => void
  onPause: () => void
  onToggleMute: () => void
}

export default function NowPlayingControls({
  isInitialPlayer,
  isWatingForDetail,
  isReady,
  isPlaying,
  isMuted,
  onPlay,
  onPause,
  onToggleMute,
}: NowPlayingControlsProps) {
  const pathname = usePathname()
  const isCountryPage = pathname.startsWith('/country')

  return (
    <div className="items-centerjustify-between grid w-full grid-cols-3 gap-1 px-4 font-semibold text-gray-600">
      <TrackInfo
        isInitialPlayer={isInitialPlayer}
        isWatingForDetail={isWatingForDetail}
        isReady={isReady}
      />

      <PlaybackControls
        isInitialPlayer={isInitialPlayer}
        isWatingForDetail={isWatingForDetail}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isCountryPage={isCountryPage}
        onPlay={onPlay}
        onPause={onPause}
        onToggleMute={onToggleMute}
      />

      <div className="flex w-full items-center justify-end">
        {isCountryPage ? <LikedSongListToggleButton /> : <SongInfoButton />}
      </div>
    </div>
  )
}
