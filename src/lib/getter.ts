export function getBaseUrl() {
  // CSR
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  // SSR
  const url = process.env.NEXT_BASE_URL
  if (!url) throw new Error('환경 변수 NEXT_BASE_URL이 존재하지 않습니다.')
  return url
}
