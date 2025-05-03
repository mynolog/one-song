import type { SongsFeed } from '@/lib/songs'

export const mockSongsFeed: SongsFeed = {
  feed: {
    country: 'kr',
    updated: '2025-05-03T00:00:00Z',
    results: Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      artistName: `Mock Artist ${i + 1}`,
      name: `Mock Song ${i + 1}`,
      releaseDate: '2025-04-01',
      artistUrl: `https://example.com/artist${i + 1}`,
      artworkUrl100: `https://example.com/artwork${i + 1}.jpg`,
      url: `https://example.com/song${i + 1}`,
    })),
  },
}
