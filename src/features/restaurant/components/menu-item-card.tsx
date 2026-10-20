'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconMinus, IconPlus, IconShoppingCart } from '@/components/icons';
import type { PublicMenuItem } from '../api/types';
import type { CartRestaurant } from '@/features/cart/types';
import { useCart } from '@/features/cart/context/cart-context';

interface MenuItemCardProps {
  restaurant: CartRestaurant;
  item: PublicMenuItem;
  onSelectVariant: (item: PublicMenuItem) => void;
}

export function MenuItemCard({ restaurant, item, onSelectVariant }: MenuItemCardProps) {
  const t = useTranslations('menu');
  const { addItem, updateQuantity, getItemQuantity, items } = useCart();

  const hasVariants = item.variants && item.variants.length > 0;

  // Calculate total in cart for this item
  const totalItemQtyInCart = React.useMemo(() => {
    return items.filter((i) => i.itemId === item.id).reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items, item.id]);

  const lowestVariantPrice = React.useMemo(() => {
    if (!hasVariants) return 0;
    return Math.min(...item.variants.map((v) => v.price));
  }, [hasVariants, item.variants]);

  const effectiveBasePrice = item.price ?? item.basePrice ?? 0;

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
      className={`group flex items-start justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 transition-all duration-150 ${
        item.isAvailable
          ? 'border-border/80 bg-card hover:border-primary/40 hover:shadow-xs'
          : 'border-border/40 bg-muted/30 opacity-75'
      }`}
    >
      {/* Left: Info & Pricing */}
      <div className='flex flex-1 flex-col pe-2'>
        <div className='flex items-center gap-2'>
          <h4 className='text-sm sm:text-base font-bold text-foreground line-clamp-1'>
            {item.name}
          </h4>
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

        {/* Price & Action row */}
        <div className='mt-3 flex items-center justify-between gap-2'>
          <div>
            {hasVariants ? (
              <span className='text-xs sm:text-sm font-bold text-foreground'>
                {t('fromPrice', { price: formatPkr(lowestVariantPrice) })}
              </span>
            ) : (
              <span className='text-xs sm:text-sm font-bold text-foreground'>
                {formatPkr(effectiveBasePrice)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div>
            {!item.isAvailable ? (
              <span className='text-xs text-muted-foreground font-medium'>{t('unavailable')}</span>
            ) : hasVariants ? (
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
              /* Inline stepper when item is already added */
              <div className='flex items-center gap-2 rounded-xl bg-primary/10 p-0.5'>
                <button
                  type='button'
                  onClick={() => handleQuantityStep(-1)}
                  className='flex h-7 w-7 items-center justify-center rounded-lg bg-card text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs'
                  aria-label='Decrease quantity'
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
                  aria-label='Increase quantity'
                >
                  <IconPlus className='h-3.5 w-3.5' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Dish Photo */}
      {item.imageUrl && (
        <div className='relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-muted'>
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes='96px'
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>
      )}
    </div>
  );
}
