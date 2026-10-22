'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useCart } from '../context/cart-context';
import { formatPkr } from '@/lib/money';
import { IconArrowRight, IconShoppingBag } from '@/components/icons';

export function StickyCartBar() {
  const t = useTranslations('cart');
  const pathname = usePathname();
  const { restaurant, itemCount, subtotal } = useCart();

  // Do not show sticky cart bar if cart is empty or user is already on cart / checkout pages
  if (
    itemCount === 0 ||
    pathname === '/cart' ||
    pathname === '/checkout' ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout')
  ) {
    return null;
  }

  return (
    <div className='fixed bottom-20 sm:bottom-8 start-3 end-3 sm:start-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl sm:px-0 z-40 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300 ease-out'>
      <Link
        href='/cart'
        aria-label={t('viewCart')}
        className='pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 text-white p-3 sm:py-3.5 sm:px-5 shadow-[0_10px_30px_rgba(5,150,105,0.4)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)] border border-emerald-400/30 backdrop-blur-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group'
      >
        {/* Left Side: Badge + Restaurant & Order Info */}
        <div className='flex items-center gap-3 min-w-0'>
          <div className='flex items-center gap-1.5 rounded-xl bg-white/20 backdrop-blur-md px-2.5 py-1.5 text-white font-bold text-xs sm:text-sm border border-white/20 shrink-0 shadow-inner'>
            <IconShoppingBag className='size-4 sm:size-4.5' />
            <span>{itemCount}</span>
          </div>

          <div className='flex flex-col min-w-0'>
            {restaurant?.name ? (
              <>
                <span className='text-xs sm:text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[280px] leading-tight'>
                  {restaurant.name}
                </span>
                <span className='text-[11px] sm:text-xs text-white/90 font-medium leading-tight mt-0.5'>
                  {formatPkr(subtotal)} • {t('itemsCount', { count: itemCount })}
                </span>
              </>
            ) : (
              <>
                <span className='text-xs sm:text-sm font-bold text-white leading-tight'>
                  {formatPkr(subtotal)}
                </span>
                <span className='text-[11px] sm:text-xs text-white/90 font-medium leading-tight mt-0.5'>
                  {t('itemsCount', { count: itemCount })}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Action CTA Button */}
        <div className='flex items-center gap-1.5 rounded-xl bg-white text-emerald-800 dark:text-emerald-950 px-3.5 py-2 text-xs sm:text-sm font-bold shadow-md group-hover:bg-white/95 group-hover:shadow-lg transition-all shrink-0'>
          <span>{t('viewCart')}</span>
          <IconArrowRight className='size-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform' />
        </div>
      </Link>
    </div>
  );
}
