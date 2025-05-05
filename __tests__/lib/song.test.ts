import { http, HttpResponse } from 'msw'

import { fetchSongDetail } from '@/lib/song'

import { mockSongDetail } from '../../__mocks__/mockSongDetail'
import { server } from '../../__mocks__/server'

describe('fetchSongDetail', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('검색어가 특정 값일 때 mockSongDetail 응답을 반환한다.', async () => {
    server.use(
      http.get('https://itunes.apple.com/search', ({ request }) => {
        const url = new URL(request.url)
        const term = url.searchParams.get('term')

        if (term === 'Mock Artist 1 Mock Song 1') {
          return HttpResponse.json({ ...mockSongDetail })
        }
        return HttpResponse.json({ results: [] })
      }),
    )
    const result = await fetchSongDetail('Mock Artist 1', 'Mock Song 1')
    expect(result?.results[0].artistName).toBe('Mock Artist 1')
    expect(result).toEqual(mockSongDetail)
  })

  test('HTTP 응답 실패 시 null을 반환한다.', async () => {
    server.use(
      http.get('https://itunes.apple.com/search', () => {
        return HttpResponse.json({ error: '서버 에러' }, { status: 500 })
      }),
    )
    const result = await fetchSongDetail('Mock Artist 1', 'Mock Song 1')
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('iTunes Search API 응답 실패'),
      500,
    )
    expect(result).toBeNull()
  })

  test('fetch 요청 자체가 실패하면 에러를 던진다.', async () => {
    server.use(
      http.get('https://itunes.apple.com/search', () => {
        return HttpResponse.error()
      }),
    )
    expect(fetchSongDetail('Mock Artist 1', 'Mock Song 1')).rejects.toThrow(
      'Failed to fetch',
    )
  })
})
