'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/features/cart/context/cart-context';
import { useArea } from '@/features/directory/context/area-context';
import { useValidateCart } from '@/features/cart/api/cart-query';
import { useCreateOrderIntent } from '@/features/checkout/api/order-intent-query';
import type { CreateOrderIntentPayload } from '@/features/checkout/types';
import type { ValidateCartRequest } from '@/features/cart/types';
import {
  CheckoutContactForm,
  type CheckoutFormData
} from '@/features/checkout/components/checkout-contact-form';
import { CheckoutOrderSummary } from '@/features/checkout/components/checkout-order-summary';
import { CartMinOrderAlert } from '@/features/cart/components/cart-min-order-alert';
import { CartValidationBanner } from '@/features/cart/components/cart-validation-banner';
import { Link } from '@/i18n/navigation';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';

const CUSTOMER_STORAGE_KEY = 'dir_food_customer_info';

function getStoredCustomerInfo(): Partial<CheckoutFormData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<CheckoutFormData>) : {};
  } catch {
    return {};
  }
}

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { restaurant, items, subtotal, clearCart } = useCart();
  const { selectedArea } = useArea();

  const [formData, setFormData] = React.useState<CheckoutFormData>(() => {
    const saved = getStoredCustomerInfo();
    return {
      name: saved.name || '',
      phone: saved.phone || '',
      landmark: saved.landmark || '',
      directions: saved.directions || ''
    };
  });

  const [submitError, setSubmitError] = React.useState<string | null>(null);

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
  const createIntentMutation = useCreateOrderIntent();

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError(null);
  };

  if (!restaurant || items.length === 0) {
    return (
      <main className='min-h-[70vh] bg-background py-12'>
        <div className='mx-auto max-w-lg px-4 text-center'>
          <h2 className='text-xl font-bold text-foreground'>{t('noItemsTitle')}</h2>
          <p className='mt-2 text-sm text-muted-foreground'>{t('noItemsDesc')}</p>
          <div className='mt-6'>
            <Link
              href='/restaurants'
              className='inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground'
            >
              {t('backToRestaurants')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const effectiveMinOrder =
    validationData?.minOrderAmount !== undefined
      ? validationData.minOrderAmount
      : (restaurant.minOrderAmount ?? null);

  const isMinOrderMet = !effectiveMinOrder || subtotal >= effectiveMinOrder;
  const isRestaurantOpen = validationData?.restaurant?.isOpenNow ?? true;
  const hasAreaSelected = Boolean(selectedArea?.id);
  const hasLandmark = formData.landmark.trim().length >= 3;

  const isValidToSubmit =
    hasAreaSelected &&
    hasLandmark &&
    isMinOrderMet &&
    isRestaurantOpen &&
    !isValidating &&
    !createIntentMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidToSubmit || !selectedArea) return;

    setSubmitError(null);

    // Save contact info for future orders
    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          landmark: formData.landmark.trim(),
          directions: formData.directions.trim()
        })
      );
    } catch {
      // ignore local storage error
    }

    const payload: CreateOrderIntentPayload = {
      clientRequestId:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `req-${Date.now()}`,
      restaurantSlug: restaurant.slug,
      items: items.map((i) => ({
        menuItemId: i.itemId,
        variantId: i.variantId || null,
        quantity: i.quantity
      })),
      customer: {
        name: formData.name.trim() || undefined,
        phone: formData.phone.trim() || undefined
      },
      delivery: {
        areaId: selectedArea.id,
        landmark: formData.landmark.trim(),
        directions: formData.directions.trim() || undefined
      },
      expectedSubtotal: subtotal
    };

    try {
      const response = await createIntentMutation.mutateAsync(payload);
      // Empty local cart now that the order is registered
      clearCart();
      // Navigate to order confirmation
      router.push(`/order/${response.reference}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : t('failedToPlaceOrder');
      setSubmitError(message);
    }
  };

  return (
    <main className='min-h-[85vh] bg-muted/20 py-6 sm:py-10'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        {/* Navigation link back to cart */}
        <div className='mb-6'>
          <Link
            href='/cart'
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors'
          >
            <IconArrowLeft className='size-4 rtl:rotate-180' />
            <span>{t('backToCart')}</span>
          </Link>
          <h1 className='mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl'>
            {t('checkoutTitle')}
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>{t('checkoutSubtitle')}</p>
        </div>

        {submitError ? (
          <div className='mb-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-semibold text-destructive'>
            <IconAlertCircle className='size-5 shrink-0 mt-0.5' />
            <div className='flex-1'>
              <p className='font-bold text-sm'>{t('orderErrorTitle')}</p>
              <p className='mt-0.5 opacity-90'>{submitError}</p>
            </div>
          </div>
        ) : null}

        {/* Form and Summary Grid */}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'
        >
          {/* Main Delivery Details */}
          <div className='lg:col-span-7 xl:col-span-8 space-y-4'>
            {/* Validation & Warning Banners */}
            <CartValidationBanner
              restaurant={validationData?.restaurant}
              problems={validationData?.problems}
            />

            <CartMinOrderAlert
              subtotal={subtotal}
              minOrderAmount={effectiveMinOrder}
              areaName={selectedArea?.name}
            />

            <CheckoutContactForm
              formData={formData}
              onChange={handleFieldChange}
              disabled={createIntentMutation.isPending}
            />
          </div>

          {/* Sticky Summary & Submit */}
          <div className='lg:col-span-5 xl:col-span-4'>
            <CheckoutOrderSummary
              restaurant={restaurant}
              items={items}
              subtotal={subtotal}
              delivery={validationData?.delivery}
              isSubmitting={createIntentMutation.isPending}
              isValidToSubmit={isValidToSubmit}
              onSubmit={handleSubmit}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
