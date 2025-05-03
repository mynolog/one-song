'use client'

import { ListMusic } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function LikedSongListToggleButton() {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-10 w-10 rounded-full hover:text-green-600"
      asChild
    >
      <Link href="/guest/liked-songs">
        <ListMusic className="!h-7 !w-7" />
      </Link>
    </Button>
  )
}
