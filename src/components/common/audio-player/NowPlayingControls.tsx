import TrackInfo from './TrackInfo'
import PlaybackControls from './PlaybackControls'
import AlbumLink from './AlbumLink'

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
  isSkeletonVisible,
  isWatingForDetail,
  isReady,
  isPlaying,
  isMuted,
  onPlay,
  onPause,
  onToggleMute,
}: NowPlayingControlsProps) {
  return (
    <div className="items-centerjustify-between grid w-full grid-cols-3 gap-1 px-4 font-semibold text-gray-600">
      <TrackInfo
        isInitialPlayer={isInitialPlayer}
        isSkeletonVisible={isSkeletonVisible}
        isWatingForDetail={isWatingForDetail}
        isReady={isReady}
      />

      <PlaybackControls
        isInitialPlayer={isInitialPlayer}
        isWatingForDetail={isWatingForDetail}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlay={onPlay}
        onPause={onPause}
        onToggleMute={onToggleMute}
      />

      <AlbumLink
        isSkeletonVisible={isSkeletonVisible}
        isWatingForDetail={isWatingForDetail}
        isReady={isReady}
      />
    </div>
  )
}
