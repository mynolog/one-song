import type { SongDetailResponse } from '@/lib/song'

export const mockSongDetail: SongDetailResponse = {
  results: Array.from({ length: 25 }, (_, i) => ({
    artistId: i + 100,
    artistName: `Mock Artist ${i + 1}`,
    collectionId: i + 1000,
    collectionName: `Mock Album ${i + 1}`,
    trackId: i + 10000,
    trackName: `Mock Song ${i + 1}`,
    collectionArtistId: i + 100000,
    previewUrl: `https://example.com/preview${i + 1}.mp3`,
    collectionViewUrl: `https://example.com/album${i + 1}`,
    artworkUrl100: `https://example.com/artwork${i + 1}.jpg`,
    primaryGenreName: i % 2 === 0 ? 'Pop' : 'Rock',
  })),
}
