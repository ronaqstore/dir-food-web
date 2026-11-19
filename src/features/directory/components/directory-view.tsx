'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useArea } from '../context/area-context';
import { usePublicRestaurantsQuery, usePublicCuisinesQuery } from '../api/queries';
import { DirectoryFilters } from './directory-filters';
import { RestaurantGrid } from './restaurant-grid';
import { IconMapPin } from '@/components/icons';
import type { DirectoryViewProps } from '../types';
import type { PublicRestaurantCard } from '../api/types';

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
  const [dealsOnly, setDealsOnly] = React.useState(false);
  const [under500Only, setUnder500Only] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('default');

  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  React.useEffect(() => {
    setCurrentLimit(initialLimit);
  }, [
    selectedCity?.id,
    selectedArea?.id,
    selectedCuisine,
    debouncedSearch,
    openNowOnly,
    dealsOnly,
    under500Only,
    sortBy,
    initialLimit
  ]);

  const queryParams = React.useMemo(
    () => ({
      cityId: selectedCity?.id,
      areaId: selectedArea?.id,
      cuisine: selectedCuisine,
      q: debouncedSearch.trim().length >= 1 ? debouncedSearch.trim() : undefined,
      openNow: openNowOnly ? true : undefined,
      hasDeals: dealsOnly ? true : undefined,
      sortBy: sortBy !== 'default' ? sortBy : undefined,
      limit: currentLimit
    }),
    [
      selectedCity?.id,
      selectedArea?.id,
      selectedCuisine,
      debouncedSearch,
      openNowOnly,
      dealsOnly,
      sortBy,
      currentLimit
    ]
  );

  const { data, isLoading } = usePublicRestaurantsQuery(queryParams);
  const { data: cuisinesData } = usePublicCuisinesQuery();

  const masterCuisines = React.useMemo(() => {
    if (Array.isArray(cuisinesData)) {
      return cuisinesData.map((c) => c.name);
    }
    return [];
  }, [cuisinesData]);

  const restaurantList = React.useMemo<PublicRestaurantCard[]>(() => {
    let list: PublicRestaurantCard[] = [];
    if (data) {
      if (Array.isArray(data)) list = data as PublicRestaurantCard[];
      else if (Array.isArray((data as { data?: unknown }).data)) {
        list = (data as { data: PublicRestaurantCard[] }).data;
      }
    }
    if (under500Only) {
      list = list.filter(
        (r) => r.minOrderAmount === null || r.minOrderAmount <= 50000
      );
    }
    return list;
  }, [data, under500Only]);

  const totalCount = under500Only
    ? restaurantList.length
    : (data as { meta?: { total?: number } })?.meta?.total ?? restaurantList.length;

  const availableCuisines = React.useMemo(() => {
    const set = new Set<string>();
    restaurantList.forEach((r) => {
      r.cuisines?.forEach((c) => {
        if (c && c.trim()) set.add(c.trim());
      });
    });
    return Array.from(set);
  }, [restaurantList]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine(undefined);
    setOpenNowOnly(false);
    setDealsOnly(false);
    setUnder500Only(false);
    setSortBy('default');
    setCurrentLimit(initialLimit);
  };

  const handleLoadMore = () => {
    setCurrentLimit((prev) => prev + 20);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedCuisine ||
      openNowOnly ||
      dealsOnly ||
      under500Only ||
      (sortBy && sortBy !== 'default') ||
      selectedArea
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border/60'>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>{t('deliveringTo')}</span>
          <button
            type='button'
            onClick={openAreaModal}
            suppressHydrationWarning
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

      {showFilters && (
        <DirectoryFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCuisine={selectedCuisine}
          onCuisineSelect={setSelectedCuisine}
          openNowOnly={openNowOnly}
          onOpenNowToggle={setOpenNowOnly}
          dealsOnly={dealsOnly}
          onDealsToggle={setDealsOnly}
          under500Only={under500Only}
          onUnder500Toggle={setUnder500Only}
          onResetAll={handleResetFilters}
          availableCuisines={availableCuisines}
          masterCuisines={masterCuisines}
        />
      )}

      <RestaurantGrid
        restaurants={restaurantList}
        isLoading={isLoading}
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />

      {!isLoading && restaurantList.length < totalCount && (
        <div className='flex justify-center pt-4'>
          <button
            type='button'
            onClick={handleLoadMore}
            suppressHydrationWarning
            className='inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground shadow-xs hover:border-primary/40 hover:bg-muted transition-all cursor-pointer'
          >
            {t('loadMore')} ({restaurantList.length} / {totalCount})
          </button>
        </div>
      )}
    </div>
  );
}
