import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import GoogleIcon from '../../icons/GoogleIcon'
import { Button } from '../../ui/button'

export default function GoogleLoginButton() {
  const handleSignIn = async () => {
    toast.loading('Google 로그인 중..')
    try {
      await signIn('google', { callbackUrl: '/?login=success' })
    } catch (error) {
      console.error(error)
      toast.error('로그인 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      className="h-[40px] w-[120px] rounded-full bg-[#F2F2F2] text-sm leading-5 text-[#1F1F1F] transition-colors duration-200 ease-linear hover:cursor-pointer hover:bg-gray-200"
    >
      <GoogleIcon className="" />
      <span className="text-xs">Google 로그인</span>
    </Button>
  )
}
