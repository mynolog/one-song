'use client'

import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import { useEffect, useState } from 'react'

import { ChevronRightIcon, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { addLike, removeLike } from '@/lib/db/likes'
import { getLikedSongsByUserId } from '@/lib/db/users'
import { useAuthStore } from '@/stores/useAuthStore'
import { LikedSong, useGuestStore } from '@/stores/useGuestStore'

import RandomSongArtwork from './RandomSongArtwork'
import LikeControl from '../common/LikeControl'
import ListenOnAppleMusicBadge from '../common/ListenOnAppleMusicBadge'
import { Button } from '../ui/button'

interface RandonSongCardProps {
  pickedSong: Song
  pickedSongDetail: SongDetailResult | null
}

export default function RandomSongCard({
  pickedSong,
  pickedSongDetail,
}: RandonSongCardProps) {
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>([])
  const {
    addLike: localAddLike,
    removeLike: localRemoveLike,
    isLiked: guestLiked,
  } = useGuestStore()
  const { status } = useSession()
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
            addedAt: song.added_at,
          })),
        )
      }
    }
    fetchLikedSongs()
  }, [userId])

  const guestAddLike = (song: LikedSong) => {
    try {
      localAddLike(song)
      toast.success('1곡이 찜한 노래 목록에 추가되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('목록 추가에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }
  const guestRemoveLike = (song: LikedSong) => {
    try {
      localRemoveLike(song)
      toast.success('1곡이 찜한 노래 목록에서 삭제되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const userAddLike = async (song: LikedSong) => {
    if (!userId) return
    try {
      await addLike({ userId, song })
      setLikedSongs((prevState) => [...prevState, song])
      toast.success('1곡이 찜한 노래 목록에 추가되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('목록 추가에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const userRemoveLike = async (song: LikedSong) => {
    if (!userId) return
    try {
      await removeLike({ userId, songId: song.id })
      setLikedSongs((prevState) => prevState.filter((s) => s.id !== song.id))
      toast.success('1곡이 찜한 노래 목록에서 삭제되었습니다.')
    } catch (error) {
      console.error(error)
      toast.error('삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const userLiked = (song: LikedSong) => likedSongs.some((s) => s.id === song.id)

  return (
    <div className="flex h-[450px] w-[50vw] flex-col gap-4 sm:w-75">
      <RandomSongArtwork pickedSong={pickedSong} />

      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-center">
          <span className="w-full truncate overflow-hidden text-center text-lg font-extrabold">
            {pickedSong.name}
          </span>
          {pickedSong && pickedSongDetail ? (
            <>
              {status !== 'authenticated' || !userId ? (
                <LikeControl
                  pickedSong={pickedSong}
                  pickedSongDetail={pickedSongDetail}
                  onAddLike={guestAddLike}
                  onRemoveLike={guestRemoveLike}
                  isLiked={guestLiked}
                />
              ) : (
                <LikeControl
                  pickedSong={pickedSong}
                  pickedSongDetail={pickedSongDetail}
                  onAddLike={userAddLike}
                  onRemoveLike={userRemoveLike}
                  isLiked={userLiked}
                />
              )}
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              disabled={!pickedSong || !pickedSongDetail}
              className="rounded-full"
            >
              <Heart className="gray-400 !h-6 !w-6" />
            </Button>
          )}
        </div>
        <div className="flex w-full items-center justify-center overflow-hidden text-sm font-semibold text-gray-600 hover:text-green-600">
          <a
            href={pickedSong.artistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center"
          >
            <span className="truncate">{pickedSong.artistName}</span>
            <ChevronRightIcon className="h-4 flex-shrink-0" />
          </a>
        </div>
        <div className="flex w-full items-center justify-center pt-2">
          <a
            href={pickedSong.url ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center hover:text-green-600"
          >
            <ListenOnAppleMusicBadge />
          </a>
        </div>
      </div>
    </div>
  )
}
