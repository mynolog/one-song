import { Button } from '../ui/button'
import { Music4 } from 'lucide-react'

interface RandomSongButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function RandomSongButton({ onClick }: RandomSongButtonProps) {
  return (
    <Button onClick={onClick} className="h-12 w-75 cursor-pointer">
      <Music4 />
      <span className="font-semibold">추천 받기</span>
    </Button>
  )
}
