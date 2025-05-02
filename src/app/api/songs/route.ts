import type { SongsFeed, SongsFeedResponse } from '@/lib/songs'

import { NextRequest, NextResponse } from 'next/server'

import { fetchMostPlayedSongs } from '@/lib/songs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const countryCode = searchParams.get('countryCode') ?? 'kr'

  try {
    const data: SongsFeed | null = await fetchMostPlayedSongs(countryCode)
    if (!data) {
      return NextResponse.json({ error: 'Apple RSS API 응답 실패' }, { status: 500 })
    }

    const response: SongsFeedResponse = {
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
