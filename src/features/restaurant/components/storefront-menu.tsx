'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { StoreHeader } from './store-header';
import { CategoryNav } from './category-nav';
import { MenuItemCard } from './menu-item-card';
import { VariantModal } from './variant-modal';
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

  return (
    <div className='space-y-6'>
      {/* Header */}
      <StoreHeader restaurant={restaurant} />

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
    </div>
  );
}
