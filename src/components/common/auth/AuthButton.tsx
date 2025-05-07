'use client'

import { useSession } from 'next-auth/react'

import GoogleLoginButton from './GoogleLoginButton'
import LogoutButton from './LogoutButton'

export default function AuthButton() {
  const { data: session } = useSession()

  return session ? <LogoutButton /> : <GoogleLoginButton />
}
