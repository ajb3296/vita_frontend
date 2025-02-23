"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "@/components/ui/provider"

const queryClient = new QueryClient();

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider>{children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  )
}