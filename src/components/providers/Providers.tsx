'use client';

import React, { useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 15, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#F4F1EA',
              fontFamily: 'var(--font-mono)',
              borderRadius: '12px',
            },
          }}
        />
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
