'use client'

import { memo } from 'react'

import { usePathname } from 'next/navigation'

import LikedSongListButton from './LikedSongListButton'
import PlaybackControls from './PlaybackControls'
import SongInfoButton from './SongInfoButton'
import TrackInfo from './TrackInfo'
import WithTooltip from '../WithTooltip'

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

function NowPlayingControls({
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
  const isLikedSongsPage =
    pathname.startsWith('/guest/liked-songs') || pathname.startsWith('/me/liked-songs')

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
        isLikedSongsPage={isLikedSongsPage}
        onPlay={onPlay}
        onPause={onPause}
        onToggleMute={onToggleMute}
      />

      <div className="flex w-full items-center justify-end">
        {isLikedSongsPage ? (
          <WithTooltip content="오늘의 추천 노래">
            <SongInfoButton />
          </WithTooltip>
        ) : (
          <WithTooltip content="내가 찜한 노래">
            <LikedSongListButton />
          </WithTooltip>
        )}
      </div>
    </div>
  )
}

export default memo(NowPlayingControls)
