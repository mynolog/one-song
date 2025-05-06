export default function RecommendedHistorySkeleton() {
  return (
    <div
      className={`flex h-[122px] w-3/4 max-w-[700px] flex-col gap-3 px-4 sm:w-[50vw] md:w-[60vw]`}
    >
      <div className="flex w-full items-center justify-center">
        <span className="text-muted-foreground text-sm">지나간 추천 노래</span>
      </div>
      <div className="basis-1/1 md:basis-1/2 xl:basis-1/3">
        <div className="p-1">
          <div className="animate-pulse rounded-md bg-gray-100">
            <div className="flex aspect-[4/1] w-full flex-col items-center justify-center gap-3 p-6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
