'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { IconBuildingStore, IconHome, IconShoppingCart } from '@/components/icons';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();

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
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-1.5 transition-colors',
                item.isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className='h-5 w-5' />
              <span className='text-[11px] leading-none'>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
