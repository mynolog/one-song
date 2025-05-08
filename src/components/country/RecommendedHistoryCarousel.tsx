'use client'

import type { SongDetailResult } from '@/lib/song'
import type { Song } from '@/lib/songs'

import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { usePickedSongStore } from '@/stores/usePickedSongStore'
import { useRecommendedHistoryStore } from '@/stores/useRecommendedHistoryStore'

export default function RecommendedHistoryCarousel() {
  const { history } = useRecommendedHistoryStore()
  const { setPickedSong, setPickedSongDetail, pickedSong } = usePickedSongStore()

  const handleUpdatePickedSong = (targetSong: Song & SongDetailResult) => {
    const newPickedSong: Song = {
      id: targetSong.id,
      artistName: targetSong.artistName,
      name: targetSong.name,
      releaseDate: targetSong.releaseDate,
      artistUrl: targetSong.artistUrl,
      artworkUrl100: targetSong.artworkUrl100,
      url: targetSong.url,
    }
    setPickedSong(newPickedSong)

    const newPickedSongDetail: SongDetailResult = {
      id: targetSong.id,
      collectionName: targetSong.collectionName,
      collectionViewUrl: targetSong.collectionName,
      previewUrl: targetSong.previewUrl,
      primaryGenreName: targetSong.primaryGenreName,
    }

    setPickedSongDetail(newPickedSongDetail)
  }

  return (
    <div
      className={`flex h-[122px] w-3/4 max-w-[700px] flex-col gap-3 px-4 sm:w-[50vw] md:w-[60vw] ${history.length === 0 && 'hidden'}`}
    >
      <div className="flex w-full items-center justify-center">
        <span className="text-muted-foreground text-sm">지나간 추천 노래</span>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {pickedSong &&
            history.map((song) => {
              const isActiveSong = song.id === pickedSong.id
              return (
                <CarouselItem
                  key={song.id}
                  className="basis-1/1 md:basis-1/2 xl:basis-1/3"
                >
                  <div className="p-1">
                    <Card
                      onClick={() => handleUpdatePickedSong(song)}
                      className={`transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-gray-50 ${isActiveSong && 'bg-gray-50'}`}
                    >
                      <CardContent className="flex aspect-[4/1] w-full flex-col items-center justify-center gap-3 p-6">
                        <span className="flex w-full items-center justify-center truncate text-center text-sm font-semibold">
                          {song.name}
                        </span>
                        <span className="flex w-full items-center justify-center truncate text-center text-xs">
                          {song.artistName}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
