import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CheckoutView } from '@/features/checkout/components/checkout-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkout');
  return {
    title: t('checkoutTitle'),
    description: t('checkoutSubtitle')
  };
}

export default function CheckoutPage() {
  return <CheckoutView />;
}
