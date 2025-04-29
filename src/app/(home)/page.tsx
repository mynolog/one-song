import type { SongsFeedResponse, Song } from '@/lib/songs'
import RandomSongPicker from '@/components/home/RandomSongPicker'
import { getRandomIndex } from '@/lib/getter'
import { COUNTRIES } from '@/constants/rssQueryParams'
import { getBaseUrl } from '@/lib/getter'

export default async function Home() {
  const randomCountryIndex = getRandomIndex(COUNTRIES.length)
  const countryCode = COUNTRIES[randomCountryIndex].code
  const baseURL = getBaseUrl()

  const res = await fetch(`${baseURL}/api/songs?countryCode=${countryCode}`, {
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
