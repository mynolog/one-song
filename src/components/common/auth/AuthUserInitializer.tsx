'use client'

import { useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'

import { syncLikedSongsToDB } from '@/lib/db/songs'
import { createUser, getUserByEmail, markUserAsSyncedLikes } from '@/lib/db/users'
import { useGuestStore } from '@/stores/useGuestStore'

export default function AuthUserInitializer() {
  const { data: session, status } = useSession()
  const userIdRef = useRef<string | null>(null)
  const { likedSongs, clearLikedSongs } = useGuestStore()

  useEffect(() => {
    if (status !== 'authenticated') return
    const user = session.user
    if (!user) return

    const initUser = async () => {
      if (!user.email) return
      try {
        const existedUser = await getUserByEmail(user.email)

        if (existedUser) {
          userIdRef.current = existedUser.id
          if (existedUser.has_synced_likes) return
        }

        const newUser = {
          email: user.email,
          name: user.name,
          image: user.image,
          provider: 'google' as const,
        }
        const { id } = await createUser(newUser)
        userIdRef.current = id
      } catch (error) {
        console.error(error)
      }
    }
    initUser()
  }, [status, session])

  useEffect(() => {
    const syncLikesIfNeeded = async () => {
      if (!userIdRef.current) return

      try {
        await syncLikedSongsToDB({ userId: userIdRef.current, likedSongs })
        await markUserAsSyncedLikes(userIdRef.current)
        clearLikedSongs()
      } catch (error) {
        console.error(error)
      }
    }
    syncLikesIfNeeded()
  }, [likedSongs, clearLikedSongs])

  return null
}
