import type { SongsFeedResponse, Song } from '@/lib/songs'
import RandomSongPicker from '@/components/home/RandomSongPicker'
import { getRandomIndex } from '@/lib/random'
import { COUNTRIES } from '@/constants/rssQueryParams'

export default async function Home() {
  const randomCountryIndex = getRandomIndex(COUNTRIES.length)
  const countryCode = COUNTRIES[randomCountryIndex].code

  const res = await fetch(`http://localhost:3000/api/songs?countryCode=${countryCode}`, {
    cache: 'no-store',
  })
  const json: SongsFeedResponse = await res.json()
  const songs: Song[] = json.results ?? []

  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <RandomSongPicker songs={songs} />
    </div>
  )
}
