import SearchHeader from '@/components/SearchHeader'

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <SearchHeader />
        {children}
      </body>
    </html>
  )
}
