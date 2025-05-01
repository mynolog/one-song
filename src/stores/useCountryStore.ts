import type { CountryCode } from '@/constants/rssQueryParams'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CountryState {
  countryCode: CountryCode
  setCountryCode: (code: CountryCode) => void
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      countryCode: 'kr',
      setCountryCode: (code) => set({ countryCode: code ?? 'kr' }),
    }),
    { name: 'country' },
  ),
)
