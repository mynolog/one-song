import { Music } from 'lucide-react'

export default function RandomSongSlogun() {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 text-lg font-bold text-gray-800">
      <Music />
      <span>한 곡의 음악이 하루를 바꿀지도 몰라요.</span>
    </div>
  )
}
