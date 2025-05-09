export function formatDate(dateInput: string | Date) {
  if (!dateInput) {
    return '알 수 없음'
  }
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) {
    return '알 수 없음'
  }
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
