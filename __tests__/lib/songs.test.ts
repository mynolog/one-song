import { http, HttpResponse } from 'msw'

import { fetchMostPlayedSongs } from '@/lib/songs'

import { mockSongsFeed } from '../../__mocks__/mockSongFeed'
import { server } from '../../__mocks__/server'

describe('fetchMostPlayedSongs', () => {
  beforeEach(() => {
    // console.erorr mock
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('fetchMostPlayedSongs가 mock된 RSS 응답을 반환한다.', async () => {
    const result = await fetchMostPlayedSongs('kr')
    expect(result).toEqual(mockSongsFeed)
  })

  test('HTTP 응답 실패 시 null을 반환한다.', async () => {
    server.use(
      http.get(
        'https://rss.marketingtools.apple.com/api/v2/kr/music/most-played/100/songs.json',
        () => {
          return HttpResponse.json({ error: '서버 에러' }, { status: 500 })
        },
      ),
    )
    const result = await fetchMostPlayedSongs('kr')
    expect(console.error).toHaveBeenCalledWith('Apple RSS API 응답 실패: ', 500)
    expect(result).toBeNull()
  })

  test('fetch 요청 자체가 실패할 경우 에러를 던진다.', async () => {
    server.use(
      http.get(
        'https://rss.marketingtools.apple.com/api/v2/kr/music/most-played/100/songs.json',
        () => {
          return HttpResponse.error()
        },
      ),
    )
    const error = new Error('Failed to fetch')
    expect(fetchMostPlayedSongs('kr')).rejects.toThrow(error)
  })
})
