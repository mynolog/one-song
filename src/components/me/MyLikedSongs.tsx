'use client'

import type { LikedSong } from '@/stores/useGuestStore'

import { useEffect, useState } from 'react'

import { removeLike } from '@/lib/db/likes'
import { getLikedSongsByUserId } from '@/lib/db/users'
import { useAuthStore } from '@/stores/useAuthStore'

import LikedSongsTable from '../liked-songs/LikedSongsTable'

export default function MyLikedSongs() {
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>([])
  const { userId } = useAuthStore()

  useEffect(() => {
    if (!userId) return

    const fetchLikedSongs = async () => {
      const songs = await getLikedSongsByUserId(userId)
      if (songs) {
        setLikedSongs(
          songs.map((song) => ({
            id: song.song_id,
            artistName: song.artist_name,
            artistUrl: song.artist_url,
            artworkUrl100: song.artwork_url_100,
            collectionName: song.collection_name,
            collectionViewUrl: song.collection_view_url,
            primaryGenreName: song.primary_genre_name,
            previewUrl: song.preview_url,
            releaseDate: song.release_date,
            name: song.track_name,
            url: song.track_url,
          })),
        )
      }
    }
    fetchLikedSongs()
  }, [userId])

  const handleRemoveLike = async (song: LikedSong) => {
    if (!userId) return
    try {
      await removeLike({ userId, songId: song.id })
      setLikedSongs((prevState) => prevState.filter((s) => s.id !== song.id))
    } catch (error) {
      console.error(error)
    }
  }

  return <LikedSongsTable likedSongs={likedSongs} onRemoveLike={handleRemoveLike} />
}
