import LogoHeader from '@/components/LogoHeader'
import React from 'react'

export default function NonSearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <LogoHeader />
        {children}
      </body>
    </html>
  )
}
