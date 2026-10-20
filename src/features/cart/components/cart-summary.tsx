'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconArrowRight, IconShieldCheck, IconLoader2 } from '@tabler/icons-react';
import { formatPkr } from '@/lib/money';
import type { ValidatedDeliveryInfo, ValidatedCartRestaurant } from '../types';

interface CartSummaryProps {
  subtotal: number; // in paisa
  minOrderAmount: number | null; // in paisa
  delivery?: ValidatedDeliveryInfo | null;
  restaurant?: ValidatedCartRestaurant | null;
  isValidating?: boolean;
  hasErrors?: boolean;
}

export function CartSummary({
  subtotal,
  minOrderAmount,
  delivery,
  restaurant,
  isValidating,
  hasErrors
}: CartSummaryProps) {
  const t = useTranslations('cart');

  const deliveryFee = delivery?.deliveryFee ?? null;
  const deliveryStatus = delivery?.deliveryFeeStatus;

  const isMinOrderMet = !minOrderAmount || subtotal >= minOrderAmount;
  const isRestaurantOpen = restaurant ? restaurant.isOpenNow : true;
  const canProceed = isMinOrderMet && isRestaurantOpen && !hasErrors;

  const grandTotal = subtotal + (deliveryFee ?? 0);

  return (
    <div className='rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5 sticky top-24'>
      <h3 className='text-base font-bold text-foreground border-b border-border pb-3'>
        {t('orderSummary')}
      </h3>

      {/* Breakdown */}
      <div className='space-y-2.5 text-sm'>
        <div className='flex justify-between text-muted-foreground'>
          <span>{t('subtotal')}</span>
          <span className='font-semibold text-foreground'>{formatPkr(subtotal)}</span>
        </div>

        <div className='flex justify-between text-muted-foreground'>
          <span>{t('deliveryFee')}</span>
          <span className='font-semibold text-foreground'>
            {deliveryFee !== null ? (
              deliveryFee === 0 ? (
                t('free')
              ) : (
                formatPkr(deliveryFee)
              )
            ) : deliveryStatus === 'TO_BE_CONFIRMED' ? (
              <span className='text-xs text-muted-foreground'>{t('confirmedOnWhatsApp')}</span>
            ) : (
              <span className='text-xs text-muted-foreground'>—</span>
            )}
          </span>
        </div>

        <div className='border-t border-border pt-3 flex justify-between items-baseline'>
          <span className='text-base font-bold text-foreground'>{t('total')}</span>
          <div className='text-end'>
            <span className='text-xl font-extrabold text-primary'>{formatPkr(grandTotal)}</span>
            {deliveryFee === null && deliveryStatus === 'TO_BE_CONFIRMED' ? (
              <p className='text-[11px] text-muted-foreground'>+{t('plusDeliveryFee')}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className='pt-2'>
        {canProceed ? (
          <Link
            href='/checkout'
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 px-4 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/95 active:scale-[0.99] transition-all'
          >
            {isValidating ? (
              <>
                <IconLoader2 className='size-4 animate-spin' />
                <span>{t('checkingAvailability')}</span>
              </>
            ) : (
              <>
                <span>{t('proceedToCheckout')}</span>
                <IconArrowRight className='size-4 rtl:rotate-180' />
              </>
            )}
          </Link>
        ) : (
          <button
            type='button'
            disabled
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-3.5 px-4 text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-80'
          >
            {!isRestaurantOpen
              ? t('restaurantClosedBtn')
              : !isMinOrderMet
                ? t('minOrderNotMetBtn')
                : t('cannotProceedBtn')}
          </button>
        )}
      </div>

      {/* Cash on delivery notice */}
      <div className='flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground border border-border/60'>
        <IconShieldCheck className='size-4 text-primary shrink-0' />
        <span>{t('codNotice')}</span>
      </div>
    </div>
  );
}
