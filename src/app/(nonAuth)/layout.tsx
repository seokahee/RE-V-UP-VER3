import React from 'react'
import Container from '@/components/common/Container'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <Container>{children}</Container>
}

export default layout
