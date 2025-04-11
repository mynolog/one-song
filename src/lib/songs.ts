interface Genre {
  genreId: string
  name: string
  url: string
}

interface Result {
  id: string
  artistName: string
  name: string
  releaseDate: string
  artistId: string
  artistUrl: string
  artworkUrl100: string
  genres: Genre[]
  url: string
}

export interface Song {
  feed: {
    country: string
    updated: string
    results: Result[]
  }
}

export interface SongResponse {
  country: string
  updated: string
  results: Result[]
}

export async function fetchMostPlayedSongs() {
  const URL =
    'https://rss.marketingtools.apple.com/api/v2/kr/music/most-played/100/songs.json'
  try {
    const res = await fetch(URL)

    if (!res.ok) {
      console.error('Apple RSS API 응답 실패: ', res.status)
      return null
    }

    const song: Song = await res.json()
    return song
  } catch (error) {
    console.error(error)
    return null
  }
}
