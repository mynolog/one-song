import { fetchMostPlayedSongs } from '@/lib/songs'

import { mockSongsFeed } from '../../__mocks__/mockSongFeed'

describe('fetchMostPlayedSongs', () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('정상 응답 시 SongsFeed 타입의 데이터를 반환한다.', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSongsFeed,
    })

    const result = await fetchMostPlayedSongs('kr')
    expect(result).toEqual(mockSongsFeed)
  })

  test('HTTP 오류 응답 시 null을 반환한다.', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    })

    const result = await fetchMostPlayedSongs('kr')
    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalledWith('Apple RSS API 응답 실패: ', 500)
  })

  test('fetch 요청 자체가 실패할 경우 에러를 던진다.', async () => {
    const error = new Error('Network Error')
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(fetchMostPlayedSongs('kr')).rejects.toThrow('Network Error')
  })
})
