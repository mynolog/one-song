'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function NotFoundPageRedirect() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back()
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [router])

  return <p>잠시 후 직전페이지로 이동합니다.</p>
}
