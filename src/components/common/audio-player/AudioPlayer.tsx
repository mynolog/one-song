'use client'

import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import AudioProgress from './AudioProgress'
import NowPlayingControls from './NowPlayingControls'

export default function AudioPlayer() {
  const { pickedSong, pickedSongDetail } = usePickedSongStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    setIsPlaying(false)
    setIsMuted(false)
    setCurrentTime(0)
  }, [pickedSong?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleLoadedMetadata = () => setDuration(audio.duration)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [pickedSongDetail])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])
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

  const isInitialPlayer = !pickedSong && !pickedSongDetail
  const isSkeletonVisible = !!pickedSong && !pickedSongDetail
  const isWatingForDetail =
    !!pickedSong && (!pickedSongDetail || pickedSong.id !== pickedSongDetail.id)
  const isReady =
    !!pickedSong && !!pickedSongDetail && pickedSong.id === pickedSongDetail.id

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white">
      {isReady && (
        <audio
          ref={audioRef}
          src={pickedSongDetail.previewUrl ?? undefined}
          className="hidden"
        />
      )}

      <AudioProgress
        currentTime={currentTime}
        duration={duration}
        isReady={isReady}
        onSeek={handleSeek}
      />

      <NowPlayingControls
        isInitialPlayer={isInitialPlayer}
        isSkeletonVisible={isSkeletonVisible}
        isWatingForDetail={isWatingForDetail}
        isReady={isReady}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlay={handlePlay}
        onPause={handlePause}
        onToggleMute={handleToggleMute}
      />
    </div>
  )
}
