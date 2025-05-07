import { supabase } from '../supabase'

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id, has_synced_likes')
    .eq('email', email)
    .maybeSingle()

  if (error) throw error
  return data ?? null
}

export async function createUser({
  email,
  name,
  image,
  provider,
}: {
  email: string
  name?: string | null
  image?: string | null
  provider: 'google'
}) {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      [
        {
          email,
          name: name ?? null,
          avatar_url: image ?? null,
          provider,
        },
      ],
      {
        onConflict: 'email',
      },
    )
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function markUserAsSyncedLikes(userId: string) {
  const { error } = await supabase
    .from('users')
    .update({ has_synced_likes: true })
    .eq('id', userId)

  if (error) throw error
}

export async function getLikedSongsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('liked_songs')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error

  return data ?? []
}
