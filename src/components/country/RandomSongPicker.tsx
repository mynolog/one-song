'use client'

import type { CountryCode } from '@/constants/rssQueryParams'
import type { Song } from '@/lib/songs'

import { useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import usePickedSongDetail from '@/hooks/usePickedSongDetail'
import usePickSong from '@/hooks/usePickSong'
import { useCountryStore } from '@/stores/useCountryStore'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import { useRecommendedHistoryStore } from '@/stores/useRecommendedHistoryStore'

import CountrySelector from './CountrySelector'
import EmptyRandomSongCard from './EmptyRandomSongCard'
import RandomSongCard from './RandomSongCard'
import RandomSongCardSkeleton from './RandomSongCardSkeleton'
import RandomSongTrigger from './RandomSongTrigger'

interface RandomSongPickerProps {
  songs: Song[]
  countryCode: CountryCode
  hasError: boolean
}

export default function RandomSongPicker({
  songs,
  countryCode,
  hasError,
}: RandomSongPickerProps) {
  const { pickedSong, setPickedSong, hydrated } = usePickedSongStore()
  const { addHistory } = useRecommendedHistoryStore()
  const { setCountryCode } = useCountryStore()
  const { pick } = usePickSong({ songs })
  const { pickedSongDetail } = usePickedSongDetail()
  const [hasMounted, setHasMounted] = useState(false)

  const hasShownToastRef = useRef(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && hasError && !hasShownToastRef.current) {
      console.log('a')
      toast('Top100 곡 목록 불러오기에 실패하였습니다.', {
        action: {
          label: '새로고침',
          onClick: () => (window.location.href = '/'),
        },
        duration: Infinity,
      })
      hasShownToastRef.current = true
    }
  }, [hasError, hasMounted])

  useEffect(() => {
    if (pickedSong && pickedSongDetail && pickedSong.id === pickedSongDetail.id) {
      addHistory({
        ...pickedSong,
        ...pickedSongDetail,
      })
    }
  }, [pickedSong, pickedSongDetail, addHistory])

  const isSongsReady = Array.isArray(songs) && songs.length > 0

  const handlePickRandomSong = () => {
    const randomSong = pick()
    if (randomSong) {
      setPickedSong(randomSong)
      setCountryCode(countryCode)
    }
  }

  if (!hydrated) {
    return (
      <div className="mb-5 flex h-full w-[50vw] flex-col items-center gap-4 sm:w-full">
        <CountrySelector />
        <RandomSongTrigger onPickRandomSong={() => {}} isSongsReady={false} />
        <RandomSongCardSkeleton />
      </div>
    )
  }

  return (
    <div className="mb-5 flex h-full w-[50vw] flex-col items-center gap-4 sm:w-full">
      <CountrySelector />
      <RandomSongTrigger
        onPickRandomSong={handlePickRandomSong}
        isSongsReady={isSongsReady}
      />

      {pickedSong ? (
        <RandomSongCard pickedSong={pickedSong} pickedSongDetail={pickedSongDetail} />
      ) : (
        <EmptyRandomSongCard />
      )}
    </div>
  )
}
