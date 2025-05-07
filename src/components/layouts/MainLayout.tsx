'use client'

import Footer from './Footer'
import Header from './Header'
import AuthUserInitializer from '../common/auth/AuthUserInitializer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AuthUserInitializer />
      <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  )
}
