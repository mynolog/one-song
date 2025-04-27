export interface SongDetail {
  artistId: number
  artistName: string
  collectionId: number
  trackId: number
  trackName: string
  collectionArtistId: number
  previewUrl: string
  artworkUrl100: string
  primaryGenreName: string
}

export interface SongDetailResult {
  artistId: number
  trackId: number
  previewUrl: string
  primaryGenreName: string
}

export interface SongDetailResponse {
  results: SongDetail[]
}

export async function fetchSongDetail(artistName: string, title: string) {
  const params = new URLSearchParams({
    term: `${artistName} ${title}`,
    media: 'music',
    entity: 'song',
    limit: '25',
  })

  const URL = `https://itunes.apple.com/search?${params.toString()}`

  try {
    const res = await fetch(URL)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
