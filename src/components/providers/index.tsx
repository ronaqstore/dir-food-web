'use client';

import * as React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { AreaProvider } from '@/features/directory/context/area-context';
import { CartProvider } from '@/features/cart/context/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <QueryProvider>
        <AreaProvider>
          <CartProvider>
            <NextTopLoader color='#16a34a' showSpinner={false} />
            {children}
          </CartProvider>
        </AreaProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
