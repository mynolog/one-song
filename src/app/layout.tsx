import type { Metadata } from 'next'

import localFont from 'next/font/local'

import './globals.css'
import MainLayout from '@/components/layouts/MainLayout'
import Providers from '@/providers'

const pretendard = localFont({
  src: './assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const outfit = localFont({
  src: './assets/fonts/OutfitVariable.ttf',
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'OneSong - 우연처럼 다가온 음악 한 곡',
  description:
    '지금 당신에게 필요한 건, 단 하나의 좋은 노래. 플레이리스트에 없는 새로움, 이곳에서 시작해보세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} ${outfit.variable} antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}
