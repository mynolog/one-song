export default function RandomSongCardSkeleton() {
  return (
    <div className="flex h-[450px] w-[50vw] flex-col gap-4 sm:w-75">
      {/* artwork */}
      <div className="relative -z-50 flex aspect-square w-full max-w-75 animate-pulse items-center justify-center rounded-md bg-[#f1f3f4]"></div>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* name */}
        <div className="flex w-full items-center justify-center">
          <div className="flex h-7 w-full animate-pulse justify-center rounded-md bg-[#f1f3f4] text-lg font-extrabold"></div>
        </div>
        {/* artistName */}
        <div className="h-5 w-full animate-pulse rounded-md bg-[#f1f3f4] text-xs font-semibold text-gray-600 sm:text-sm"></div>
        <div className="flex w-full items-center justify-center pt-2">
          <div className="h-[44px] w-[152px] animate-pulse rounded-md bg-[#f1f3f4]"></div>
        </div>
      </div>
    </div>
  )
}
