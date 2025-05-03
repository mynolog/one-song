export default function ListenOnAppleMusicBadge() {
  return (
    // Apple Music Identity Guidelines를 준수하여 이미지 왜곡없이 사용하기 위해서 img 태그 사용
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/KR_listen-on-apple-music.svg"
      alt="Apple Music에서 듣기"
      className="h-auto w-38 max-w-75"
    />
  )
}
