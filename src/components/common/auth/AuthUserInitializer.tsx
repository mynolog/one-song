'use client'

import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { supabase } from '@/lib/supabase'

export default function AuthUserInitializer() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') return

    const registerUser = async () => {
      if (!session?.user) return
      const { email, name, image } = session.user

      const { data: existedUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (!existedUser) {
        await supabase.from('users').insert([
          {
            email,
            name,
            avatar_url: image,
            provider: 'google',
          },
        ])
      }
    }
    registerUser()
  }, [status, session])

  return null
}
