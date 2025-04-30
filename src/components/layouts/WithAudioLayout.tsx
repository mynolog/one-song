'use client'

import AudioPlayer from '@/components/common/AudioPlayer'
import { Loader2, VolumeX } from 'lucide-react'
import { usePickedSongStore } from '@/stores/usePickedSongStore'

export default function WithAudioLayout({ children }: { children: React.ReactNode }) {
  const { pickedSongDetail } = usePickedSongStore()

  return (
    <div className="relative flex h-full w-full justify-center">
      <div className="fixed top-14 flex h-28 w-full max-w-[1200px] items-center justify-center overflow-hidden rounded-md py-2 transition-all duration-200 ease-in-out hover:bg-[#f1f3f4]">
        {pickedSongDetail ? (
          <div className="flex w-full flex-col items-center justify-center">
            {pickedSongDetail.previewUrl ? (
              <AudioPlayer />
            ) : (
              <div className="flex w-full items-center justify-center gap-2">
                <VolumeX className="text-muted-foreground h-6" />
                <span className="text-muted-foreground text-sm font-semibold">
                  이 곡은 미리 듣기를 지원하지 않습니다.
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="animate-spin" />
            <span className="mt-2 text-sm font-semibold">미리듣기 준비 중..</span>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
