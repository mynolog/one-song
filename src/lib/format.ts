export function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}
