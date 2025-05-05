import { http, HttpResponse } from 'msw'

import { mockSongsFeed } from './mockSongFeed'

export const handlers = [
  http.get(
    'https://rss.marketingtools.apple.com/api/v2/kr/music/most-played/100/songs.json',
    () => {
      return HttpResponse.json({
        ...mockSongsFeed,
      })
    },
  ),

  http.get('https://itunes.apple.com/search', () => {
    return HttpResponse.json({ results: [] })
  }),
]
