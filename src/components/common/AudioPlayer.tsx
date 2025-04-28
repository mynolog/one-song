'use client'
import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Square, ChevronRightIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { formatTime } from '@/lib/format'

interface AudioPlayerProps {
  src: string
  collectionName: string
  collectionViewUrl: string
}

export default function AudioPlayer({
  src = '',
  collectionName,
  collectionViewUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  })

  const handlePlay = () => {
    if (!audioRef.current) return
    try {
      audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('재생 실패', error)
    }
  }

  const handlePause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const handleReset = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickRatio = clickX / rect.width
    const newTime = clickRatio * duration

    audio.currentTime = newTime
  }

  if (!src) {
    return null
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      <audio ref={audioRef} src={src} className="hidden" />
      <div className="w-full px-4">
        <div onClick={handleSeek} className="relative w-full py-1">
          <Progress
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[0.7rem] font-semibold">
          <span>{formatTime(currentTime)}</span>
          <span className="text-muted-foreground">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-1 px-2 font-semibold text-gray-600">
        <div className="flex gap-1 pl-1">
          {!isPlaying ? (
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 rounded-full hover:cursor-pointer"
              onClick={handlePlay}
            >
              <Play />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 rounded-full hover:cursor-pointer"
              onClick={handlePause}
            >
              <Pause />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-full hover:cursor-pointer"
            onClick={handleReset}
          >
            <Square />
          </Button>
        </div>
        <div className="flex w-2/3 items-center justify-end overflow-hidden text-xs">
          <a
            href={collectionViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center truncate hover:text-green-600"
          >
            {collectionName}
            <ChevronRightIcon className="h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
