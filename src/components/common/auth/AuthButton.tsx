'use client'

import { useSession } from 'next-auth/react'

import GoogleLoginButton from './GoogleLoginButton'
import LogoutButton from './LogoutButton'

interface AuthButtonProps {
  className?: string
}

export default function AuthButton({ className = '' }: AuthButtonProps) {
  const { data: session } = useSession()

  return (
    <div className={className}>{session ? <LogoutButton /> : <GoogleLoginButton />}</div>
  )
}
