'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconCheck, IconMinus, IconPlus, IconX } from '@/components/icons';
import type { PublicMenuItem } from '../api/types';
import type { CartRestaurant } from '@/features/cart/types';
import { useCart } from '@/features/cart/context/cart-context';
import { parseDealDescription } from '../utils/deal-parser';

interface DealDetailModalProps {
  restaurant: CartRestaurant;
  item: PublicMenuItem | null;
  onClose: () => void;
}

export function DealDetailModal({
  restaurant,
  item,
  onClose
}: DealDetailModalProps) {
  const t = useTranslations('menu');
  const { addItem, updateQuantity, getItemQuantity, items } = useCart();

  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  const hasVariants = item.variants && item.variants.length > 0;
  const effectiveBasePrice = item.price ?? item.basePrice ?? 0;
  const originalPrice = item.originalPrice ?? null;
  const hasDiscount =
    !hasVariants &&
    originalPrice !== null &&
    effectiveBasePrice > 0 &&
    originalPrice > effectiveBasePrice;
  const discountPercent =
    hasDiscount && originalPrice !== null
      ? Math.round(((originalPrice - effectiveBasePrice) / originalPrice) * 100)
      : 0;
  const savingsAmount =
    hasDiscount && originalPrice !== null
      ? originalPrice - effectiveBasePrice
      : 0;

  const parsedDetails = parseDealDescription(item.description);

  const cartQty = items
    .filter((i) => i.itemId === item.id)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const totalPrice = effectiveBasePrice * quantity;

  const handleAddToCart = () => {
    if (!item.isAvailable) return;
    addItem({
      restaurant,
      item: {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: effectiveBasePrice
      },
      quantity
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150'>
      <dialog
        open
        aria-labelledby='deal-modal-title'
        className='relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 text-card-foreground m-0 overflow-hidden'
      >
        {/* Hero Image Section */}
        <div className='relative h-52 sm:h-60 w-full shrink-0 overflow-hidden bg-muted'>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes='512px'
              className='object-cover'
              priority
            />
          ) : (
            <div className='flex size-full items-center justify-center bg-gradient-to-br from-rose-500/10 to-amber-500/10 text-6xl'>
              🍕
            </div>
          )}

          {/* Top Floating Controls */}
          <div className='absolute inset-x-0 top-0 p-3 flex items-center justify-between pointer-events-none'>
            <div className='flex items-center gap-1.5 pointer-events-auto'>
              <span className='inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 px-3 py-1 text-xs font-black text-white shadow-lg'>
                <span>🔥</span>
                <span>{t('hotDeal')}</span>
              </span>
              {discountPercent > 0 && (
                <span className='rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-black text-white shadow-md'>
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              type='button'
              onClick={onClose}
              className='pointer-events-auto flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer shadow-md'
              aria-label='Close'
            >
              <IconX className='size-4' />
            </button>
          </div>

          {/* Bottom Floating Savings Banner */}
          {savingsAmount > 0 && (
            <div className='absolute bottom-3 start-3 rounded-xl bg-background/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-md border border-emerald-500/20'>
              {t('totalSavings', { amount: formatPkr(savingsAmount) })}
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className='flex-1 overflow-y-auto p-5 sm:p-6 space-y-5'>
          {/* Deal Title & Pricing */}
          <div className='space-y-2'>
            <div className='flex items-start justify-between gap-3'>
              <h2
                id='deal-modal-title'
                className='text-lg sm:text-xl font-bold text-foreground tracking-tight'
              >
                {item.name}
              </h2>
              {!item.isAvailable && (
                <span className='shrink-0 rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground'>
                  {t('soldOut')}
                </span>
              )}
            </div>

            {/* Price Callout */}
            <div className='flex items-baseline gap-2.5 flex-wrap pt-1'>
              <span className='text-2xl font-bold text-foreground'>
                {formatPkr(effectiveBasePrice)}
              </span>
              {originalPrice !== null && (
                <span className='line-through text-sm text-muted-foreground'>
                  {formatPkr(originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className='rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold'>
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* What's Included Combo Section */}
          <div className='rounded-xl border border-border bg-muted/20 p-4 space-y-3'>
            <div className='flex items-center justify-between border-b border-border/60 pb-2.5'>
              <h3 className='text-xs sm:text-sm font-semibold tracking-wide text-foreground'>
                {t('whatsIncluded')}
              </h3>
              {parsedDetails.servingNote && (
                <span className='rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium'>
                  {parsedDetails.servingNote}
                </span>
              )}
            </div>

            {/* Individual Item Checklist */}
            {parsedDetails.items.length > 0 ? (
              <div className='grid gap-2'>
                {parsedDetails.items.map((comboItem, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between gap-3 rounded-lg bg-background border border-border p-2.5 text-xs sm:text-sm'
                  >
                    <div className='flex items-center gap-2.5 min-w-0 flex-1'>
                      <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                        <IconCheck className='size-3 stroke-[2.5]' />
                      </span>
                      <span className='font-medium text-foreground truncate'>
                        {comboItem.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-xs text-muted-foreground leading-relaxed'>
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Sticky Action Footer */}
        <div className='border-t border-border bg-card p-4 pb-6 sm:p-5 flex items-center justify-between gap-3 shrink-0'>
          {/* Quantity Selector */}
          <div className='flex items-center gap-2 rounded-2xl bg-muted/70 p-1'>
            <button
              type='button'
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || !item.isAvailable}
              className='flex size-8 items-center justify-center rounded-xl bg-card text-foreground hover:bg-muted disabled:opacity-40 transition-colors cursor-pointer shadow-2xs'
              aria-label='Decrease quantity'
            >
              <IconMinus className='size-4' />
            </button>
            <span className='w-6 text-center text-sm font-bold text-foreground'>
              {quantity}
            </span>
            <button
              type='button'
              onClick={() => setQuantity((q) => q + 1)}
              disabled={!item.isAvailable}
              className='flex size-8 items-center justify-center rounded-xl bg-card text-foreground hover:bg-muted disabled:opacity-40 transition-colors cursor-pointer shadow-2xs'
              aria-label='Increase quantity'
            >
              <IconPlus className='size-4' />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type='button'
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className='flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 px-5 text-sm font-black text-white hover:opacity-95 disabled:opacity-50 transition-opacity cursor-pointer shadow-md'
          >
            <span>
              {t('addToCartWithPrice', { price: formatPkr(totalPrice) })}
            </span>
            {cartQty > 0 && (
              <span className='rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white'>
                ({cartQty} in cart)
              </span>
            )}
          </button>
        </div>
      </dialog>
    </div>
  );
}

