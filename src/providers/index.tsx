import { SessionProvider } from 'next-auth/react'

import ToastProvider from './ToastProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastProvider />
    </SessionProvider>
  )
}
