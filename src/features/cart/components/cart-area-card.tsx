'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconMapPin, IconChevronRight, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useArea } from '@/features/directory/context/area-context';
import { formatPkr } from '@/lib/money';
import type { ValidatedDeliveryInfo } from '../types';

interface CartAreaCardProps {
  delivery?: ValidatedDeliveryInfo | null;
}

export function CartAreaCard({ delivery }: CartAreaCardProps) {
  const t = useTranslations('cart');
  const { selectedArea, openAreaModal } = useArea();

  const isServed = Boolean(delivery);

  return (
    <div className='rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
          <IconMapPin className='size-4 text-primary' />
          <span>{t('deliveryLocation')}</span>
        </div>

        <button
          type='button'
          onClick={openAreaModal}
          className='inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline'
        >
          <span>{selectedArea ? t('changeArea') : t('selectArea')}</span>
          <IconChevronRight className='size-3.5 rtl:rotate-180' />
        </button>
      </div>

      {selectedArea ? (
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1'>
          <div>
            <p className='text-sm font-bold text-foreground'>{selectedArea.name}</p>
            <p className='text-xs text-muted-foreground'>{t('lowerDirRegion')}</p>
          </div>

          <div className='flex items-center gap-2'>
            {isServed ? (
              delivery?.deliveryFee !== null && delivery?.deliveryFee !== undefined ? (
                <span className='inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary'>
                  <IconCheck className='size-3.5' />
                  <span>
                    {delivery.deliveryFee === 0
                      ? t('freeDelivery')
                      : t('deliveryFeeAmount', { fee: formatPkr(delivery.deliveryFee) })}
                  </span>
                </span>
              ) : (
                <span className='inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'>
                  {t('feeConfirmedViaWhatsApp')}
                </span>
              )
            ) : (
              <span className='inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive'>
                <IconAlertCircle className='size-3.5' />
                <span>{t('areaNotServed')}</span>
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between gap-3 pt-1'>
          <p className='text-xs text-muted-foreground'>{t('noAreaPrompt')}</p>
          <button
            type='button'
            onClick={openAreaModal}
            className='shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors'
          >
            {t('chooseArea')}
          </button>
        </div>
      )}
    </div>
  );
}
