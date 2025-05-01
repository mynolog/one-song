import { Button } from '../ui/button'
import { Shuffle } from 'lucide-react'

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
      className={`h-12 w-full cursor-pointer ${className}`}
    >
      <Shuffle />
      <span className="font-semibold">추천 받기</span>
    </Button>
  )
}
