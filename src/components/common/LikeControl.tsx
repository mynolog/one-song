import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'
import type { LikedSong } from '@/stores/useGuestStore'

import { Heart } from 'lucide-react'

import { Button } from '../ui/button'

interface LikeControlProps {
  pickedSong: Song
  pickedSongDetail: SongDetailResult
  onAddLike: (likedSong: LikedSong) => void
  onRemoveLike: (likedSong: LikedSong) => void
  isLiked: (likedSong: LikedSong) => boolean
}

export default function LikeControl({
  pickedSong,
  pickedSongDetail,
  onAddLike,
  onRemoveLike,
  isLiked,
}: LikeControlProps) {
  const likedSong: LikedSong = {
    id: pickedSong.id,
    artistName: pickedSong.artistName,
    name: pickedSong.name,
    releaseDate: pickedSong.releaseDate,
    artistUrl: pickedSong.artistUrl,
    artworkUrl100: pickedSong.artworkUrl100,
    url: pickedSong.url,
    collectionName: pickedSongDetail.collectionName,
    collectionViewUrl: pickedSongDetail.collectionViewUrl,
    previewUrl: pickedSongDetail.previewUrl,
    primaryGenreName: pickedSongDetail.primaryGenreName,
    addedAt: new Date().toISOString(),
  }
  const liked = isLiked(likedSong)

  const handleAddLike = () => {
    onAddLike(likedSong)
  }

  const handleRemoveLike = () => {
    onRemoveLike(likedSong)
  }

  return (
    <>
      {liked ? (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={handleRemoveLike}
        >
          <Heart className="!h-6 !w-6 fill-purple-400 stroke-purple-400" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={handleAddLike}
        >
          <Heart className="!h-6 !w-6 text-gray-400" />
        </Button>
      )}
    </>
  )
}
