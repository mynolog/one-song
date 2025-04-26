import Title from '../home/Title'

export default function Header() {
  return (
    <header
      className={`fixed top-0 z-50 flex h-14 w-full items-center justify-center border-b-2 border-gray-100 bg-white transition-transform duration-300 dark:border-gray-700 dark:bg-black`}
    >
      <nav className="grid h-full w-full max-w-[1200px] grid-cols-3 items-center px-6">
        <Title />
        <div className="flex items-center justify-center">
          <h3>하루 한 곡, 새로운 발견</h3>
        </div>
        <ul className="flex items-center justify-end gap-5 font-semibold">
          <li>Login</li>
          <li>Join</li>
        </ul>
      </nav>
    </header>
  )
}
