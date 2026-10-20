'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconShoppingCart, IconArrowRight } from '@tabler/icons-react';

export function CartEmptyState() {
  const t = useTranslations('cart');

  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
      <div className='flex size-20 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4 shadow-xs'>
        <IconShoppingCart className='size-10 stroke-[1.5]' />
      </div>
      <h2 className='text-xl font-bold text-foreground sm:text-2xl'>{t('emptyTitle')}</h2>
      <p className='mt-2 max-w-sm text-sm text-muted-foreground'>{t('emptyDesc')}</p>
      <div className='mt-6'>
        <Link
          href='/restaurants'
          className='inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors'
        >
          <span>{t('browseRestaurants')}</span>
          <IconArrowRight className='size-4 rtl:rotate-180' />
        </Link>
      </div>
    </div>
  );
}
