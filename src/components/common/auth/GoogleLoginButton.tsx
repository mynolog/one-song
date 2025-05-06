import { signIn } from 'next-auth/react'

import GoogleIcon from '../../icons/GoogleIcon'
import { Button } from '../../ui/button'

export default function GoogleLoginButton() {
  const handleSignIn = async () => {
    await signIn('google')
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
