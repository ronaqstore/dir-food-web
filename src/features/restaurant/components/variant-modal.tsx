'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { formatPkr } from '@/lib/money';
import { IconCheck, IconX } from '@/components/icons';
import { useCart } from '@/features/cart/context/cart-context';

import type { VariantModalProps } from '../types';

export function VariantModal({ restaurant, item, onClose }: VariantModalProps) {
  const t = useTranslations('menu');
  const tc = useTranslations('common');
  const { addItem, getItemQuantity } = useCart();

  const [selectedVariantId, setSelectedVariantId] = React.useState<string | null>(null);

  const activeVariant = React.useMemo(() => {
    if (!item || item.variants.length === 0) return null;
    if (selectedVariantId) {
      const found = item.variants.find((v) => v.id === selectedVariantId);
      if (found) return found;
    }
    return item.variants[0] ?? null;
  }, [item, selectedVariantId]);

  const handleClose = React.useCallback(() => {
    setSelectedVariantId(null);
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, handleClose]);

  if (!item) return null;

  const handleAddToCart = () => {
    if (!activeVariant) return;
    addItem({
      restaurant,
      item: {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: activeVariant.price
      },
      variant: activeVariant,
      quantity: 1
    });
    setSelectedVariantId(null);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150'>
      <button
        type='button'
        aria-label={tc('close')}
        tabIndex={-1}
        onClick={handleClose}
        className='fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer border-0 p-0'
      />
      <dialog
        open
        aria-labelledby='variant-modal-title'
        className='relative z-10 w-full max-w-md rounded-t-3xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xl animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 text-card-foreground block m-0'
      >
        {}
        <div className='flex items-start justify-between pb-3 border-b border-border'>
          <div className='flex gap-3'>
            {item.imageUrl && (
              <div className='relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-muted'>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes='56px'
                  className='object-cover'
                />
              </div>
            )}
            <div>
              <h2
                id='variant-modal-title'
                className='text-base font-bold text-foreground line-clamp-1'
              >
                {item.name}
              </h2>
              <p className='text-xs text-muted-foreground mt-0.5'>{t('selectOption')}</p>
            </div>
          </div>
          <button
            type='button'
            onClick={handleClose}
            className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
            aria-label={tc('close')}
          >
            <IconX className='h-4 w-4' />
          </button>
        </div>

        <div className='my-4 max-h-[50vh] overflow-y-auto space-y-2 pe-1'>
          {item.variants.map((variant) => {
            const isSelected = activeVariant?.id === variant.id;
            const currentQty = getItemQuantity(item.id, variant.id);

            return (
              <button
                key={variant.id}
                type='button'
                onClick={() => setSelectedVariantId(variant.id)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl p-3.5 text-sm transition-all border text-start ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs'
                    : 'border-border/80 bg-card hover:bg-muted/60 text-foreground'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/40'
                    }`}
                  >
                    {isSelected && <IconCheck className='h-3 w-3 stroke-[3]' />}
                  </div>
                  <div>
                    <span className='text-sm font-medium'>{variant.name}</span>
                    {currentQty > 0 && (
                      <span className='ms-2 inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground'>
                        {currentQty} {t('inCart')}
                      </span>
                    )}
                  </div>
                </div>

                <span className='text-sm font-bold text-foreground'>
                  {formatPkr(variant.price)}
                </span>
              </button>
            );
          })}
        </div>

        {}
        <div className='pt-2'>
          <button
            type='button'
            disabled={!activeVariant}
            onClick={handleAddToCart}
            className='flex h-12 w-full items-center justify-between rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer'
          >
            <span>{t('addToCart')}</span>
            <span>{activeVariant ? formatPkr(activeVariant.price) : ''}</span>
          </button>
        </div>
      </dialog>
    </div>
  );
}
