'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { RestaurantCard } from './restaurant-card';
import { useArea } from '../context/area-context';
import { IconBuildingStore, IconMapPin } from '@/components/icons';
import type { PublicRestaurantCard } from '../api/types';

interface RestaurantGridProps {
  restaurants?: PublicRestaurantCard[];
  isLoading: boolean;
  onResetFilters?: () => void;
}

export function RestaurantGrid({ restaurants, isLoading, onResetFilters }: RestaurantGridProps) {
  const t = useTranslations('directory');
  const { selectedArea, openAreaModal } = useArea();

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-0 animate-pulse'
          >
            <div className='h-36 w-full bg-muted' />
            <div className='p-4 space-y-3'>
              <div className='h-4 w-3/4 rounded bg-muted' />
              <div className='flex gap-2'>
                <div className='h-3 w-16 rounded bg-muted' />
                <div className='h-3 w-12 rounded bg-muted' />
              </div>
              <div className='pt-3 border-t border-border/50 flex justify-between'>
                <div className='h-3 w-24 rounded bg-muted' />
                <div className='h-3 w-16 rounded bg-muted' />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className='flex min-h-[35vh] flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-muted/20 p-8 text-center'>
        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-3'>
          <IconBuildingStore className='h-7 w-7' />
        </div>
        <h3 className='text-base font-bold text-foreground'>{t('noRestaurants')}</h3>
        <p className='mt-1 text-xs text-muted-foreground max-w-sm'>
          {selectedArea
            ? t('noRestaurantsInArea', { area: selectedArea.name })
            : t('noRestaurantsDesc')}
        </p>

        <div className='mt-5 flex flex-wrap items-center justify-center gap-2'>
          {selectedArea && (
            <button
              type='button'
              onClick={openAreaModal}
              className='inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer'
            >
              <IconMapPin className='h-3.5 w-3.5 text-primary' />
              <span>{t('changeArea')}</span>
            </button>
          )}

          {onResetFilters && (
            <button
              type='button'
              onClick={onResetFilters}
              className='inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer'
            >
              {t('resetFilters')}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
      ))}
    </div>
  );
}
