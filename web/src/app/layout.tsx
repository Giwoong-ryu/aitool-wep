import './globals.css'
import { ReactNode } from 'react'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'AI Tool Guide',
  description: 'Your AI Tool Assistant',
}

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}