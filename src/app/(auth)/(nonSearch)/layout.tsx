import NonSearchHeader from '@/components/NonSerachHader'
import React from 'react'

export default function NonSearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <NonSearchHeader />
        {children}
      </body>
    </html>
  )
}
