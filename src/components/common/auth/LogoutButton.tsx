'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

import { useAuthStore } from '@/stores/useAuthStore'

import { Button } from '../../ui/button'

export default function LogoutButton() {
  const { clearAuthStore } = useAuthStore()
  const handleSignOut = async () => {
    toast.loading('로그아웃 처리 중..')
    try {
      await signOut()
      clearAuthStore()
    } catch (error) {
      console.error(error)
      toast.error('로그아웃 실패했습니다. 다시 시도해주세요.')
    }
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
