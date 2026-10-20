'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconAlertCircle } from '@/components/icons';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center px-4 text-center'>
      <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4'>
        <IconAlertCircle className='h-8 w-8' />
      </div>
      <h1 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
        {t('notFound')}
      </h1>
      <p className='mt-2 text-sm text-muted-foreground max-w-sm'>{t('notFoundDesc')}</p>
      <Link
        href='/'
        className='mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity'
      >
        {t('backToHome')}
      </Link>
    </div>
  );
}
