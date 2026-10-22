'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconMinus, IconPlus, IconShoppingCart, IconTag } from '@/components/icons';
import type { PublicMenuItem } from '../api/types';
import type { CartRestaurant } from '@/features/cart/types';
import { useCart } from '@/features/cart/context/cart-context';
import { parseDealDescription } from '../utils/deal-parser';

interface FeaturedDealsCarouselProps {
  restaurant: CartRestaurant;
  deals: PublicMenuItem[];
  onSelectVariant: (item: PublicMenuItem) => void;
  onOpenDeal: (item: PublicMenuItem) => void;
}

export function FeaturedDealsCarousel({
  restaurant,
  deals,
  onSelectVariant,
  onOpenDeal
}: FeaturedDealsCarouselProps) {
  const t = useTranslations('menu');
  const { addItem, updateQuantity, getItemQuantity, items } = useCart();

  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <section className='space-y-3.5 pt-2'>
      {/* Section Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
          <div className='flex items-center gap-2'>
            <span className='flex size-6 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400'>
              <IconTag className='size-3.5' />
            </span>
            <h3 className='text-base sm:text-lg font-bold text-foreground tracking-tight'>
              {t('dealsTitle')}
            </h3>
            <span className='rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-2 py-0.5 text-[10px] font-bold'>
              {deals.length} {deals.length === 1 ? 'Deal' : 'Deals'}
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>
            {t('dealsSubtitle')}
          </p>
        </div>
      </div>

      {/* Horizontal Carousel (Swipeable on mobile, smooth scroll) */}
      <div className='flex gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 px-1 -mx-1 snap-x snap-mandatory scrollbar-none'>
        {deals.map((item) => {
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

          const totalItemQtyInCart = items
            .filter((i) => i.itemId === item.id)
            .reduce((acc, curr) => acc + curr.quantity, 0);

          const lowestVariantPrice = hasVariants
            ? Math.min(...item.variants.map((v) => v.price))
            : 0;

          const parsedDetails = parseDealDescription(item.description);

          const handleSimpleAdd = () => {
            if (!item.isAvailable) return;
            addItem({
              restaurant,
              item: {
                id: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
                price: effectiveBasePrice
              },
              quantity: 1
            });
          };

          const handleQuantityStep = (delta: number) => {
            const key = `${item.id}:base`;
            const currentQty = getItemQuantity(item.id);
            updateQuantity(key, currentQty + delta);
          };

          return (
            <div
              key={item.id}
              className='group relative w-[280px] sm:w-[310px] shrink-0 snap-start flex flex-col justify-between rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-gradient-to-b from-rose-500/[0.04] via-card to-card p-3.5 shadow-xs hover:border-rose-400 hover:shadow-md transition-all duration-200'
            >
              <button
                type='button'
                onClick={() => onOpenDeal(item)}
                className='text-start w-full cursor-pointer focus:outline-hidden'
              >
                {/* Image & Badges */}
                <div className='relative h-36 w-full overflow-hidden rounded-xl bg-muted mb-3'>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes='310px'
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  ) : (
                    <div className='flex size-full items-center justify-center bg-rose-500/5 text-2xl'>
                      🍕
                    </div>
                  )}

                  {/* Deal Ribbon / Badges Overlay */}
                  <div className='absolute top-2.5 start-2.5 flex items-center gap-1.5'>
                    <span className='inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-md'>
                      <span>🔥</span>
                      <span>{t('hotDeal')}</span>
                    </span>
                  </div>

                  {savingsAmount > 0 && (
                    <div className='absolute bottom-2.5 start-2.5 rounded-lg bg-background/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-xs border border-emerald-500/20'>
                      {t('saveAmount', { amount: formatPkr(savingsAmount) })}
                    </div>
                  )}

                  {!item.isAvailable && (
                    <div className='absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center'>
                      <span className='rounded-lg bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground shadow-xs'>
                        {t('soldOut')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Deal Title & Description */}
                <div>
                  <div className='flex items-center justify-between gap-2'>
                    <h4 className='font-bold text-foreground text-sm sm:text-base line-clamp-1 group-hover:text-rose-600 transition-colors'>
                      {item.name}
                    </h4>
                    <span className='shrink-0 text-[10px] font-bold text-rose-600 dark:text-rose-400 group-hover:underline'>
                      {t('viewDetails')} ➔
                    </span>
                  </div>
                  {item.description && (
                    <p className='mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
                      {item.description}
                    </p>
                  )}
                </div>

                {/* KFC / Foodpanda Style Items Checklist Preview */}
                {parsedDetails.items.length > 0 && (
                  <div className='mt-2.5 flex flex-wrap gap-1'>
                    {parsedDetails.items.slice(0, 3).map((ci, idx) => (
                      <span
                        key={idx}
                        className='inline-flex items-center gap-1 rounded-md bg-muted/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground'
                      >
                        <span>{ci.emoji}</span>
                        <span className='truncate max-w-[110px]'>{ci.name}</span>
                      </span>
                    ))}
                    {parsedDetails.items.length > 3 && (
                      <span className='inline-flex items-center rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400'>
                        +{parsedDetails.items.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </button>

              {/* Price & Add to Cart Footer */}
              <div className='mt-3.5 pt-2.5 border-t border-border/60 flex items-center justify-between gap-2'>
                <div>
                  {hasVariants ? (
                    <span className='text-xs sm:text-sm font-bold text-foreground'>
                      {t('fromPrice', { price: formatPkr(lowestVariantPrice) })}
                    </span>
                  ) : hasDiscount ? (
                    <div className='flex items-baseline gap-1.5'>
                      <span className='text-sm sm:text-base font-black text-rose-600 dark:text-rose-400'>
                        {formatPkr(effectiveBasePrice)}
                      </span>
                      <span className='line-through text-xs text-muted-foreground/70'>
                        {originalPrice !== null ? formatPkr(originalPrice) : null}
                      </span>
                      <span className='rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1 py-0.2 text-[9px] font-extrabold'>
                        {discountPercent}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className='text-sm sm:text-base font-bold text-foreground'>
                      {formatPkr(effectiveBasePrice)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div>
                  {!item.isAvailable ? (
                    <span className='text-xs text-muted-foreground font-medium'>
                      {t('unavailable')}
                    </span>
                  ) : hasVariants ? (
                    <button
                      type='button'
                      onClick={() => onSelectVariant(item)}
                      className='relative inline-flex h-8 items-center gap-1.5 rounded-xl bg-rose-500/10 px-3 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer'
                    >
                      <span>{t('chooseOptions')}</span>
                      {totalItemQtyInCart > 0 && (
                        <span className='flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] text-white'>
                          {totalItemQtyInCart}
                        </span>
                      )}
                    </button>
                  ) : totalItemQtyInCart === 0 ? (
                    <button
                      type='button'
                      onClick={handleSimpleAdd}
                      className='inline-flex h-8 items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-3 text-xs font-bold text-white hover:opacity-95 transition-opacity cursor-pointer shadow-xs'
                    >
                      <IconPlus className='h-3.5 w-3.5' />
                      <span>{t('add')}</span>
                    </button>
                  ) : (
                    <div className='flex items-center gap-1.5 rounded-xl bg-rose-500/10 p-0.5'>
                      <button
                        type='button'
                        onClick={() => handleQuantityStep(-1)}
                        className='flex h-7 w-7 items-center justify-center rounded-lg bg-card text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs'
                        aria-label='Decrease quantity'
                      >
                        <IconMinus className='h-3.5 w-3.5' />
                      </button>
                      <span className='w-5 text-center text-xs font-bold text-rose-600'>
                        {totalItemQtyInCart}
                      </span>
                      <button
                        type='button'
                        onClick={() => handleQuantityStep(1)}
                        className='flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white hover:opacity-90 transition-opacity cursor-pointer shadow-2xs'
                        aria-label='Increase quantity'
                      >
                        <IconPlus className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
