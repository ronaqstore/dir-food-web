'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { StoreHeader } from './store-header';
import { CategoryNav } from './category-nav';
import { MenuItemCard } from './menu-item-card';
import { FeaturedDealsCarousel } from './featured-deals-carousel';
import { VariantModal } from './variant-modal';
import { DealDetailModal } from './deal-detail-modal';
import { useRestaurantMenuQuery, useRestaurantProfileQuery } from '../api/queries';
import type { PublicMenuCategory, PublicMenuItem, PublicRestaurantProfile } from '../api/types';
import type { CartRestaurant } from '@/features/cart/types';

interface StorefrontMenuProps {
  restaurant: PublicRestaurantProfile;
  categories: PublicMenuCategory[];
}

export function StorefrontMenu({
  restaurant: initialRestaurant,
  categories: initialCategories
}: StorefrontMenuProps) {
  const t = useTranslations('menu');

  const { data: profileData } = useRestaurantProfileQuery(
    initialRestaurant.slug,
    initialRestaurant
  );
  const restaurant = profileData ?? initialRestaurant;

  const { data: menuData } = useRestaurantMenuQuery(restaurant.slug, {
    categories: initialCategories
  });

  const categories = menuData?.categories ?? initialCategories;

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | undefined>(
    initialCategories[0]?.id
  );
  const [selectedVariantItem, setSelectedVariantItem] = React.useState<PublicMenuItem | null>(null);
  const [selectedDealItem, setSelectedDealItem] = React.useState<PublicMenuItem | null>(null);

  const activeCategoryId =
    selectedCategoryId && categories.some((c) => c.id === selectedCategoryId)
      ? selectedCategoryId
      : categories[0]?.id;

  const cartRestaurant: CartRestaurant = React.useMemo(
    () => ({
      slug: restaurant.slug,
      name: restaurant.name,
      logoUrl: restaurant.logoUrl,
      minOrderAmount: restaurant.minOrderAmount
    }),
    [restaurant.slug, restaurant.name, restaurant.logoUrl, restaurant.minOrderAmount]
  );

  const dealItems = React.useMemo(() => {
    const deals: PublicMenuItem[] = [];
    const seen = new Set<string>();
    for (const cat of categories) {
      for (const item of cat.items) {
        const effectivePrice = item.price ?? item.basePrice ?? 0;
        const isEligibleDeal =
          item.isDeal ||
          (item.originalPrice != null && effectivePrice > 0 && item.originalPrice > effectivePrice);

        if (isEligibleDeal && !seen.has(item.id)) {
          seen.add(item.id);
          deals.push(item);
        }
      }
    }
    return deals;
  }, [categories]);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <StoreHeader restaurant={restaurant} />

      {/* Featured Deals Carousel (Zomato / Foodpanda Style) */}
      <FeaturedDealsCarousel
        restaurant={cartRestaurant}
        deals={dealItems}
        onSelectVariant={setSelectedVariantItem}
        onOpenDeal={setSelectedDealItem}
      />

      {/* Sticky Categories */}
      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      {/* Categories & Dishes */}
      <div className='space-y-10 pt-2'>
        {categories.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground text-sm'>
            {t('noMenuItems')}
          </div>
        ) : (
          categories.map((category) => (
            <section key={category.id} id={`cat-${category.id}`} className='scroll-mt-28 space-y-4'>
              <div className='flex items-center justify-between border-b border-border/60 pb-2'>
                <h3 className='text-lg font-black text-foreground tracking-tight'>
                  {category.name}
                </h3>
                <span className='text-xs text-muted-foreground font-medium'>
                  {category.items.length} {t('dishes')}
                </span>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4'>
                {category.items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    restaurant={cartRestaurant}
                    item={item}
                    onSelectVariant={setSelectedVariantItem}
                    onOpenDeal={setSelectedDealItem}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Variant Selection Modal (Fast food sizes / Portions) */}
      <VariantModal
        restaurant={cartRestaurant}
        item={selectedVariantItem}
        onClose={() => setSelectedVariantItem(null)}
      />

      {/* KFC / Foodpanda Style Deal Breakdown Modal */}
      <DealDetailModal
        restaurant={cartRestaurant}
        item={selectedDealItem}
        onClose={() => setSelectedDealItem(null)}
      />
    </div>
  );
}
