'use client'

import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Square, ChevronRightIcon, Volume2, VolumeX } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { formatTime } from '@/lib/format'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import Image from 'next/image'

export default function AudioPlayer() {
  const { pickedSong, pickedSongDetail } = usePickedSongStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
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
  // 부드러운 Progress Bar 갱신
  useEffect(() => {
    let animationFrameId: number
    const update = () => {
      const audio = audioRef.current
      if (audio) {
        setCurrentTime(audio.currentTime)
      }
      animationFrameId = requestAnimationFrame(update)
    }
    animationFrameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

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

  const handleToggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  if (!pickedSongDetail?.previewUrl) {
    return null
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white">
      {pickedSongDetail && (
        <audio ref={audioRef} src={pickedSongDetail.previewUrl} className="hidden" />
      )}
      <div className="w-full px-4">
        <div onClick={handleSeek} className="relative w-full py-1">
          <Progress
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[0.7rem] font-semibold">
          <span className="text-green-600">{formatTime(currentTime)}</span>
          <span className="text-muted-foreground">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="items-centerjustify-between grid w-full grid-cols-3 gap-1 px-4 font-semibold text-gray-600">
        {pickedSong && pickedSongDetail ? (
          <div className="flex h-full w-full items-center gap-2 text-xs">
            <div className="h-9 w-9 rounded-sm bg-gray-400">
              <Image
                src={pickedSong.artworkUrl100}
                width={36}
                height={36}
                className="rounded-sm"
                alt={pickedSong.name}
              />
            </div>
            <div className="flex w-3/4 flex-col gap-1 overflow-hidden">
              <span className="truncate">{pickedSong.name}</span>
              <span className="truncate">{pickedSong.artistName}</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex h-full w-full items-center justify-center gap-5 pl-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full hover:cursor-pointer hover:text-green-600"
            onClick={handleReset}
          >
            <Square className="!h-6 !w-6" />
          </Button>

          {!isPlaying ? (
            <Button
              size="icon"
              variant="ghost"
              className="h-11 w-11 rounded-full hover:cursor-pointer hover:text-green-600"
              onClick={handlePlay}
            >
              <Play className="!h-9 !w-9" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-11 w-11 rounded-full hover:cursor-pointer hover:text-green-600"
              onClick={handlePause}
            >
              <Pause className="!h-9 !w-9" />
            </Button>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full hover:cursor-pointer hover:text-green-600"
            onClick={handleToggleMute}
          >
            {isMuted ? (
              <VolumeX className="!h-6 !w-6" />
            ) : (
              <Volume2 className="!h-6 !w-6" />
            )}
          </Button>
        </div>

        {pickedSongDetail.collectionName && pickedSongDetail.collectionViewUrl && (
          <div className="flex h-full w-full items-center overflow-hidden text-xs">
            <a
              href={pickedSongDetail.collectionViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-end hover:text-green-600"
            >
              <span className="truncate">{pickedSongDetail.collectionName}</span>
              <ChevronRightIcon className="h-4 flex-shrink-0" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
