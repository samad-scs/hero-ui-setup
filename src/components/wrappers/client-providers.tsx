'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { HeroUIProvider } from '@heroui/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ToastProvider } from '@heroui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Only if using TypeScript
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <ToastProvider />
        <NextThemesProvider attribute='class' defaultTheme='light'>
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}

export default ClientProvider
