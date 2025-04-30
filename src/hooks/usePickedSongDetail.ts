'use client'

import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import { useEffect, useState } from 'react'
import { getBaseUrl } from '@/lib/getter'

interface UsePickedSongDetailProps {
  pickedSong: Song | null
}

export default function usePickedSongDetail({ pickedSong }: UsePickedSongDetailProps) {
  const [pickedSongDetail, setPickedSongDetail] = useState<SongDetailResult | null>(null)

  useEffect(() => {
    setPickedSongDetail(null)
  }, [pickedSong])

  useEffect(() => {
    if (!pickedSong) return
    const baseUrl = getBaseUrl()
    const loadSongDetail = async () => {
      const query = new URLSearchParams({
        artistName: pickedSong.artistName,
        title: pickedSong.name,
      })

      try {
        const detail = await fetch(`${baseUrl}/api/song/detail?${query}`)
        const data: SongDetailResult = await detail.json()
        setPickedSongDetail(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadSongDetail()
  }, [pickedSong])

  return { pickedSongDetail }
}
