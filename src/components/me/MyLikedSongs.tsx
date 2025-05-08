'use client'

import type { LikedSong } from '@/stores/useGuestStore'

import { useEffect, useRef, useState } from 'react'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { removeLike } from '@/lib/db/likes'
import { getLikedSongsByUserIdPaginated } from '@/lib/db/users'
import { useAuthStore } from '@/stores/useAuthStore'

import LikedSongsPagination from '../liked-songs/LikedSongsPagination'
import LikedSongsTable from '../liked-songs/LikedSongsTable'

interface MyLikedSongsProps {
  initialSongs: LikedSong[]
  totalPages: number
}

export default function MyLikedSongs({ initialSongs, totalPages }: MyLikedSongsProps) {
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>(initialSongs)
  const { userId } = useAuthStore()
  const { status } = useSession()
  const [page, setPage] = useState(1)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!userId || status !== 'authenticated') return

    const fetchLikedSongsByPage = async () => {
      if (page === 1 && !hasMounted.current) {
        return
      }
      const fetchedSongs = await getLikedSongsByUserIdPaginated({ userId, page })
      if (fetchedSongs) {
        setLikedSongs(
          fetchedSongs.map((song) => ({
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
            addedAt: song.added_at,
          })),
        )
      }
    }
    fetchLikedSongsByPage()
    hasMounted.current = true
  }, [userId, page, status])

  const handleRemoveLike = async (song: LikedSong) => {
    if (!userId) return
    try {
      await removeLike({ userId, songId: song.id })
      toast.success('1곡이 삭제되었습니다.')
      setLikedSongs((prevState) => prevState.filter((s) => s.id !== song.id))
    } catch (error) {
      console.error(error)
      toast.error('삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <>
      <LikedSongsTable likedSongs={likedSongs} onRemoveLike={handleRemoveLike} />
      <LikedSongsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(targetPage: number) => setPage(targetPage)}
      />
    </>
  )
}
