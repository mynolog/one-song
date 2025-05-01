import type { Song } from '@/lib/songs'
import { PickedSongState, usePickedSongStore } from '@/stores/usePickedSongStore'
import { SongDetailResult } from '@/lib/song'

describe('usePickedSongStore', () => {
  const initialState: PickedSongState = usePickedSongStore.getInitialState()

  const mockSong: Song = {
    id: 'mockId',
    artistName: 'mockArtist',
    name: 'mockSong',
    releaseDate: '2025-05-01',
    artistUrl: 'http://localhost/mock-artist',
    artworkUrl100: 'http://localhost/mockSong-100x100bb.jpg',
    url: 'http://localhost:/mockId',
  }

  const mockSongDetail: SongDetailResult = {
    collectionName: 'mockCollection',
    collectionViewUrl: 'http://localhost:/mockCollection',
    previewUrl: 'http://localhost:/mockCollection/mockSong.mp3',
    primaryGenreName: 'K-POP',
  }

  beforeEach(() => {
    usePickedSongStore.setState({ ...initialState })
  })

  test('초기 상태는 initalState와 동일하다.', () => {
    const { pickedSong, pickedSongDetail } = usePickedSongStore.getState()
    expect(pickedSong).toBe(initialState.pickedSong)
    expect(pickedSongDetail).toBe(initialState.pickedSongDetail)
  })

  test('곡을 선택하면 pickedSong 상태가 변경된다.', () => {
    const { setPickedSong } = usePickedSongStore.getState()
    setPickedSong(mockSong)
    const { pickedSong } = usePickedSongStore.getState()
    expect(pickedSong).toStrictEqual(mockSong)
  })

  test('곡을 선택하면 pickedSongDetail 상태가 변경된다.', () => {
    const { setPickedSongDetail } = usePickedSongStore.getState()
    setPickedSongDetail(mockSongDetail)
    const { pickedSongDetail } = usePickedSongStore.getState()
    expect(pickedSongDetail).toStrictEqual(mockSongDetail)
  })
})
