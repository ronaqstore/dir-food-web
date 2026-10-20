'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconBrandWhatsapp, IconLoader2, IconShieldCheck, IconLock } from '@tabler/icons-react';
import { formatPkr } from '@/lib/money';
import type { CartItem, CartRestaurant, ValidatedDeliveryInfo } from '@/features/cart/types';

interface CheckoutOrderSummaryProps {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
  delivery?: ValidatedDeliveryInfo | null;
  isSubmitting: boolean;
  isValidToSubmit: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutOrderSummary({
  restaurant,
  items,
  subtotal,
  delivery,
  isSubmitting,
  isValidToSubmit,
  onSubmit
}: CheckoutOrderSummaryProps) {
  const t = useTranslations('checkout');

  const deliveryFee = delivery?.deliveryFee ?? null;
  const grandTotal = subtotal + (deliveryFee ?? 0);

  return (
    <div className='rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5 sticky top-24'>
      <div className='border-b border-border pb-3'>
        <h3 className='text-base font-bold text-foreground'>{t('orderSummaryTitle')}</h3>
        <p className='text-xs text-muted-foreground mt-0.5'>{restaurant.name}</p>
      </div>

      {/* Items list */}
      <div className='divide-y divide-border/60 max-h-60 overflow-y-auto pe-1 text-xs'>
        {items.map((item) => (
          <div
            key={item.key}
            className='flex items-center justify-between py-2.5 first:pt-0 last:pb-0'
          >
            <div className='min-w-0 flex-1 pe-2'>
              <p className='font-semibold text-foreground truncate'>
                {item.quantity}× {item.name}
              </p>
              {item.variantName ? (
                <span className='text-[11px] text-primary font-medium'>{item.variantName}</span>
              ) : null}
            </div>
            <span className='font-bold text-foreground shrink-0'>
              {formatPkr(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing breakdown */}
      <div className='space-y-2 border-t border-border pt-3 text-xs'>
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
            ) : (
              <span className='text-[11px] text-muted-foreground'>{t('confirmViaWhatsApp')}</span>
            )}
          </span>
        </div>

        <div className='flex justify-between items-baseline border-t border-border pt-2 text-sm'>
          <span className='font-bold text-foreground'>{t('total')}</span>
          <span className='text-lg font-extrabold text-primary'>{formatPkr(grandTotal)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className='pt-2'>
        <button
          type='button'
          onClick={onSubmit}
          disabled={!isValidToSubmit || isSubmitting}
          className='flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed py-3.5 px-4 text-sm font-bold text-white shadow-md transition-all'
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className='size-4 animate-spin' />
              <span>{t('placingOrder')}</span>
            </>
          ) : (
            <>
              <IconBrandWhatsapp className='size-5' />
              <span>{t('confirmAndOpenWhatsApp')}</span>
            </>
          )}
        </button>
      </div>

      {/* Cash on delivery notice */}
      <div className='flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground border border-border/60'>
        <IconShieldCheck className='size-4 text-emerald-600 dark:text-emerald-400 shrink-0' />
        <span>{t('cashOnDeliveryNotice')}</span>
      </div>

      <div className='flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground'>
        <IconLock className='size-3' />
        <span>{t('secureDirectOrdering')}</span>
      </div>
    </div>
  );
}
