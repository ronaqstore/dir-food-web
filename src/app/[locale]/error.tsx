'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconAlertCircle } from '@/components/icons';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  React.useEffect(() => {
    // Log error in production monitoring
  }, [error]);

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center px-4 text-center'>
      <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4'>
        <IconAlertCircle className='h-8 w-8' />
      </div>
      <h2 className='text-xl font-bold tracking-tight text-foreground sm:text-2xl'>{t('error')}</h2>
      <p className='mt-2 text-sm text-muted-foreground max-w-sm'>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type='button'
        onClick={reset}
        className='mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer'
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
