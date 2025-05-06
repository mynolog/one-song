import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from '../../ui/button'

export default function LogoutButton() {
  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <Button
      onClick={handleSignOut}
      className="h-[40px] w-[120px] rounded-full bg-[#F2F2F2] text-sm leading-5 text-[#1F1F1F] transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-200"
    >
      <LogOut />
      <span className="text-xs">로그아웃</span>
    </Button>
  )
}
