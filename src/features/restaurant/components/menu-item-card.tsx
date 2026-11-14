'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconMinus, IconPlus } from '@/components/icons';
import { useCart } from '@/features/cart/context/cart-context';
import { parseDealDescription } from '../utils/deal-parser';

import type { MenuItemCardProps } from '../types';

export function MenuItemCard({
  restaurant,
  item,
  onSelectVariant,
  onOpenDeal
}: MenuItemCardProps) {
  const t = useTranslations('menu');
  const tc = useTranslations('common');
  const { addItem, updateQuantity, getItemQuantity, items } = useCart();

  const hasVariants = Boolean(item.variants && item.variants.length > 0);
  const hasAddons = Boolean(item.addons && item.addons.length > 0);
  const needsCustomization = hasVariants || hasAddons;

  const totalItemQtyInCart = React.useMemo(() => {
    return items.filter((i) => i.itemId === item.id).reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items, item.id]);

  const lowestVariantPrice = React.useMemo(() => {
    if (!hasVariants) return 0;
    return Math.min(...item.variants.map((v) => v.price));
  }, [hasVariants, item.variants]);

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

  const parsedDetails = item.isDeal ? parseDealDescription(item.description) : null;

  return (
    <div
      className={`group flex items-start justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 transition-all duration-150 ${
        item.isAvailable
          ? 'border-border/80 bg-card hover:border-primary/40 hover:shadow-xs'
          : 'border-border/40 bg-muted/30 opacity-75'
      }`}
    >
      {}
      <div className='flex flex-1 flex-col pe-2'>
        <div className='flex items-center gap-1.5 flex-wrap'>
          {item.isDeal && onOpenDeal ? (
            <button
              type='button'
              onClick={() => onOpenDeal(item)}
              className='text-sm sm:text-base font-bold text-foreground hover:text-rose-600 transition-colors text-start cursor-pointer line-clamp-1'
            >
              {item.name}
            </button>
          ) : (
            <h4 className='text-sm sm:text-base font-bold text-foreground line-clamp-1'>
              {item.name}
            </h4>
          )}
          {item.isDeal && (
            <button
              type='button'
              onClick={onOpenDeal ? () => onOpenDeal(item) : undefined}
              className='shrink-0 rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-0.5 cursor-pointer hover:bg-rose-500/20 transition-colors'
            >
              <span>🔥</span>
              <span>{t('hotDeal')}</span>
            </button>
          )}
          {!item.isAvailable && (
            <span className='shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground'>
              {t('soldOut')}
            </span>
          )}
        </div>

        {item.description && (
          <p className='mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
            {item.description}
          </p>
        )}

        {}
        {parsedDetails && parsedDetails.items.length > 0 && (
          <button
            type='button'
            onClick={onOpenDeal ? () => onOpenDeal(item) : undefined}
            className='mt-2 flex flex-wrap gap-1 text-start cursor-pointer group/combo'
          >
            {parsedDetails.items.slice(0, 3).map((ci, idx) => (
              <span
                key={idx}
                className='inline-flex items-center gap-1 rounded-md bg-muted/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground'
              >
                <span>{ci.emoji}</span>
                <span className='truncate max-w-[100px]'>{ci.name}</span>
              </span>
            ))}
            {parsedDetails.items.length > 3 && (
              <span className='inline-flex items-center rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 group-hover/combo:underline'>
                +{parsedDetails.items.length - 3} {tc('more')}
              </span>
            )}
          </button>
        )}

        {}
        <div className='mt-3 flex items-center justify-between gap-2'>
          <div>
            {hasVariants ? (
              <span className='text-xs sm:text-sm font-bold text-foreground'>
                {t('fromPrice', { price: formatPkr(lowestVariantPrice) })}
              </span>
            ) : hasDiscount ? (
              <div className='flex items-baseline gap-1.5 flex-wrap'>
                <span className='text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400'>
                  {formatPkr(effectiveBasePrice)}
                </span>
                <span className='line-through text-[11px] text-muted-foreground/70'>
                  {originalPrice !== null ? formatPkr(originalPrice) : null}
                </span>
                <span className='rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1 py-0.2 text-[9px] font-bold'>
                  {t('off', { percent: discountPercent })}
                </span>
              </div>
            ) : (
              <span className='text-xs sm:text-sm font-bold text-foreground'>
                {formatPkr(effectiveBasePrice)}
              </span>
            )}
          </div>

          {}
          <div>
            {!item.isAvailable ? (
              <span className='text-xs text-muted-foreground font-medium'>{t('unavailable')}</span>
            ) : needsCustomization ? (
              <button
                type='button'
                onClick={() => onSelectVariant(item)}
                className='relative inline-flex h-8 items-center gap-1.5 rounded-xl bg-primary/10 px-3 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer'
              >
                <span>{t('chooseOptions')}</span>
                {totalItemQtyInCart > 0 && (
                  <span className='flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white'>
                    {totalItemQtyInCart}
                  </span>
                )}
              </button>
            ) : totalItemQtyInCart === 0 ? (
              <button
                type='button'
                onClick={handleSimpleAdd}
                className='inline-flex h-8 items-center gap-1 rounded-xl bg-primary px-3 text-xs font-bold text-primary-foreground hover:opacity-95 transition-opacity cursor-pointer shadow-xs'
              >
                <IconPlus className='h-3.5 w-3.5' />
                <span>{t('add')}</span>
              </button>
            ) : (
              <div className='flex items-center gap-2 rounded-xl bg-primary/10 p-0.5'>
                <button
                  type='button'
                  onClick={() => handleQuantityStep(-1)}
                  className='flex h-7 w-7 items-center justify-center rounded-lg bg-card text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs'
                  aria-label={t('decreaseQty')}
                >
                  <IconMinus className='h-3.5 w-3.5' />
                </button>
                <span className='w-5 text-center text-xs font-bold text-primary'>
                  {totalItemQtyInCart}
                </span>
                <button
                  type='button'
                  onClick={() => handleQuantityStep(1)}
                  className='flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shadow-2xs'
                  aria-label={t('increaseQty')}
                >
                  <IconPlus className='h-3.5 w-3.5' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {item.imageUrl && (
        <div className='relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-muted'>
          {item.isDeal && onOpenDeal ? (
            <button
              type='button'
              onClick={() => onOpenDeal(item)}
              className='relative size-full cursor-pointer focus:outline-hidden'
              aria-label={item.name}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes='96px'
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />
            </button>
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes='96px'
              className='object-cover group-hover:scale-105 transition-transform duration-300'
            />
          )}
          {hasDiscount && (
            <div className='absolute bottom-1 inset-e-1 rounded-md bg-rose-600/95 text-white px-1.5 py-0.5 text-[9px] font-black shadow-xs backdrop-blur-xs pointer-events-none'>
              {t('off', { percent: discountPercent })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
