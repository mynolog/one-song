import type { LikedSong } from '@/stores/useGuestStore'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import MyLikedSongs from '@/components/me/MyLikedSongs'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function MyLikedSongsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/')
  }

  const email = session.user.email

  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (!data) {
    console.error('이메일이 존재하지 않습니다.')
    return
  }

  const userId = data.id

  const { data: songs } = await supabase
    .from('liked_songs')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false })
    .limit(10)

  const { count } = await supabase
    .from('liked_songs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  const totalPages = Math.ceil((count ?? 0) / 10)

  const initialSongs: LikedSong[] = (songs ?? []).map((song) => ({
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
  }))

  return (
    <div className="flex h-full min-h-[60vh] w-full max-w-[1200px] flex-col items-center gap-10 px-4">
      <MyLikedSongs initialSongs={initialSongs} totalPages={totalPages} />
    </div>
  )
}
