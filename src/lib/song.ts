export interface SongDetail {
  artistId: number
  artistName: string
  collectionId: number
  collectionName?: string
  trackId?: number
  trackName: string
  collectionArtistId: number
  previewUrl?: string
  collectionViewUrl?: string
  artworkUrl100: string
  primaryGenreName?: string
}

export interface SongDetailResult {
  id: string
  collectionName: string | null
  collectionViewUrl: string | null
  previewUrl: string | null
  primaryGenreName: string | null
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

    if (!res.ok) {
      console.error('iTunes Search API 응답 실패: ', res.status)
      return null
    }
    const songDetail: SongDetailResponse = await res.json()
    return songDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}
