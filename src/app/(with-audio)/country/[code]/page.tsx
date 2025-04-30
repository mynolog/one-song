import type { CountryCode } from '@/constants/rssQueryParams'
import type { Song, SongsFeedResponse } from '@/lib/songs'
import RandomSongPicker from '@/components/home/RandomSongPicker'
import { getBaseUrl } from '@/lib/getter'

interface CountryPageProps {
  params: Promise<{ code: CountryCode }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params
  const baseURL = getBaseUrl()

  const res = await fetch(`${baseURL}/api/songs?countryCode=${code}`, {
    cache: 'no-store',
  })
  const json: SongsFeedResponse = await res.json()
  const songs: Song[] = json.results ?? []

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <RandomSongPicker songs={songs} />
    </div>
  )
}
