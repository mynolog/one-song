import { Loader2, Shuffle } from 'lucide-react'

import { Button } from '../ui/button'

interface RandomSongButtonProps {
  onClick: () => void
  isSongReady: boolean
  isLoading: boolean
  className?: string
}

export default function RandomSongButton({
  onClick,
  isSongReady,
  isLoading,
  className = '',
}: RandomSongButtonProps) {
  if (!isSongReady) {
    return (
      <Button disabled className="h-12 w-75">
        <Loader2 className="animate-spin" />
        잠시만 기다려주세요..
      </Button>
    )
  }
  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className={`h-10 w-full cursor-pointer ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>곡 선택하는 중..</span>
        </>
      ) : (
        <>
          <Shuffle />
          <span className="font-semibold">추천 받기</span>
        </>
      )}
    </Button>
  )
}
