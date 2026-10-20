'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { formatPkr } from '@/lib/money';
import { IconBuildingStore, IconClock } from '@/components/icons';
import type { PublicRestaurantCard } from '../api/types';

interface RestaurantCardProps {
  restaurant: PublicRestaurantCard;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const t = useTranslations('directory');

  return (
    <Link
      href={`/r/${restaurant.slug}`}
      className='group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200'
    >
      {/* Top Banner / Logo Area */}
      <div className='relative h-36 w-full bg-muted/60 overflow-hidden flex items-center justify-center'>
        {restaurant.logoUrl ? (
          <Image
            src={restaurant.logoUrl}
            alt={restaurant.name}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <IconBuildingStore className='h-7 w-7' />
          </div>
        )}

        {/* Live Status Badge overlay */}
        <div className='absolute start-3 top-3'>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md shadow-xs ${
              restaurant.isOpenNow
                ? 'bg-emerald-500/90 text-white dark:bg-emerald-600/90'
                : 'bg-zinc-800/80 text-zinc-200 dark:bg-zinc-700/80'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                restaurant.isOpenNow ? 'bg-white animate-pulse' : 'bg-zinc-400'
              }`}
            />
            {restaurant.isOpenNow ? t('openNow') : t('closed')}
          </span>
        </div>
      </div>

      {/* Info Body */}
      <div className='flex flex-1 flex-col p-4'>
        <h3 className='text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1'>
          {restaurant.name}
        </h3>

        {/* Cuisines Tags */}
        {restaurant.cuisines && restaurant.cuisines.length > 0 && (
          <div className='mt-1.5 flex flex-wrap gap-1'>
            {restaurant.cuisines.slice(0, 3).map((cuisine) => (
              <span
                key={cuisine}
                className='rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground'
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {/* Footer info: Availability text & min order */}
        <div className='mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50'>
          <div className='flex items-center gap-1'>
            <IconClock className='h-3.5 w-3.5 text-muted-foreground/80' />
            <span className='line-clamp-1'>{restaurant.availabilityText}</span>
          </div>

          {restaurant.minOrderAmount ? (
            <span className='font-medium text-foreground'>
              {t('minOrder', { amount: formatPkr(restaurant.minOrderAmount) })}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
