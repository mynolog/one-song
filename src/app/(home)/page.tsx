import { redirect } from 'next/navigation'

import { COUNTRIES } from '@/constants/rssQueryParams'
import { getBaseUrl } from '@/lib/getter'
import { getRandomIndex } from '@/lib/getter'

export default async function Home() {
  const randomCountryIndex = getRandomIndex(COUNTRIES.length)
  const countryCode = COUNTRIES[randomCountryIndex].code
  const baseURL = getBaseUrl()

  redirect(`${baseURL}/country/${countryCode}`)
}
