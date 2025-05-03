export default function AppleMusicIcon() {
  return (
    // Apple Music Identity Guidelines를 준수하여 이미지 왜곡없이 사용하기 위해서 img 태그 사용
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/apple-music-icon.svg"
      alt="Apple Music에서 듣기"
      className="h-auto w-6 max-w-6"
    />
  )
}
