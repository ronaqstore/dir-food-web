'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';
import { formatPkr } from '@/lib/money';

interface CartMinOrderAlertProps {
  subtotal: number; // in paisa
  minOrderAmount: number | null; // in paisa
  areaName?: string | null;
}

export function CartMinOrderAlert({ subtotal, minOrderAmount, areaName }: CartMinOrderAlertProps) {
  const t = useTranslations('cart');

  if (!minOrderAmount || minOrderAmount <= 0) return null;

  const isMet = subtotal >= minOrderAmount;
  const deficit = Math.max(0, minOrderAmount - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / minOrderAmount) * 100));

  if (isMet) {
    return (
      <div className='flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400'>
        <IconCircleCheck className='size-4 shrink-0' />
        <span>{areaName ? t('minOrderMetArea', { area: areaName }) : t('minOrderMet')}</span>
      </div>
    );
  }

  return (
    <div className='rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200 shadow-xs space-y-2.5'>
      <div className='flex items-start gap-2.5'>
        <IconAlertTriangle className='size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5' />
        <div className='min-w-0 flex-1 text-xs'>
          <p className='font-bold text-sm'>
            {t('minOrderDeficitTitle', { amount: formatPkr(deficit) })}
          </p>
          <p className='mt-0.5 text-amber-800/80 dark:text-amber-200/80'>
            {areaName
              ? t('minOrderDeficitDescArea', {
                  area: areaName,
                  min: formatPkr(minOrderAmount)
                })
              : t('minOrderDeficitDesc', {
                  min: formatPkr(minOrderAmount)
                })}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='space-y-1 pt-1'>
        <div className='flex justify-between text-[11px] font-semibold text-amber-800/90 dark:text-amber-300'>
          <span>{formatPkr(subtotal)}</span>
          <span>{formatPkr(minOrderAmount)}</span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-amber-500/20'>
          <div
            className='h-full bg-amber-500 transition-all duration-300'
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
