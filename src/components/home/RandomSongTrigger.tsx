import { Loader2 } from 'lucide-react'
import RandomSongButton from './RandomSongButton'
import { Button } from '../ui/button'
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
  return (
    <div className="flex h-12 w-full max-w-75 items-center justify-center">
      {isSongsReady ? (
        <div className={`w-full transition-opacity duration-200 ease-in-out`}>
          {!pickedSong || pickedSongDetail ? (
            <RandomSongButton onClick={onPickRandomSong} />
          ) : (
            <Button disabled className="h-12 w-75 hover:cursor-not-allowed">
              <Loader2 className="animate-spin" />
              좋은 노래를 고르는 중..
            </Button>
          )}
        </div>
      ) : (
        <Button disabled className="h-12 w-75">
          <Loader2 className="animate-spin" />
          잠시만 기다려주세요..
        </Button>
      )}
    </div>
  )
}
