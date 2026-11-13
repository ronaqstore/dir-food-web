'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '../context/cart-context';
import { IconAlertCircle } from '@/components/icons';

export function RestaurantConflictModal() {
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const { restaurant, pendingConflict, resolveConflict } = useCart();

  React.useEffect(() => {
    if (!pendingConflict) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resolveConflict(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pendingConflict, resolveConflict]);

  if (!pendingConflict) return null;

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in duration-150'>
      <button
        type='button'
        aria-label={tc('close')}
        tabIndex={-1}
        onClick={() => resolveConflict(false)}
        className='fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer border-0 p-0'
      />
      <dialog
        open
        aria-labelledby='conflict-modal-title'
        className='relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150 text-card-foreground block m-0 text-center'
      >
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4'>
          <IconAlertCircle className='h-6 w-6' />
        </div>

        <h3 id='conflict-modal-title' className='text-base font-bold text-foreground'>
          {t('conflictTitle')}
        </h3>

        <p className='mt-2 text-xs text-muted-foreground leading-relaxed'>
          {t('conflictDesc', {
            current: restaurant?.name ?? 'another restaurant',
            next: pendingConflict.restaurant.name
          })}
        </p>

        <div className='mt-6 flex flex-col gap-2'>
          <button
            type='button'
            onClick={() => resolveConflict(true)}
            className='h-10 w-full rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer'
          >
            {t('conflictConfirm')}
          </button>
          <button
            type='button'
            onClick={() => resolveConflict(false)}
            className='h-10 w-full rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
          >
            {t('conflictCancel')}
          </button>
        </div>
      </dialog>
    </div>
  );
}
