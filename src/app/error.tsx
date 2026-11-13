'use client';

import * as React from 'react';
import type { ErrorProps } from '@/types/error';
import { t } from '@/i18n/static-t';

export default function RootError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    void error;
  }, [error]);

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center p-4 text-center'>
      <h2 className='text-xl font-bold'>{t('common.error')}</h2>
      <p className='mt-2 text-sm text-muted-foreground'>{error.message}</p>
      <button
        type='button'
        onClick={reset}
        className='mt-4 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground'
      >
        {t('common.tryAgain')}
      </button>
    </div>
  );
}
