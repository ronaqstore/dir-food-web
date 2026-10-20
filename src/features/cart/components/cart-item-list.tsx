'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  IconTrash,
  IconPlus,
  IconMinus,
  IconBuildingStore,
  IconPlus as IconAddMore
} from '@tabler/icons-react';
import { useCart } from '../context/cart-context';
import { formatPkr } from '@/lib/money';

export function CartItemList() {
  const t = useTranslations('cart');
  const { restaurant, items, updateQuantity, removeItem, clearCart } = useCart();
  const [isClearing, setIsClearing] = React.useState(false);

  if (!restaurant || items.length === 0) return null;

  return (
    <div className='rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs space-y-5'>
      {/* Restaurant Header */}
      <div className='flex items-center justify-between border-b border-border pb-4'>
        <div className='flex items-center gap-3 min-w-0'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold overflow-hidden'>
            {restaurant.logoUrl ? (
              <Image
                src={restaurant.logoUrl}
                alt={restaurant.name}
                width={40}
                height={40}
                className='size-full object-cover'
              />
            ) : (
              <IconBuildingStore className='size-5' />
            )}
          </div>
          <div className='min-w-0'>
            <h2 className='text-base font-bold text-foreground truncate'>{restaurant.name}</h2>
            <p className='text-xs text-muted-foreground'>{t('orderingFrom')}</p>
          </div>
        </div>

        <Link
          href={`/r/${restaurant.slug}`}
          className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shrink-0'
        >
          <IconAddMore className='size-3.5' />
          <span>{t('addMore')}</span>
        </Link>
      </div>

      {/* Items list */}
      <div className='divide-y divide-border'>
        {items.map((item) => {
          const itemTotal = item.unitPrice * item.quantity;

          return (
            <div
              key={item.key}
              className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0 last:pb-0'
            >
              {/* Item Info */}
              <div className='flex items-start gap-3 min-w-0 flex-1'>
                {item.imageUrl ? (
                  <div className='relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted'>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes='56px'
                      className='object-cover'
                    />
                  </div>
                ) : null}

                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h3 className='text-sm font-semibold text-foreground'>{item.name}</h3>
                    {item.variantName ? (
                      <span className='inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
                        {item.variantName}
                      </span>
                    ) : null}
                  </div>
                  <p className='mt-0.5 text-xs text-muted-foreground'>
                    {formatPkr(item.unitPrice)}
                  </p>
                </div>
              </div>

              {/* Actions & Price */}
              <div className='flex items-center justify-between sm:justify-end gap-4'>
                {/* Quantity Stepper */}
                <div className='flex items-center rounded-xl border border-border bg-background p-0.5 shadow-xs'>
                  <button
                    type='button'
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    className='flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                    aria-label={t('decreaseQuantity')}
                  >
                    <IconMinus className='size-3.5' />
                  </button>
                  <span className='min-w-7 text-center text-xs font-bold text-foreground'>
                    {item.quantity}
                  </span>
                  <button
                    type='button'
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className='flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                    aria-label={t('increaseQuantity')}
                  >
                    <IconPlus className='size-3.5' />
                  </button>
                </div>

                {/* Line total */}
                <span className='text-sm font-bold text-foreground min-w-16 text-end'>
                  {formatPkr(itemTotal)}
                </span>

                {/* Remove button */}
                <button
                  type='button'
                  onClick={() => removeItem(item.key)}
                  className='flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors'
                  aria-label={t('removeItem')}
                >
                  <IconTrash className='size-4' />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clear Cart Action */}
      <div className='border-t border-border pt-4 flex justify-between items-center'>
        {isClearing ? (
          <div className='flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>{t('confirmClearPrompt')}</span>
            <button
              type='button'
              onClick={() => {
                clearCart();
                setIsClearing(false);
              }}
              className='text-xs font-bold text-destructive hover:underline'
            >
              {t('confirmClearYes')}
            </button>
            <span className='text-xs text-muted-foreground'>•</span>
            <button
              type='button'
              onClick={() => setIsClearing(false)}
              className='text-xs font-medium text-muted-foreground hover:text-foreground'
            >
              {t('confirmClearNo')}
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setIsClearing(true)}
            className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors'
          >
            <IconTrash className='size-3.5' />
            <span>{t('clearCart')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
