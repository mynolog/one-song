import type { CountryCode } from '@/constants/rssQueryParams'
import type { Song, SongsFeedResponse } from '@/lib/songs'

import { redirect } from 'next/navigation'

import RandomSongPicker from '@/components/country/RandomSongPicker'
import RecommendedHistoryCard from '@/components/country/RecommendedHistoryCard'
import { getBaseUrl } from '@/lib/getter'

interface HomeProps {
  searchParams: Promise<{ countryCode?: CountryCode }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { countryCode } = await searchParams
  if (!countryCode) {
    redirect(`/?countryCode=kr`)
  }

  const baseUrl = getBaseUrl()

  let songs: Song[] = []
  let hasError = false

  try {
    const res = await fetch(
      `${baseUrl}/api/songs?countryCode=${encodeURIComponent(countryCode)}`,
      {
        cache: 'no-store',
      },
    )
    if (!res.ok) {
      hasError = true
    }
    const json: SongsFeedResponse = await res.json()
    songs = json.results ?? []
  } catch (error) {
    console.error('Top100 곡 목록 불러오기 실패: ', error)
    hasError = true
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <RandomSongPicker
        key={countryCode}
        songs={songs}
        countryCode={countryCode}
        hasError={hasError}
      />
      <RecommendedHistoryCard />
    </div>
  )
}
