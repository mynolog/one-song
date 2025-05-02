import RandomSongButton from './RandomSongButton'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

interface RandomSongTriggerProps {
  onPickRandomSong: () => void
  isSongsReady: boolean
}

export default function RandomSongTrigger({
  onPickRandomSong,
  isSongsReady,
}: RandomSongTriggerProps) {
  const { pickedSong, pickedSongDetail } = usePickedSongStore()

  const isWatingForDetail =
    !!pickedSong && (!pickedSongDetail || pickedSong.id !== pickedSongDetail.id)

  return (
    <div className="flex h-12 w-full max-w-75 items-center justify-center">
      <div className={`w-full transition-opacity duration-200 ease-in-out`}>
        <RandomSongButton
          isSongReady={isSongsReady}
          isLoading={isWatingForDetail}
          onClick={onPickRandomSong}
        />
      </div>
    </div>
  )
}
