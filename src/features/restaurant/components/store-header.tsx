'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconBuildingStore, IconClock, IconMapPin, IconPhone } from '@/components/icons';
import { DeliveryFeesModal } from './delivery-fees-modal';
import type { PublicRestaurantProfile } from '../api/types';

interface StoreHeaderProps {
  restaurant: PublicRestaurantProfile;
}

export function StoreHeader({ restaurant }: StoreHeaderProps) {
  const t = useTranslations('restaurant');
  const [isDeliveryFeesOpen, setIsDeliveryFeesOpen] = React.useState(false);

  return (
    <div className='relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xs'>
      {/* Cover Photo */}
      <div className='relative h-44 sm:h-56 w-full bg-gradient-to-r from-primary/10 via-accent/20 to-primary/5 overflow-hidden'>
        {restaurant.coverUrl ? (
          <Image
            src={restaurant.coverUrl}
            alt={`${restaurant.name} cover`}
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center opacity-10'>
            <IconBuildingStore className='h-32 w-32' />
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className='absolute top-4 start-4'>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md shadow-xs ${
              restaurant.isOpenNow
                ? 'bg-emerald-500/90 text-white dark:bg-emerald-600/90'
                : 'bg-zinc-800/80 text-zinc-200'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                restaurant.isOpenNow ? 'bg-white animate-pulse' : 'bg-zinc-400'
              }`}
            />
            {restaurant.isOpenNow ? t('openNow') : t('closed')}
          </span>
        </div>
      </div>

      {/* Profile Info Bar */}
      <div className='p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          {/* Logo & Store Name */}
          <div className='flex items-start sm:items-center gap-4 -mt-12 sm:-mt-16'>
            <div className='relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border-4 border-card bg-card shadow-md overflow-hidden flex items-center justify-center'>
              {restaurant.logoUrl ? (
                <Image
                  src={restaurant.logoUrl}
                  alt={restaurant.name}
                  fill
                  sizes='96px'
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-primary/10 text-primary'>
                  <IconBuildingStore className='h-10 w-10' />
                </div>
              )}
            </div>

            <div className='pt-8 sm:pt-0'>
              <h1 className='text-xl sm:text-2xl font-black text-foreground tracking-tight'>
                {restaurant.name}
              </h1>

              {restaurant.cuisines && restaurant.cuisines.length > 0 && (
                <div className='mt-1 flex flex-wrap gap-1.5'>
                  {restaurant.cuisines.map((c) => (
                    <span
                      key={c}
                      className='rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick info badges */}
          <div className='flex flex-wrap items-center gap-2 text-xs'>
            {restaurant.deliveryAreas && restaurant.deliveryAreas.length > 0 && (
              <button
                type='button'
                onClick={() => setIsDeliveryFeesOpen(true)}
                className='inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-1.5 font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer'
              >
                <IconMapPin className='h-3.5 w-3.5 text-primary' />
                <span>{t('viewDeliveryFees')}</span>
              </button>
            )}

            {restaurant.minOrderAmount ? (
              <span className='rounded-xl border border-border bg-muted/40 px-3 py-1.5 font-semibold text-foreground'>
                {t('minOrder', { amount: formatPkr(restaurant.minOrderAmount) })}
              </span>
            ) : null}
          </div>
        </div>

        {/* Sub details: Address, hours info, description */}
        <div className='mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground'>
          {restaurant.addressText && (
            <div className='flex items-center gap-1.5'>
              <IconMapPin className='h-3.5 w-3.5 text-primary' />
              <span>{restaurant.addressText}</span>
            </div>
          )}

          <div className='flex items-center gap-1.5'>
            <IconClock className='h-3.5 w-3.5 text-muted-foreground' />
            <span>{restaurant.availabilityText}</span>
          </div>

          {restaurant.contactPhone && (
            <div className='flex items-center gap-1.5'>
              <IconPhone className='h-3.5 w-3.5 text-muted-foreground' />
              <span>{restaurant.contactPhone}</span>
            </div>
          )}
        </div>

        {restaurant.description && (
          <p className='mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed'>
            {restaurant.description}
          </p>
        )}
      </div>

      {/* Delivery Fees Modal */}
      <DeliveryFeesModal
        restaurantName={restaurant.name}
        areas={restaurant.deliveryAreas || []}
        isOpen={isDeliveryFeesOpen}
        onClose={() => setIsDeliveryFeesOpen(false)}
      />
    </div>
  );
}
