import { Button } from '../ui/button'
import { Music4 } from 'lucide-react'

interface RandomSongButtonProps {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export default function RandomSongButton({
  onClick,
  className = '',
  disabled = false,
}: RandomSongButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`h-12 w-75 cursor-pointer ${className}`}
    >
      <Music4 />
      <span className="font-semibold">추천 받기</span>
    </Button>
  )
}
