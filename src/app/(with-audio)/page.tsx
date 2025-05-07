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

  const res = await fetch(
    `${baseUrl}/api/songs?countryCode=${encodeURIComponent(countryCode)}`,
    {
      cache: 'no-store',
    },
  )
  const json: SongsFeedResponse = await res.json()
  const songs: Song[] = json.results ?? []

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <RandomSongPicker songs={songs} countryCode={countryCode} />
      <RecommendedHistoryCard />
    </div>
  )
}
