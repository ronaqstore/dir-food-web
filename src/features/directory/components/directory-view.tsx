'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useArea } from '../context/area-context';
import { usePublicRestaurantsQuery } from '../api/queries';
import { DirectoryFilters } from './directory-filters';
import { RestaurantGrid } from './restaurant-grid';
import { IconMapPin } from '@/components/icons';
import type { PublicRestaurantCard } from '../api/types';

interface DirectoryViewProps {
  initialCuisine?: string;
  limit?: number;
  showFilters?: boolean;
}

export function DirectoryView({
  initialCuisine,
  limit: initialLimit = 20,
  showFilters = true
}: DirectoryViewProps) {
  const t = useTranslations('directory');
  const { selectedCity, selectedArea, openAreaModal } = useArea();

  const [currentLimit, setCurrentLimit] = React.useState(initialLimit);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState<string | undefined>(initialCuisine);
  const [openNowOnly, setOpenNowOnly] = React.useState(false);

  // Debounced search query
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryParams = React.useMemo(
    () => ({
      cityId: selectedCity?.id,
      areaId: selectedArea?.id,
      cuisine: selectedCuisine,
      q: debouncedSearch.trim().length >= 2 ? debouncedSearch.trim() : undefined,
      openNow: openNowOnly ? true : undefined,
      limit: currentLimit
    }),
    [selectedCity?.id, selectedArea?.id, selectedCuisine, debouncedSearch, openNowOnly, currentLimit]
  );

  const { data, isLoading } = usePublicRestaurantsQuery(queryParams);

  const restaurantList = React.useMemo<PublicRestaurantCard[]>(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as PublicRestaurantCard[];
    if (Array.isArray((data as { data?: unknown }).data)) {
      return (data as { data: PublicRestaurantCard[] }).data;
    }
    return [];
  }, [data]);

  const totalCount = (data as { meta?: { total?: number } })?.meta?.total ?? restaurantList.length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine(undefined);
    setOpenNowOnly(false);
  };

  const hasActiveFilters = Boolean(searchQuery || selectedCuisine || openNowOnly || selectedArea);

  return (
    <div className='space-y-6'>
      {/* Area banner status */}
      <div className='flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border/60'>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>{t('deliveringTo')}</span>
          <button
            type='button'
            onClick={openAreaModal}
            className='inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors cursor-pointer'
          >
            <IconMapPin className='h-3.5 w-3.5' />
            <span suppressHydrationWarning>
              {selectedArea
                ? selectedCity
                  ? `${selectedArea.name}, ${selectedCity.name}`
                  : selectedArea.name
                : selectedCity
                  ? `All ${selectedCity.name}`
                  : t('allAreas')}
            </span>
          </button>
        </div>

        {totalCount > 0 && (
          <span className='text-xs text-muted-foreground font-medium'>
            {t('totalCount', { count: totalCount })}
          </span>
        )}
      </div>

      {/* Filters (Search & Cuisines) */}
      {showFilters && (
        <DirectoryFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCuisine={selectedCuisine}
          onCuisineSelect={setSelectedCuisine}
          openNowOnly={openNowOnly}
          onOpenNowToggle={setOpenNowOnly}
        />
      )}

      {/* Restaurant Grid */}
      <RestaurantGrid
        restaurants={restaurantList}
        isLoading={isLoading}
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />

      {/* Load More Restaurants if more exist */}
      {!isLoading && restaurantList.length < totalCount && (
        <div className='flex justify-center pt-4'>
          <button
            type='button'
            onClick={() => setCurrentLimit((prev) => prev + 20)}
            className='inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground shadow-xs hover:border-primary/40 hover:bg-muted transition-all cursor-pointer'
          >
            {t('loadMore')} ({restaurantList.length} / {totalCount})
          </button>
        </div>
      )}
    </div>
  );
}
