export function formatDate(dateInput: string | Date) {
  if (!dateInput) {
    throw new Error('유효하지 않은 입력입니다.')
  }
  const date = new Date(dateInput)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatTime(seconds: number) {
  if (seconds === undefined || isNaN(seconds)) {
    throw new Error('유효하지 않은 입력입니다.')
  }
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}
