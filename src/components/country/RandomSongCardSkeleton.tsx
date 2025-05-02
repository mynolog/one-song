import { Heart, Music2 } from 'lucide-react'
import { Button } from '../ui/button'
import { formatDate } from '@/lib/format'

export default function RandomSongCardSkeleton() {
  return (
    <div className="flex w-[50vw] flex-col gap-4 sm:w-75">
      <div className="-z-50 flex aspect-square w-full max-w-75 items-center justify-center rounded-md bg-[#f1f3f4]">
        <Music2 size={100} className="text-white" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-center">
          <span className="flex w-full justify-center text-lg font-extrabold">
            우연처럼 만나는 한 곡
          </span>
          <Button variant="ghost" size="icon" disabled className="rounded-full">
            <Heart className="gray-400" />
          </Button>
        </div>
        <span className="text-xs font-semibold text-gray-600 sm:text-sm">
          추천 받기를 눌러 새로운 곡을 만나보세요!
        </span>
        <div className="text-muted-foreground text-xs">
          {formatDate(new Date())} 오늘의 노래
        </div>
      </div>
    </div>
  )
}
