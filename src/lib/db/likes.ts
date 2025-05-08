import type { LikedSong } from '@/stores/useGuestStore'

import { supabase } from '../supabase/supabase'

export async function syncLikedSongsToDB({
  userId,
  likedSongs,
}: {
  userId: string
  likedSongs: LikedSong[]
}) {
  if (likedSongs.length === 0) return

  const { error } = await supabase.from('liked_songs').insert(
    likedSongs.map((song) => ({
      user_id: userId,
      song_id: song.id,
      artist_name: song.artistName,
      artist_url: song.artistUrl,
      artwork_url_100: song.artworkUrl100,
      collection_name: song.collectionName ?? null,
      collection_view_url: song.collectionViewUrl ?? null,
      track_name: song.name,
      track_url: song.url,
      preview_url: song.previewUrl ?? null,
      primary_genre_name: song.primaryGenreName ?? null,
      release_date: song.releaseDate,
      added_at: song.addedAt,
    })),
  )
  if (error) {
    if (error.code === '23505') {
      console.warn('중복된 곡은 동기화에서 제외됩니다..', error.message)
    } else {
      throw error
    }
  }
}

export async function removeLike({ userId, songId }: { userId: string; songId: string }) {
  const { error } = await supabase
    .from('liked_songs')
    .delete()
    .match({ user_id: userId, song_id: songId })

  if (error) {
    throw error
  }
}

export async function addLike({ userId, song }: { userId: string; song: LikedSong }) {
  const { error } = await supabase.from('liked_songs').insert([
    {
      user_id: userId,
      song_id: song.id,
      artist_name: song.artistName,
      artist_url: song.artistUrl,
      artwork_url_100: song.artworkUrl100,
      collection_name: song.collectionName ?? null,
      collection_view_url: song.collectionViewUrl ?? null,
      track_name: song.name,
      track_url: song.url,
      preview_url: song.previewUrl ?? null,
      primary_genre_name: song.primaryGenreName ?? null,
      release_date: song.releaseDate,
      added_at: song.addedAt,
    },
  ])

  if (error) {
    if (error.code === '23505') {
      console.warn('이미 찜한 노래입니다.')
    } else {
      console.error(error)
      throw error
    }
  }
}
