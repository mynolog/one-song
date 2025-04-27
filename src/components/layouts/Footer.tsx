import GitHub from '../icons/GitHub'

export default function Footer() {
  return (
    <footer className="flex h-20 w-full flex-col items-center justify-center gap-2 bg-[#f2f2f2] text-xs text-gray-500 md:flex-row">
      <div className="flex items-center justify-center gap-1">
        Powered by
        <a
          href="https://rss.marketingtools.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-green-600"
        >
          Apple Music RSS
        </a>
        <span>and</span>
        <a
          href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-green-600"
        >
          iTunes Search API
        </a>
      </div>
      <span className="hidden md:inline-block">·</span>
      <div className="flex items-center justify-center gap-2">
        <span>Built by Minho Lee</span>
        <a
          href="https://github.com/mynolog/one-song"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 font-semibold hover:cursor-pointer hover:text-green-600"
        >
          <GitHub className="!h-4 group-hover:text-green-600" />
          <span>mynolog</span>
        </a>
      </div>
    </footer>
  )
}
