interface AppleMusicIconProps {
  variant?: 'color' | 'black'
}

export default function AppleMusicIcon({ variant = 'color' }: AppleMusicIconProps) {
  const colorIconSrc = '/images/apple-music-icon-color.svg'
  const blackIconSrc = '/images/apple-music-icon-black.svg'

  return (
    // Apple Music Identity Guidelines를 준수하여 이미지 왜곡없이 사용하기 위해서 img 태그 사용
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === 'color' ? colorIconSrc : blackIconSrc}
      alt="Apple Music에서 듣기"
      className="h-auto w-6 max-w-6"
    />
  )
}
