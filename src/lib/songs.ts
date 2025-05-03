export interface Song {
  id: string
  artistName: string
  name: string
  releaseDate: string
  artistUrl: string
  artworkUrl100: string
  url: string
}

export interface SongsFeed {
  feed: {
    country: string
    updated: string
    results: Song[]
  }
}

export interface SongsFeedResponse {
  country: string
  updated: string
  results: Song[]
}

export async function fetchMostPlayedSongs(countryCode: string) {
  const URL = `https://rss.marketingtools.apple.com/api/v2/${countryCode}/music/most-played/100/songs.json`
  try {
    const res = await fetch(URL)

    if (!res.ok) {
      console.error('Apple RSS API 응답 실패: ', res.status)
      return null
    }

    const songFeed: SongsFeed = await res.json()
    return songFeed
  } catch (error) {
    console.error(error)
    throw error
  }
}
