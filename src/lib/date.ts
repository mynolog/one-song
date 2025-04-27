export function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
