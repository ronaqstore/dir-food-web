'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconAlertCircle, IconClock } from '@tabler/icons-react';
import type { ValidatedCartRestaurant } from '../types';

interface CartValidationBannerProps {
  restaurant?: ValidatedCartRestaurant | null;
  problems?: string[];
}

export function CartValidationBanner({ restaurant, problems }: CartValidationBannerProps) {
  const t = useTranslations('cart');

  const isClosed = restaurant && !restaurant.isOpenNow;
  const filteredProblems = (problems ?? []).filter(
    (p) => !p.toLowerCase().includes('minimum order')
  );

  if (!isClosed && filteredProblems.length === 0) return null;

  return (
    <div className='rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive space-y-2.5 shadow-xs'>
      {isClosed ? (
        <div className='flex items-start gap-2.5'>
          <IconClock className='size-5 shrink-0 mt-0.5' />
          <div className='text-xs'>
            <p className='font-bold text-sm'>{t('restaurantClosedTitle')}</p>
            <p className='mt-0.5 opacity-90'>
              {restaurant.availabilityText || t('restaurantClosedDesc')}
            </p>
          </div>
        </div>
      ) : null}

      {filteredProblems.length > 0 ? (
        <div className='flex items-start gap-2.5'>
          <IconAlertCircle className='size-5 shrink-0 mt-0.5' />
          <div className='text-xs space-y-1'>
            <p className='font-bold text-sm'>{t('attentionNeeded')}</p>
            <ul className='list-disc list-inside space-y-0.5 opacity-90'>
              {filteredProblems.map((prob) => (
                <li key={prob}>{prob}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
