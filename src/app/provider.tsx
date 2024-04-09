'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()
const QueryProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
