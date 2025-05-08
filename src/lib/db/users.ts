import { supabase } from '../supabase/client'

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
    .order('added_at', { ascending: false })

  if (error) throw error

  return data ?? []
}

export async function getLikedSongsByUserIdPaginated({
  userId,
  page,
  pageSize = 10,
}: {
  userId: string
  page: number
  pageSize?: number
}) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false })
    .range(from, to)

  if (error) throw error
  return data ?? []
}

export async function getTotalPagesByUserId({
  userId,
  pageSize = 10,
}: {
  userId: string
  pageSize?: number
}) {
  const { count, error } = await supabase
    .from('liked_songs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (error) throw error

  return Math.ceil((count ?? 0) / pageSize)
}
