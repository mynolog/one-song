import AudioPlayer from '@/components/common/AudioPlayer'

export default function WithAudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-50 flex h-full w-full justify-center">
      <div className="fixed top-14 flex h-22 w-full max-w-[1200px] items-center justify-center overflow-hidden rounded-md bg-white transition-all duration-200 ease-in-out">
        <div className="flex w-full flex-col items-center justify-center">
          <AudioPlayer />
        </div>
      </div>
      {children}
    </div>
  )
}
