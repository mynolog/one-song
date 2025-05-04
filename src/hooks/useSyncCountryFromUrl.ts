import type { CountryCode } from '@/constants/rssQueryParams'

import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { useCountryStore } from '@/stores/useCountryStore'

export default function useSyncCountryFromUrl() {
  const { code } = useParams()
  const { countryCode, setCountryCode } = useCountryStore()

  useEffect(() => {
    if (code && code !== countryCode) {
      setCountryCode(code as CountryCode)
    }
  }, [code, countryCode, setCountryCode])
}
