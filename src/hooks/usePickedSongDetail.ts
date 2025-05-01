'use client'

import type { SongDetailResult } from '@/lib/song'
import { useEffect } from 'react'
import { getBaseUrl } from '@/lib/getter'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

export default function usePickedSongDetail() {
  const { pickedSongDetail, setPickedSongDetail, pickedSong } = usePickedSongStore()

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
  }, [pickedSong, setPickedSongDetail])

  return { pickedSongDetail }
}
