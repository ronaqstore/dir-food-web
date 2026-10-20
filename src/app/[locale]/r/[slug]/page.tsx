import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { restaurantService } from '@/features/restaurant/api/restaurant.service';
import { StorefrontMenu } from '@/features/restaurant/components/storefront-menu';
import { Link } from '@/i18n/navigation';
import { IconArrowLeft, IconBuildingStore } from '@/components/icons';

interface RestaurantPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const restaurant = await restaurantService.getProfile(slug);
    return {
      title: `${restaurant.name} — Menu & WhatsApp Ordering | Dir Food`,
      description:
        restaurant.description ||
        `Order food from ${restaurant.name} in Timergara & Lower Dir via WhatsApp.`
    };
  } catch {
    return {
      title: 'Restaurant Menu | Dir Food'
    };
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  let restaurant;
  let menu;

  try {
    [restaurant, menu] = await Promise.all([
      restaurantService.getProfile(slug),
      restaurantService.getMenu(slug)
    ]);
  } catch {
    // If not found in backend or inactive
    return (
      <div className='mx-auto max-w-3xl px-4 py-16 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4'>
          <IconBuildingStore className='h-8 w-8' />
        </div>
        <h2 className='text-xl font-bold text-foreground'>{t('restaurant.notFound')}</h2>
        <p className='mt-2 text-xs text-muted-foreground'>{t('restaurant.notFoundDesc')}</p>
        <Link
          href='/restaurants'
          className='mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity'
        >
          <IconArrowLeft className='h-4 w-4' />
          <span>{t('directory.viewAll')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6'>
      {/* Back to Directory Link */}
      <div className='mb-4'>
        <Link
          href='/restaurants'
          className='inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors'
        >
          <IconArrowLeft className='h-4 w-4' />
          <span>{t('nav.restaurants')}</span>
        </Link>
      </div>

      {/* Storefront Layout */}
      <StorefrontMenu restaurant={restaurant} categories={menu.categories} />
    </div>
  );
}
