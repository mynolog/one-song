import { formatTime, formatDate } from '@/lib/format'

describe('formatTime', () => {
  test('초를 mm:ss 형식으로 변환한다.', () => {
    expect(formatTime(70)).toBe('01:10')
    expect(formatTime(90)).not.toBe('00:30')
  })

  test('유효하지 않은 입력이 넘어오면 에러를 던진다.', () => {
    expect(() => formatTime(undefined as any)).toThrow('유효하지 않은 입력입니다.')
  })
})

describe('formatDate', () => {
  test('날짜를 yyyy. mm. dd. 형식의 문자열로 변환한다.', () => {
    const dateInput = '2025-04-29'
    expect(formatDate(dateInput)).toBe('2025. 04. 29.')
    expect(formatDate(dateInput)).not.toBe('2025-04-29')
  })

  test('Date 형식의 문자열을 yyyy. mm. dd. 형식의 문자열로 변환한다.', () => {
    const dateInput = new Date('2025-05-01T12:00:00Z')
    expect(formatDate(dateInput)).toBe('2025. 05. 01.')
    expect(formatDate(dateInput)).not.toBe('2025-05-01')
  })

  test('유효하지 않은 입력이 넘어오면 에러를 던진다.', () => {
    expect(() => formatDate(undefined as any)).toThrow('유효하지 않은 입력입니다.')
  })
})
