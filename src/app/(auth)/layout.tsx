import Container from '@/components/common/Container'
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <Container>{children}</Container>
}

export default layout
