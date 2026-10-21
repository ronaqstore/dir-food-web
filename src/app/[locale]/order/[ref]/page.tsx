'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  useOrderIntent,
  useRecordWhatsAppOpened
} from '@/features/checkout/api/order-intent-query';
import { formatPkr } from '@/lib/money';
import {
  IconBrandWhatsapp,
  IconCircleCheck,
  IconCopy,
  IconCheck,
  IconArrowRight,
  IconMapPin,
  IconBuildingStore,
  IconAlertTriangle,
  IconLoader2
} from '@tabler/icons-react';

export default function OrderPage() {
  const t = useTranslations('order');
  const params = useParams();
  const rawRef = params?.ref;
  const ref = Array.isArray(rawRef) ? rawRef[0] : (rawRef as string);

  const { data: order, isLoading, error } = useOrderIntent(ref || null);
  const recordOpenedMutation = useRecordWhatsAppOpened();

  const [copiedRef, setCopiedRef] = React.useState(false);
  const [copiedMessage, setCopiedMessage] = React.useState(false);

  const handleCopyRef = async () => {
    if (!order?.reference) return;
    try {
      await navigator.clipboard.writeText(order.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } catch {
      // clipboard write error fallback
    }
  };

  const handleCopyMessage = async () => {
    if (!order?.message) return;
    try {
      await navigator.clipboard.writeText(order.message);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      // clipboard write error fallback
    }
  };

  const handleOpenWhatsApp = () => {
    if (!order?.whatsappUrl || !order?.reference) return;
    // Track click analytics
    recordOpenedMutation.mutate(order.reference);
    // Open WhatsApp
    window.open(order.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className='min-h-[75vh] flex items-center justify-center bg-background py-16'>
        <div className='flex flex-col items-center gap-3 text-muted-foreground'>
          <IconLoader2 className='size-8 animate-spin text-primary' />
          <p className='text-sm font-medium'>{t('loadingOrder')}</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='min-h-[75vh] flex items-center justify-center bg-background py-16 px-4'>
        <div className='max-w-md text-center space-y-4'>
          <div className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive'>
            <IconAlertTriangle className='size-7' />
          </div>
          <h1 className='text-xl font-bold text-foreground'>{t('notFoundTitle')}</h1>
          <p className='text-xs text-muted-foreground'>{t('notFoundDesc')}</p>
          <div className='pt-2'>
            <Link
              href='/restaurants'
              className='inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground'
            >
              <span>{t('browseRestaurants')}</span>
              <IconArrowRight className='size-4 rtl:rotate-180' />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const grandTotal = order.subtotal + (order.delivery.fee ?? 0);

  return (
    <div className='min-h-[85vh] bg-muted/20 py-8 sm:py-12'>
      <div className='mx-auto max-w-2xl px-4 sm:px-6 space-y-6'>
        {/* Success Card Header */}
        <div className='rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 via-card to-card p-6 sm:p-8 text-center shadow-xs space-y-4'>
          <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'>
            <IconCircleCheck className='size-10 stroke-[2.2]' />
          </div>

          <div className='space-y-1'>
            <h1 className='text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl'>
              {t('orderPlacedTitle')}
            </h1>
            <p className='text-xs sm:text-sm text-muted-foreground max-w-md mx-auto'>
              {t('orderPlacedSubtitle')}
            </p>
          </div>

          {/* Reference Code Box */}
          <div className='inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-2.5 shadow-xs'>
            <div>
              <p className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                {t('orderRefLabel')}
              </p>
              <p className='font-mono text-lg font-black text-foreground'>{order.reference}</p>
            </div>
            <button
              type='button'
              onClick={handleCopyRef}
              className='flex size-9 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
              title={t('copyRef')}
              aria-label={t('copyRef')}
            >
              {copiedRef ? (
                <IconCheck className='size-4 text-emerald-600' />
              ) : (
                <IconCopy className='size-4' />
              )}
            </button>
          </div>

          {/* Big WhatsApp CTA Button */}
          <div className='pt-2 space-y-2'>
            <button
              type='button'
              onClick={handleOpenWhatsApp}
              className='flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] py-4 px-6 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all'
            >
              <IconBrandWhatsapp className='size-6' />
              <span>{t('openWhatsAppBtn')}</span>
            </button>
            <p className='text-xs text-muted-foreground'>{t('whatsAppNotice')}</p>
          </div>
        </div>

        {/* Fallback Copy Message Card */}
        <div className='rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-2.5 text-xs'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-foreground'>{t('cantOpenWhatsApp')}</span>
            <button
              type='button'
              onClick={handleCopyMessage}
              className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors'
            >
              {copiedMessage ? (
                <>
                  <IconCheck className='size-3.5 text-emerald-600' />
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <IconCopy className='size-3.5' />
                  <span>{t('copyMessage')}</span>
                </>
              )}
            </button>
          </div>
          <p className='text-muted-foreground'>{t('copyMessageHint')}</p>
        </div>

        {/* Order Details Breakdown Card */}
        <div className='rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4'>
          <h2 className='text-sm font-bold text-foreground border-b border-border pb-3'>
            {t('detailsTitle')}
          </h2>

          {/* Restaurant & Delivery Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs'>
            <div className='flex items-start gap-2.5'>
              <IconBuildingStore className='size-4 text-primary shrink-0 mt-0.5' />
              <div>
                <p className='font-semibold text-foreground'>{order.restaurant.name}</p>
                <p className='text-muted-foreground'>{t('timergaraLowerDir')}</p>
              </div>
            </div>

            <div className='flex items-start gap-2.5'>
              <IconMapPin className='size-4 text-primary shrink-0 mt-0.5' />
              <div>
                <p className='font-semibold text-foreground'>{order.delivery.areaName}</p>
                <p className='text-muted-foreground'>{order.delivery.landmark}</p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className='border-t border-border pt-3 space-y-2.5'>
            {order.items.map((item, idx) => (
              <div key={idx} className='flex items-center justify-between text-xs'>
                <div className='flex items-center gap-2 min-w-0'>
                  <span className='font-bold text-foreground'>{item.quantity}×</span>
                  <span className='text-foreground truncate'>{item.name}</span>
                  {item.variant ? (
                    <span className='rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground'>
                      {item.variant}
                    </span>
                  ) : null}
                </div>
                <span className='font-semibold text-foreground shrink-0'>
                  {formatPkr(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Financials */}
          <div className='border-t border-border pt-3 space-y-1.5 text-xs'>
            <div className='flex justify-between text-muted-foreground'>
              <span>{t('subtotal')}</span>
              <span className='font-semibold text-foreground'>{formatPkr(order.subtotal)}</span>
            </div>
            <div className='flex justify-between text-muted-foreground'>
              <span>{t('deliveryFee')}</span>
              <span className='font-semibold text-foreground'>
                {order.delivery.fee !== null ? (
                  order.delivery.fee === 0 ? (
                    t('free')
                  ) : (
                    formatPkr(order.delivery.fee)
                  )
                ) : (
                  <span>{t('confirmViaWhatsApp')}</span>
                )}
              </span>
            </div>
            <div className='flex justify-between items-baseline border-t border-border pt-2 text-sm font-bold text-foreground'>
              <span>{t('total')}</span>
              <span className='text-base font-extrabold text-primary'>{formatPkr(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className='text-center pt-2'>
          <Link
            href='/restaurants'
            className='inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline'
          >
            <span>{t('backToRestaurants')}</span>
            <IconArrowRight className='size-3.5 rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </div>
  );
}
