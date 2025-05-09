'use client'

import type { MouseEvent } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'

import { usePickedSongStore } from '@/stores/usePickedSongStore'

import AudioProgress from './AudioProgress'
import NowPlayingControls from './NowPlayingControls'

export default function AudioPlayer() {
  const { pickedSong, pickedSongDetail } = usePickedSongStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [displayTime, setDisplayTime] = useState(0)
  const currentTime = useRef(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!pickedSong) return
    setIsPlaying(false)
    setIsMuted(false)
    setDisplayTime(0)
    currentTime.current = 0
  }, [pickedSong?.id, pickedSong])

  useEffect(() => {
    if (!pickedSongDetail?.id) return
    const audio = audioRef.current
    if (!audio) return
    const handleLoadedMetadata = () => setDuration(audio.duration)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }, [pickedSongDetail?.id])
  // 부드러운 Progress 상태 업데이트
  useEffect(() => {
    // TODO: 성능 최적화 필요
    let animationId: number
    let lastUpdateTime = 0

    const update = () => {
      const audio = audioRef.current
      if (audio && !audio.paused) {
        const now = audio.currentTime
        currentTime.current = now
        if (Math.abs(now - lastUpdateTime) > 0.1) {
          lastUpdateTime = now
          setDisplayTime(now)
        }
      }
      animationId = requestAnimationFrame(update)
    }

    animationId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const handlePlay = useCallback(() => {
    if (!audioRef.current) return
    try {
      audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('재생 실패', error)
    }
  }, [])

  const handlePause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const handleSeek = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current
      if (!audio || duration === 0) return
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickRatio = clickX / rect.width
      const newTime = clickRatio * duration
      audio.currentTime = newTime
      if (audio.paused) {
        setDisplayTime(newTime)
      }
    },
    [duration],
  )

  const handleToggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  const isInitialPlayer = !pickedSong && !pickedSongDetail
  const isSkeletonVisible = !!pickedSong && !pickedSongDetail
  const isWatingForDetail =
    !!pickedSong && (!pickedSongDetail || pickedSong.id !== pickedSongDetail.id)
  const isReady =
    !!pickedSong && !!pickedSongDetail && pickedSong.id === pickedSongDetail.id

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-white">
      <audio
        ref={audioRef}
        src={pickedSongDetail?.previewUrl ?? undefined}
        className="hidden"
      />

      <AudioProgress
        displayTime={displayTime}
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
