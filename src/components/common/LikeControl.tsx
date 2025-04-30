import type { Song } from '@/lib/songs'
import type { SongDetailResult } from '@/lib/song'
import type { LikedSong } from '@/stores/useGuestStore'
import { Heart } from 'lucide-react'
import { useGuestStore } from '@/stores/useGuestStore'
import { Button } from '../ui/button'

interface LikeControlProps {
  pickedSong: Song
  pickedSongDetail: SongDetailResult
}

export default function LikeControl({ pickedSong, pickedSongDetail }: LikeControlProps) {
  const { addLike, removeLike, isLiked } = useGuestStore()

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
  }
  const liked = isLiked(likedSong)

  console.log(liked)

  const handleAddLikes = () => {
    addLike(likedSong)
  }

  const handleRemoveLikes = () => {
    removeLike(likedSong)
  }

  return (
    <>
      {liked ? (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={handleRemoveLikes}
        >
          <Heart className="fill-purple-400 stroke-purple-400" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full"
          onClick={handleAddLikes}
        >
          <Heart className="text-gray-400" />
        </Button>
      )}
    </>
  )
}
