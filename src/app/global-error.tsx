'use client';

import * as React from 'react';
import type { ErrorProps } from '@/types/error';
import { t } from '@/i18n/static-t';

export default function GlobalError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    void error;
  }, [error]);

  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
        <h2 className='text-xl font-bold'>{t('common.error')}</h2>
        <p className='mt-2 text-sm text-gray-500'>{error.message}</p>
        <button
          type='button'
          onClick={reset}
          className='mt-4 rounded-lg bg-black px-4 py-2 text-white'
        >
          {t('common.tryAgain')}
        </button>
      </body>
    </html>
  );
}
