import NotFoundPageRedirect from '@/components/common/NotFoundPageRedirect'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <h2 className="mb-5 text-3xl font-bold">404: 페이지를 찾을 수 없음</h2>
        <div className="h-full w-full items-center justify-center">
          <div className="text-muted-foreground flex w-full flex-col items-center justify-center">
            <p>존재하지 않는 주소이거나,</p>
            <p>요청하신 페이지의 주소가 변경 또는 삭제되어 찾을 수 없습니다.</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <NotFoundPageRedirect />
        </div>
      </div>
    </div>
  )
}
