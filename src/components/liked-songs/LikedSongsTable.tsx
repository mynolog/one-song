'use client'

import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'
import type { LikedSong } from '@/stores/useGuestStore'

import { Headphones, Minus } from 'lucide-react'

import AppleMusicIcon from '@/components/icons/AppleMusicIcon'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGuestStore } from '@/stores/useGuestStore'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

export default function LikedSongsTable() {
  const { likedSongs, removeLike } = useGuestStore()
  const { setPickedSong, setPickedSongDetail } = usePickedSongStore()

  const handleRemoveLiked = (song: LikedSong) => {
    removeLike(song)
  }

  const handleUpdatePickedSong = (targetSong: LikedSong) => {
    const newPickedSong: Song = {
      id: targetSong.id,
      artistName: targetSong.artistName,
      name: targetSong.name,
      releaseDate: targetSong.releaseDate,
      artistUrl: targetSong.artistUrl,
      artworkUrl100: targetSong.artworkUrl100,
      url: targetSong.url,
    }
    setPickedSong(newPickedSong)

    const newPickedSongDetail: SongDetailResult = {
      id: targetSong.id,
      collectionName: targetSong.collectionName,
      collectionViewUrl: targetSong.collectionName,
      previewUrl: targetSong.previewUrl,
      primaryGenreName: targetSong.primaryGenreName,
    }

    setPickedSongDetail(newPickedSongDetail)
  }

  return (
    <div className="max-h-[55vh] w-full overflow-hidden">
      <Table className="relative w-full">
        <TableCaption className="caption-top pb-3">내가 찜한 노래</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>노래</TableHead>
            <TableHead className="hidden">앨범</TableHead>
            <TableHead>전체 듣기</TableHead>
            <TableHead>미리 듣기</TableHead>
            <TableHead>찜 취소</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedSongs.map((song) => (
            <TableRow key={song.id} className="w-full text-xs">
              <TableCell className="w-[400px] max-w-[400px] truncate">
                <div className="flex h-full w-full flex-col gap-1">
                  <span className="font-semibold">{song.name}</span>
                  <span>{song.artistName}</span>
                </div>
              </TableCell>
              <TableCell className="hidden w-[200px] max-w-[200px] truncate">
                {song.collectionName}
              </TableCell>
              <TableCell className="w-[30px]">
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apple Music에서 듣기"
                >
                  <AppleMusicIcon />
                </a>
              </TableCell>
              <TableCell className="w-[30px]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdatePickedSong(song)}
                >
                  <Headphones className="inline-block h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="w-[30px]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveLiked(song)}
                >
                  <Minus className="inline-block h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
