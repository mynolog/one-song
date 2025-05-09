'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useCountryStore } from '@/stores/useCountryStore'

interface DynamicLiksProps {
  className?: string
}

export default function DynamicLiks({ className = '' }: DynamicLiksProps) {
  const { status } = useSession()
  const { countryCode } = useCountryStore()

  const likedSongsHref =
    status === 'authenticated' ? '/me/liked-songs' : '/guest/liked-songs'
  const todaySongsHref = countryCode ? `/?countryCode=${countryCode}` : '/'
  return (
    <>
      <li className={className}>
        <Link href={todaySongsHref}>오늘의 추천 노래</Link>
      </li>
      <li className={className}>
        <Link href={likedSongsHref}>내가 찜한 노래</Link>
      </li>
    </>
  )
}
