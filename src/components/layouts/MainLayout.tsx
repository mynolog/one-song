import { auth } from '@/auth'

import Footer from './Footer'
import Header from './Header'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col">
      <Header session={session} />
      <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  )
}
