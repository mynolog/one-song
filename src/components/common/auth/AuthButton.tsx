'use client'
import type { Session } from 'next-auth'

import GoogleLoginButton from './GoogleLoginButton'
import LogoutButton from './LogoutButton'

interface AuthButtonProps {
  session: Session | null
}

export default function AuthButton({ session }: AuthButtonProps) {
  return session ? <LogoutButton /> : <GoogleLoginButton />
}
