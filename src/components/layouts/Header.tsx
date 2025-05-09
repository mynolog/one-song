import DynamicLiks from './DynamicLinks'
import HeaderDrawerMenu from './HeaderDrawerMenu'
import AuthButton from '../common/auth/AuthButton'
import Title from '../common/Title'

export default function Header() {
  return (
    <header
      className={`fixed top-0 z-[99] flex h-14 w-full items-center justify-center border-b-2 border-gray-100 bg-white transition-transform duration-300 dark:border-gray-700 dark:bg-black`}
    >
      <nav className="grid h-full w-full max-w-[1200px] grid-cols-3 items-center px-6">
        <Title />
        <div className="flex items-center justify-center">
          <h3 className="hidden md:block">하루 한 곡, 새로운 발견</h3>
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <ul className="flex items-center justify-end gap-4 text-xs font-semibold">
            <DynamicLiks className="hidden md:block" />
            <AuthButton className="hidden md:block" />
          </ul>
          <HeaderDrawerMenu className="cursor-pointer md:hidden" />
        </div>
      </nav>
    </header>
  )
}
