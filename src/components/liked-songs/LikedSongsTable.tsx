'use client'

import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'
import type { LikedSong } from '@/stores/useGuestStore'

import { Headphones, Info, Minus } from 'lucide-react'

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
import { usePickedSongStore } from '@/stores/usePickedSongStore'

import WithTooltip from '../common/WithTooltip'

interface LikedSongsTableProps {
  likedSongs: LikedSong[]
  onRemoveLike: (song: LikedSong) => void
}

export default function LikedSongsTable({
  likedSongs,
  onRemoveLike,
}: LikedSongsTableProps) {
  const handleRemoveLike = (song: LikedSong) => {
    onRemoveLike(song)
  }

  const { setPickedSong, setPickedSongDetail } = usePickedSongStore()

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
    <div className="h-[55vh] w-full overflow-hidden">
      <Table className="relative w-full">
        <TableCaption className="caption-top pb-3">내가 찜한 노래</TableCaption>
        <TableHeader className="text-xs">
          <TableRow>
            <TableHead>노래</TableHead>
            <TableHead className="hidden lg:table-cell">앨범</TableHead>
            <TableHead className="">
              <div className="flex items-center justify-center gap-1">
                <span>전체 듣기</span>
                <WithTooltip content="Apple Music 앱에서 듣기">
                  <Info className="text-muted-foreground hover:text-foreground !h-4 !w-4" />
                </WithTooltip>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center gap-1">미리 듣기</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center gap-1">찜 취소</div>
            </TableHead>
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
              <TableCell className="hidden w-[200px] max-w-[200px] truncate lg:block">
                {song.collectionName}
              </TableCell>
              <TableCell className="w-[30px]">
                <div className="flex w-full items-center justify-center">
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Apple Music에서 듣기"
                  >
                    <AppleMusicIcon />
                  </a>
                </div>
              </TableCell>
              <TableCell className="w-[30px]">
                <div className="flex w-full items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdatePickedSong(song)}
                  >
                    <Headphones className="inline-block h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="w-[30px]">
                <div className="flex w-full items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLike(song)}
                  >
                    <Minus className="inline-block h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
