import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OrderStatusView } from '@/features/checkout/components/order-status-view';
import type { OrderPageProps } from '@/features/checkout/types';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('order');
  return {
    title: t('orderPlacedTitle'),
    description: t('orderPlacedSubtitle')
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  return <OrderStatusView refCode={resolvedParams.ref} />;
}
