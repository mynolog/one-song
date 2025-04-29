import { getRandomIndex, getBaseUrl, getArtworkUrl } from '@/lib/getter'

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
    const url = 'http://localhost'
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

describe('getArtworkUrl', () => {
  const baseUrl = 'http://localhost'
  test('함수의 인자로 url만 전달 시 100 x 100 해상도 이미지 url을 450 x 450 해상도 이미지 url로 변환한다.', () => {
    const url = `${baseUrl}/sample-100x100bb.jpg`
    expect(getArtworkUrl(url)).toBe(`${baseUrl}/sample-450x450bb.jpg`)
  })

  test('함수의 인자로 url과 size를 전달 시 100 x 100 해상도 이미지 url을 size x size 해상도 이미지 url로 변환한다.', () => {
    const url = `${baseUrl}/sample-100x100bb.jpg`
    expect(getArtworkUrl(url, 258)).toBe(`${baseUrl}/sample-258x258bb.jpg`)
  })

  test('url에 100x100bb이 없으면 에러를 던진다.', () => {
    const invalidUrl = `${baseUrl}/sample.jpg`
    expect(() => getArtworkUrl(invalidUrl)).toThrow('유효하지 않은 url 형식입니다.')
  })

  test('url이 빈 문자열이라면 에러를 던진다.', () => {
    const invalidUrl = ''
    expect(() => getArtworkUrl(invalidUrl)).toThrow('유효하지 않은 url 형식입니다.')
  })
})
