'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Link } from '@/i18n/navigation';
import en from '../../messages/en.json';
import { t } from '@/i18n/static-t';

export default function RootNotFound() {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center font-sans'>
        <NextIntlClientProvider locale='en' messages={en}>
          <h1 className='text-3xl font-bold text-gray-900'>{t('common.notFound')}</h1>
          <p className='mt-2 text-sm text-gray-600'>{t('common.notFoundDesc')}</p>
          <Link
            href='/'
            className='mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-green-700'
          >
            {t('common.backToHome')}
          </Link>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
