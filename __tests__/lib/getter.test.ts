import { getRandomIndex } from '@/lib/getter'

describe('getRamdomIndex', () => {
  test('0 이상 배열의 길이(length) 미만의 정수를 반환한다.', () => {
    const length = 10
    for (let i = 0; i < 10; i++) {
      const result = getRandomIndex(length)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(length)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  test('배열의 길이(length)가 1일 때는 항상 0을 반환한다.', () => {
    for (let i = 0; i < 5; i++) {
      const result = getRandomIndex(1)
      expect(result).toBe(0)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  test('배열의 길이(length)가 undefined일 경우 NaN이 된다.', () => {
    const result = getRandomIndex(undefined as any)
    expect(Number.isNaN(result)).toBe(true)
  })
})
