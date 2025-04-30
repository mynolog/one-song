export const COUNTRIES = [
  { name: 'Japan', code: 'jp' },
  { name: 'South Korea', code: 'kr' },
  { name: 'United States', code: 'us' },
] as const

export type CountryCode = (typeof COUNTRIES)[number]['code']
