'use client';

import { useTranslations } from 'next-intl';
import { IconSearch, IconX } from '@/components/icons';
import type { DirectoryFiltersProps } from '../types';

const FALLBACK_CUISINES = [
  'Fast Food',
  'Karahi',
  'BBQ',
  'Biryani',
  'Pizza',
  'Burgers',
  'Chai & Cafe',
  'Traditional',
  'Kabab'
];

export function DirectoryFilters({
  searchQuery,
  onSearchChange,
  selectedCuisine,
  onCuisineSelect,
  availableCuisines = [],
  masterCuisines = []
}: DirectoryFiltersProps) {
  const t = useTranslations('directory');

  const baseCuisines = masterCuisines.length > 0 ? masterCuisines : FALLBACK_CUISINES;
  const allCuisines = Array.from(
    new Set([
      ...baseCuisines,
      ...availableCuisines.filter(Boolean)
    ])
  );

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleSelectAllCuisines = () => {
    onCuisineSelect(undefined);
  };

  const handleCuisineClick = (cuisine: string) => {
    const isSelected = selectedCuisine?.toLowerCase() === cuisine.toLowerCase();
    onCuisineSelect(isSelected ? undefined : cuisine);
  };

  return (
    <div className='space-y-3'>
      <div className='relative w-full'>
        <IconSearch className='absolute inset-s-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          autoComplete='off'
          data-lpignore='true'
          suppressHydrationWarning
          className='h-11 w-full rounded-xl border border-border bg-card ps-9 pe-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all'
        />
        {searchQuery && (
          <button
            type='button'
            onClick={handleClearSearch}
            suppressHydrationWarning
            className='absolute inset-e-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer'
          >
            <IconX className='h-3.5 w-3.5' />
          </button>
        )}
      </div>

      <div
        className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none'
        onWheel={(e) => {
          if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
      >
        <button
          type='button'
          onClick={handleSelectAllCuisines}
          suppressHydrationWarning
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            selectedCuisine === undefined
              ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          {t('allCuisines')}
        </button>

        {allCuisines.map((cuisine) => {
          const isSelected = selectedCuisine?.toLowerCase() === cuisine.toLowerCase();
          return (
            <button
              key={cuisine}
              type='button'
              onClick={() => handleCuisineClick(cuisine)}
              suppressHydrationWarning
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cuisine}
            </button>
          );
        })}
      </div>
    </div>
  );
}
