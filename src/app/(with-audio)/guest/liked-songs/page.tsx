'use client'
// TODO: 기능 별 컴포넌트로 분리 후 RSC로 전환하기

import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'
import type { LikedSong } from '@/stores/useGuestStore'

import { Headphones, Minus } from 'lucide-react'
import Link from 'next/link'

import AppleMusicIcon from '@/components/common/AppleMusicIcon'
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
import { useCountryStore } from '@/stores/useCountryStore'
import { useGuestStore } from '@/stores/useGuestStore'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

export default function GuestLikedSongsPage() {
  const { likedSongs, removeLike } = useGuestStore()
  const { setPickedSong, setPickedSongDetail } = usePickedSongStore()
  const { countryCode } = useCountryStore()

  const handleRemoveLiked = (song: LikedSong) => {
    removeLike(song)
  }

  const handleUpdatePickedSong = (targetSong: LikedSong) => {
    const {
      id,
      artistName,
      name,
      releaseDate,
      artistUrl,
      artworkUrl100,
      url,
      collectionName,
      collectionViewUrl,
      previewUrl,
      primaryGenreName,
    } = targetSong

    const newPickedSong: Song = {
      id,
      artistName,
      name,
      releaseDate,
      artistUrl,
      artworkUrl100,
      url,
    }

    const newPickedSongDetail: SongDetailResult = {
      id,
      collectionName,
      collectionViewUrl,
      previewUrl,
      primaryGenreName,
    }

    setPickedSong(newPickedSong)
    setPickedSongDetail(newPickedSongDetail)
  }

  return (
    <div className="flex h-[90vh] w-[1200px] flex-col gap-4 px-4 pt-[180px]">
      <Table>
        <TableCaption className="caption-top pb-3">내가 찜한 노래</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>아티스트</TableHead>
            <TableHead>앨범</TableHead>
            <TableHead>Apple Music</TableHead>
            <TableHead>미리 듣기</TableHead>
            <TableHead>찜 취소</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedSongs.map((song) => (
            <TableRow key={song.id} className="w-full">
              <TableCell className="w-[180px] max-w-[180px] truncate">
                {song.name}
              </TableCell>
              <TableCell className="w-[160px] max-w-[160px] truncate">
                {song.artistName}
              </TableCell>
              <TableCell className="w-[200px] max-w-[200px] truncate">
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
      <div className="flex w-full items-center justify-center">
        <Button>
          <Link href={`/country/${countryCode}`}>재생 화면으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
