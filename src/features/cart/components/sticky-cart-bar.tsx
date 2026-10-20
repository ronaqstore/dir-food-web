'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '../context/cart-context';
import { formatPkr } from '@/lib/money';
import { IconChevronRight, IconShoppingCart } from '@/components/icons';

export function StickyCartBar() {
  const t = useTranslations('cart');
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className='fixed bottom-16 sm:bottom-6 start-0 end-0 z-40 mx-auto max-w-lg px-4 pointer-events-none animate-in slide-in-from-bottom-4 duration-200'>
      <Link
        href='/cart'
        className='pointer-events-auto flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-lg hover:opacity-95 transition-all group'
      >
        <div className='flex items-center gap-2.5'>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-xs'>
            {itemCount}
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-semibold leading-tight'>
              {t('itemsCount', { count: itemCount })}
            </span>
            <span className='text-xs text-white/90 font-medium'>{formatPkr(subtotal)}</span>
          </div>
        </div>

        <div className='flex items-center gap-1.5 text-xs font-bold text-white'>
          <span>{t('viewCart')}</span>
          <IconChevronRight className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
        </div>
      </Link>
    </div>
  );
}
