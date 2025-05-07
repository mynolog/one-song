'use client'

import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { syncLikedSongsToDB } from '@/lib/db/likes'
import { createUser, getUserByEmail, markUserAsSyncedLikes } from '@/lib/db/users'
import { useAuthStore } from '@/stores/useAuthStore'
import { useGuestStore } from '@/stores/useGuestStore'

export default function AuthUserInitializer() {
  const { data: session, status } = useSession()
  const { likedSongs, clearLikedSongs } = useGuestStore()
  const { setUserId } = useAuthStore()

  useEffect(() => {
    if (status !== 'authenticated') return
    const user = session.user
    let userId: string
    if (!user) return

    const initUser = async () => {
      if (!user.email) return
      try {
        const existedUser = await getUserByEmail(user.email)

        if (existedUser) {
          userId = existedUser.id
          setUserId(userId)
          if (existedUser && existedUser.has_synced_likes) return
        }

        const newUser = {
          email: user.email,
          name: user.name,
          image: user.image,
          provider: 'google' as const,
        }
        const { id } = await createUser(newUser)
        userId = id
        setUserId(userId)

        await syncLikedSongsToDB({ userId, likedSongs })
        await markUserAsSyncedLikes(userId)
        clearLikedSongs()
      } catch (error) {
        console.error(error)
      }
    }
    initUser()
  }, [status, session, likedSongs, clearLikedSongs, setUserId])

  return null
}
