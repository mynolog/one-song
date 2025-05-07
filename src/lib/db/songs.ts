import type { LikedSong } from '@/stores/useGuestStore'

import { supabase } from '../supabase'

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
