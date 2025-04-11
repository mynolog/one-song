import type { Song, SongResponse } from '@/lib/songs'
import { NextResponse } from 'next/server'
import { fetchMostPlayedSongs } from '@/lib/songs'

export async function GET() {
  try {
    const data: Song | null = await fetchMostPlayedSongs()
    if (!data) {
      return NextResponse.json({ error: 'Apple RSS API 응답 실패' }, { status: 500 })
    }

    const response: SongResponse = {
      country: data.feed.country,
      updated: data.feed.updated,
      results: data.feed.results,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('API 에러', error)
    return NextResponse.json({ error: '서버 에러' }, { status: 500 })
  }
}
