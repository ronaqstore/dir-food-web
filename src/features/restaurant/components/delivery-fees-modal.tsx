'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconMapPin, IconX } from '@/components/icons';
import type { DeliveryAreaFee } from '../api/types';

interface DeliveryFeesModalProps {
  restaurantName: string;
  areas: DeliveryAreaFee[];
  isOpen: boolean;
  onClose: () => void;
}

export function DeliveryFeesModal({
  restaurantName,
  areas,
  isOpen,
  onClose
}: DeliveryFeesModalProps) {
  const t = useTranslations('restaurant');

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150'>
      <dialog
        open
        aria-labelledby='delivery-fees-title'
        className='relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150 text-card-foreground block m-0'
      >
        <div className='flex items-center justify-between pb-3 border-b border-border'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
              <IconMapPin className='h-4 w-4' />
            </div>
            <div>
              <h3 id='delivery-fees-title' className='text-sm font-bold text-foreground'>
                {t('deliveryAreasTitle')}
              </h3>
              <p className='text-[11px] text-muted-foreground'>{restaurantName}</p>
            </div>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'
          >
            <IconX className='h-4 w-4' />
          </button>
        </div>

        <div className='mt-4 max-h-[50vh] overflow-y-auto space-y-2 pe-1'>
          {areas.length === 0 ? (
            <p className='text-xs text-muted-foreground text-center py-4'>{t('noDeliveryAreas')}</p>
          ) : (
            areas.map((area) => (
              <div
                key={area.areaId}
                className='flex items-center justify-between rounded-xl bg-muted/40 p-3 text-xs'
              >
                <div className='flex items-center gap-2'>
                  <IconMapPin className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='font-medium text-foreground'>{area.name}</span>
                </div>
                <span className='font-bold text-primary'>
                  {area.deliveryFee !== null ? formatPkr(area.deliveryFee) : t('freeDelivery')}
                </span>
              </div>
            ))
          )}
        </div>
      </dialog>
    </div>
  );
}
