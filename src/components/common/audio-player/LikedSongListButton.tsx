'use client'

import { ListMusic } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function LikedSongListButton() {
  const { data: session } = useSession()

  const href = session ? '/me/liked-songs' : '/guest/liked-songs'

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-10 w-10 rounded-full hover:text-green-600"
      asChild
    >
      <Link href={href}>
        <ListMusic className="!h-7 !w-7" />
      </Link>
    </Button>
  )
}
