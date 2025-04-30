import type { Song } from '@/lib/songs'
import Image from 'next/image'
import { getArtworkUrl } from '@/lib/getter'

interface RandomSongArtworkProps {
  pickedSong: Song
}

export default function RandomSongArtwork({ pickedSong }: RandomSongArtworkProps) {
  return (
    <div className="overflow-hidden rounded-md">
      <Image
        src={getArtworkUrl(pickedSong.artworkUrl100)}
        width={300}
        height={300}
        alt={pickedSong.name}
        className="rounded-md transition-all duration-200 ease-in-out hover:scale-115"
      />
    </div>
  )
}
