import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CartView } from '@/features/cart/components/cart-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cart');
  return {
    title: t('cartTitle'),
    description: t('cartSubtitle')
  };
}

export default function CartPage() {
  return <CartView />;
}
