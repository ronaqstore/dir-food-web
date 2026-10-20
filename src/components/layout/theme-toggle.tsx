'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { IconMoon, IconSun } from '@/components/icons';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className='h-9 w-9 rounded-full' />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-muted transition-colors cursor-pointer'
      aria-label='Toggle theme'
    >
      {isDark ? (
        <IconSun className='h-5 w-5 text-amber-400 transition-transform' />
      ) : (
        <IconMoon className='h-5 w-5 text-foreground/80 transition-transform' />
      )}
    </button>
  );
}
