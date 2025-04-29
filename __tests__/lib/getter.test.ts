import { getRandomIndex, getBaseUrl } from '@/lib/getter'

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

describe('getBaseUrl', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_URL
  })

  test('환경 변수가 설정되어 있으면 url을 반환한다.', () => {
    const url = 'http://localhost:9999'
    process.env.NEXT_PUBLIC_BASE_URL = url
    expect(getBaseUrl()).toBe(url)
  })

  test('환경 변수가 빈 문자열이라면 에러를 던진다.', () => {
    process.env.NEXT_PUBLIC_BASE_URL = ''
    expect(() => getBaseUrl()).toThrow(
      '환경 변수 NEXT_PUBLIC_BASE_URL이 존재하지 않습니다.',
    )
  })

  test('환경 변수가 존재하지 않는다면 에러를 던진다.', () => {
    expect(() => getBaseUrl()).toThrow(
      '환경 변수 NEXT_PUBLIC_BASE_URL이 존재하지 않습니다.',
    )
  })
})
