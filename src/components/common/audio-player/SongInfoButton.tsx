'use client'

import { DiscAlbum } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useCountryStore } from '@/stores/useCountryStore'

export default function SongInfoButton() {
  const { countryCode } = useCountryStore()

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-10 w-10 rounded-full hover:text-green-600"
      asChild
    >
      <Link href={`/?countryCode=${countryCode}`}>
        <DiscAlbum className="!h-7 !w-7" />
      </Link>
    </Button>
  )
}
