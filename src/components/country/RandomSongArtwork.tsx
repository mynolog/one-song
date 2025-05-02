import type { Song } from '@/lib/songs'

import Image from 'next/image'

import { getArtworkUrl } from '@/lib/getter'

interface RandomSongArtworkProps {
  pickedSong: Song
}

export default function RandomSongArtwork({ pickedSong }: RandomSongArtworkProps) {
  return (
    <div className="relative -z-50 aspect-square w-full max-w-75 overflow-hidden rounded-md">
      <Image
        src={getArtworkUrl(pickedSong.artworkUrl100)}
        alt={pickedSong.name}
        fill
        className="rounded-md object-cover transition-all duration-200 ease-in-out hover:scale-110"
      />
    </div>
  )
}
