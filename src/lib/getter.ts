export function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  if (!url) throw new Error('환경 변수 NEXT_PUBLIC_BASE_URL이 존재하지 않습니다.')
  return url
}

export function getRandomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

export function getArtworkUrl(originalUrl: string, size: number = 450) {
  if (!originalUrl.includes('100x100bb')) {
    throw new Error('유효하지 않은 url 형식입니다.')
  }
  return originalUrl.replace('100x100bb', `${size}x${size}bb`)
}
