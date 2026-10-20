'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/features/cart/context/cart-context';
import { useArea } from '@/features/directory/context/area-context';
import { useValidateCart } from '@/features/cart/api/cart-query';
import type { ValidateCartRequest } from '@/features/cart/types';
import { CartEmptyState } from '@/features/cart/components/cart-empty-state';
import { CartItemList } from '@/features/cart/components/cart-item-list';
import { CartAreaCard } from '@/features/cart/components/cart-area-card';
import { CartMinOrderAlert } from '@/features/cart/components/cart-min-order-alert';
import { CartValidationBanner } from '@/features/cart/components/cart-validation-banner';
import { CartSummary } from '@/features/cart/components/cart-summary';

export default function CartPage() {
  const t = useTranslations('cart');
  const { restaurant, items, subtotal } = useCart();
  const { selectedArea } = useArea();

  const restaurantSlug = restaurant?.slug;
  const selectedAreaId = selectedArea?.id;

  const validationRequest = React.useMemo<ValidateCartRequest | null>(() => {
    if (!restaurantSlug || items.length === 0) return null;
    return {
      restaurantSlug,
      items: items.map((i) => ({
        menuItemId: i.itemId,
        variantId: i.variantId || null,
        quantity: i.quantity
      })),
      deliveryAreaId: selectedAreaId || null
    };
  }, [restaurantSlug, items, selectedAreaId]);

  const { data: validationData, isLoading: isValidating } = useValidateCart(validationRequest);

  if (!restaurant || items.length === 0) {
    return (
      <main className='min-h-[70vh] bg-background py-8 sm:py-12'>
        <div className='mx-auto max-w-4xl px-4'>
          <CartEmptyState />
        </div>
      </main>
    );
  }

  // Determine effective minimum order amount:
  // Prefer validated area minimum, fallback to restaurant initial minimum
  const effectiveMinOrder =
    validationData?.minOrderAmount !== undefined
      ? validationData.minOrderAmount
      : (restaurant.minOrderAmount ?? null);

  const hasCriticalErrors = Boolean(
    validationData?.problems &&
    validationData.problems.some(
      (p) => !p.toLowerCase().includes('minimum order') && !p.toLowerCase().includes('not served')
    )
  );

  return (
    <main className='min-h-[80vh] bg-muted/20 py-6 sm:py-10'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        {/* Page Title */}
        <div className='mb-6'>
          <h1 className='text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl'>
            {t('cartTitle')}
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>{t('cartSubtitle')}</p>
        </div>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
          {/* Main List & Controls */}
          <div className='lg:col-span-7 xl:col-span-8 space-y-4'>
            {/* Delivery Area Card */}
            <CartAreaCard delivery={validationData?.delivery} />

            {/* Validation Banner (Closed / Out of Stock) */}
            <CartValidationBanner
              restaurant={validationData?.restaurant}
              problems={validationData?.problems}
            />

            {/* Area Minimum Order Alert */}
            <CartMinOrderAlert
              subtotal={subtotal}
              minOrderAmount={effectiveMinOrder}
              areaName={selectedArea?.name}
            />

            {/* Items List */}
            <CartItemList />
          </div>

          {/* Sticky Summary & CTA */}
          <div className='lg:col-span-5 xl:col-span-4'>
            <CartSummary
              subtotal={subtotal}
              minOrderAmount={effectiveMinOrder}
              delivery={validationData?.delivery}
              restaurant={validationData?.restaurant}
              isValidating={isValidating}
              hasErrors={hasCriticalErrors}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
