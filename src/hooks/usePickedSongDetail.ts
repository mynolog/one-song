'use client'

import type { SongDetailResult } from '@/lib/song'

import { useEffect } from 'react'

import { getBaseUrl } from '@/lib/getter'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

export default function usePickedSongDetail() {
  const { pickedSongDetail, setPickedSongDetail, pickedSong } = usePickedSongStore()

  useEffect(() => {
    if (!pickedSong) return

    // 국가 변경 시 pickedSongDetail 중복 요청 방지
    if (pickedSong.id === pickedSongDetail?.id) return

    const baseUrl = getBaseUrl()
    const loadSongDetail = async () => {
      const query = new URLSearchParams({
        artistName: pickedSong.artistName,
        title: pickedSong.name,
      })

      try {
        const detail = await fetch(`${baseUrl}/api/song/detail?${query}`)
        const data: SongDetailResult = await detail.json()
        setPickedSongDetail({
          ...data,
          id: pickedSong.id,
        })
      } catch (error) {
        console.error(error)
      }
    }
    loadSongDetail()
  }, [pickedSong, pickedSongDetail, setPickedSongDetail])

  return { pickedSongDetail }
}
