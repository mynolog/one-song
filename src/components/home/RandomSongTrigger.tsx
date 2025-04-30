import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { Loader2 } from 'lucide-react'
import RandomSongButton from './RandomSongButton'
import { Button } from '../ui/button'

interface RandomSongTriggerProps {
  onPickRandomSong: () => void
  isSongsReady: boolean
  pickedSong: Song | null
  pickedSongDetail: SongDetailResult | null
}

export default function RandomSongTrigger({
  onPickRandomSong,
  isSongsReady,
  pickedSong,
  pickedSongDetail,
}: RandomSongTriggerProps) {
  return (
    <div className="flex h-12 w-full items-center justify-center">
      {isSongsReady ? (
        <div className={`transition-opacity duration-200 ease-in-out`}>
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
