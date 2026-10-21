'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { IconBuildingStore, IconHome, IconShoppingCart } from '@/components/icons';
import { useCart } from '@/features/cart/context/cart-context';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems = [
    {
      href: '/',
      label: t('nav.home'),
      icon: IconHome,
      isActive: pathname === '/'
    },
    {
      href: '/restaurants',
      label: t('nav.restaurants'),
      icon: IconBuildingStore,
      isActive: pathname.startsWith('/restaurants') || pathname.startsWith('/r/')
    },
    {
      href: '/cart',
      label: t('nav.cart'),
      icon: IconShoppingCart,
      isActive: pathname.startsWith('/cart') || pathname.startsWith('/checkout')
    }
  ];

  return (
    <nav className='fixed bottom-0 start-0 z-40 w-full border-t border-border bg-background/95 backdrop-blur-md sm:hidden'>
      <div className='flex h-16 items-center justify-around px-2'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCartItem = item.href === '/cart';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-1.5 transition-colors',
                item.isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className='relative'>
                <Icon className='h-5 w-5' />
                {isCartItem && itemCount > 0 ? (
                  <span className='absolute -top-1.5 -end-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs animate-in zoom-in-50 duration-200'>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                ) : null}
              </div>
              <span className='text-[11px] leading-none'>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
