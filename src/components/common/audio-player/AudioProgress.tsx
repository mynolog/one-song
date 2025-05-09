import type { MouseEvent } from 'react'

import { Progress } from '@/components/ui/progress'
import { formatTime } from '@/lib/format'

interface AudioProgressProps {
  displayTime: number
  duration: number
  isReady: boolean
  onSeek: (e: MouseEvent<HTMLDivElement>) => void
}

export default function AudioProgress({
  displayTime,
  duration,
  isReady,
  onSeek,
}: AudioProgressProps) {
  return (
    <div className="w-full px-4">
      <div onClick={onSeek} className="relative w-full py-1">
        <Progress
          value={duration > 0 ? (displayTime / duration) * 100 : 0}
          className={`${isReady ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}
        />
      </div>
      <div className="flex justify-between text-[0.7rem] font-semibold">
        <span className={`${isReady ? 'text-green-600' : 'text-muted-foreground'}`}>
          {formatTime(displayTime)}
        </span>
        <span className="text-muted-foreground">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
