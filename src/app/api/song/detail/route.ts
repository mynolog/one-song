import type { SongDetailResponse, SongDetailResult } from '@/lib/song'

import { NextRequest, NextResponse } from 'next/server'

import { fetchSongDetail } from '@/lib/song'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const artistName = searchParams.get('artistName')
  const title = searchParams.get('title')

  if (!artistName || !title || !id) {
    return NextResponse.json(
      { error: 'id, artistName, title은 필수입니다.' },
      { status: 400 },
    )
  }

  try {
    const data: SongDetailResponse = await fetchSongDetail(artistName, title)

    const exactMatchSong =
      data.results.find(
        (song) => song.trackName === title && song.artistName === artistName,
      ) ?? data.results[0]

    const response: SongDetailResult = {
      id,
      collectionName: exactMatchSong?.collectionName || null,
      collectionViewUrl: exactMatchSong?.collectionViewUrl || null,
      previewUrl: exactMatchSong?.previewUrl || null,
      primaryGenreName: exactMatchSong?.primaryGenreName || null,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '서버 에러' }, { status: 500 })
  }
}
