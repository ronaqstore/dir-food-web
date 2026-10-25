'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  IconBuildingStore,
  IconChevronDown,
  IconMapPin,
  IconShoppingCart
} from '@/components/icons';
import { useArea } from '@/features/directory/context/area-context';
import { useCart } from '@/features/cart/context/cart-context';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';

export function AppHeader() {
  const t = useTranslations();
  const { selectedCity, selectedArea, openAreaModal } = useArea();
  const { itemCount } = useCart();

  const areaLabel = selectedArea
    ? selectedCity
      ? `${selectedArea.name}, ${selectedCity.name}`
      : selectedArea.name
    : selectedCity
      ? `All ${selectedCity.name}`
      : t('header.defaultArea');

  return (
    <header className='sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-colors'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6'>
        {/* Brand & Location */}
        <div className='flex items-center gap-2 sm:gap-6'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition-transform'>
              <IconBuildingStore className='h-5 w-5' />
            </div>
            <div className='flex flex-col'>
              <span className='text-base font-bold tracking-tight text-foreground'>
                {t('brand.name')}
              </span>
              <span className='hidden text-[10px] text-muted-foreground sm:inline-block'>
                Khyber Pakhtunkhwa
              </span>
            </div>
          </Link>

          {/* Location Area Pill (Clickable) */}
          <button
            type='button'
            onClick={openAreaModal}
            className='flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer'
            aria-label={t('directory.selectAreaTitle')}
          >
            <IconMapPin className='h-3.5 w-3.5 text-primary' />
            <span suppressHydrationWarning className='max-w-[110px] sm:max-w-none truncate'>
              {areaLabel}
            </span>
            <IconChevronDown className='h-3 w-3 text-muted-foreground' />
          </button>
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-1.5 sm:gap-2'>
          {/* Navigation links on desktop */}
          <nav className='hidden sm:flex items-center gap-1 me-2 text-sm font-medium text-muted-foreground'>
            <Link
              href='/'
              className='rounded-lg px-3 py-1.5 hover:text-foreground hover:bg-muted transition-colors'
            >
              {t('nav.home')}
            </Link>
            <Link
              href='/restaurants'
              className='rounded-lg px-3 py-1.5 hover:text-foreground hover:bg-muted transition-colors'
            >
              {t('nav.restaurants')}
            </Link>
          </nav>

          <LocaleSwitcher />
          <ThemeToggle />

          {/* Cart Icon Link */}
          <Link
            href='/cart'
            aria-label={t('header.cart')}
            className='relative flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-muted transition-colors'
          >
            <IconShoppingCart className='h-5 w-5' />
            {itemCount > 0 ? (
              <span className='absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs animate-in zoom-in-50 duration-200'>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
