import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Piece Together Chess',
  description: 'Enriching Minds, One Piece at a Time',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
