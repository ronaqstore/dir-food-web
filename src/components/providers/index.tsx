'use client';

import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { AreaProvider } from '@/features/directory/context/area-context';
import { CartProvider } from '@/features/cart/context/cart-context';
import type { ChildrenProps } from '@/types/common';

export function Providers({ children }: ChildrenProps) {
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
