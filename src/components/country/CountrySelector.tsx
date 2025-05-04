'use client'
import type { CountryCode } from '@/constants/rssQueryParams'

import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useSyncCountryFromUrl from '@/hooks/useSyncCountryFromUrl'
import { useCountryStore } from '@/stores/useCountryStore'

export default function CountrySelector() {
  const router = useRouter()
  useSyncCountryFromUrl()
  const { countryCode, setCountryCode } = useCountryStore()

  const handleCountryChange = (value: CountryCode) => {
    setCountryCode(value)
    router.push(`/country/${value}`)
  }

  return (
    <Select value={countryCode} onValueChange={handleCountryChange}>
      <SelectTrigger className="w-full max-w-75">
        <SelectValue placeholder="국가를 선택하세요." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>🎧 Apple Music Top100</SelectLabel>
          <SelectItem value="kr">🇰🇷 대한민국 (Korea, Republic of)</SelectItem>
          <SelectItem value="jp">🇯🇵 일본 (Japan)</SelectItem>
          <SelectItem value="us">🇺🇸 미국 (United States)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
