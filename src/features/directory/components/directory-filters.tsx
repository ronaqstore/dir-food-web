'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { IconSearch, IconX } from '@/components/icons';

const COMMON_CUISINES = [
  'Fast Food',
  'Karahi',
  'BBQ',
  'Biryani',
  'Pizza',
  'Burgers',
  'Chai & Cafe',
  'Traditional'
];

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCuisine: string | undefined;
  onCuisineSelect: (cuisine: string | undefined) => void;
  openNowOnly: boolean;
  onOpenNowToggle: (enabled: boolean) => void;
}

export function DirectoryFilters({
  searchQuery,
  onSearchChange,
  selectedCuisine,
  onCuisineSelect,
  openNowOnly,
  onOpenNowToggle
}: DirectoryFiltersProps) {
  const t = useTranslations('directory');

  return (
    <div className='space-y-3'>
      {/* Search Bar & Open Now switch */}
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5'>
        {/* Search Input */}
        <div className='relative flex-1'>
          <IconSearch className='absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className='h-11 w-full rounded-xl border border-border bg-card ps-9 pe-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all'
          />
          {searchQuery && (
            <button
              type='button'
              onClick={() => onSearchChange('')}
              className='absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer'
            >
              <IconX className='h-3.5 w-3.5' />
            </button>
          )}
        </div>

        {/* Open Now Toggle Pill */}
        <button
          type='button'
          onClick={() => onOpenNowToggle(!openNowOnly)}
          className={`flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold border transition-all cursor-pointer ${
            openNowOnly
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'border-border bg-card text-muted-foreground hover:text-foreground'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              openNowOnly ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/40'
            }`}
          />
          <span>{t('openNow')}</span>
        </button>
      </div>

      {/* Horizontal Cuisine Chips */}
      <div className='flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none'>
        <button
          type='button'
          onClick={() => onCuisineSelect(undefined)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            selectedCuisine === undefined
              ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          {t('allCuisines')}
        </button>

        {COMMON_CUISINES.map((cuisine) => {
          const isSelected = selectedCuisine?.toLowerCase() === cuisine.toLowerCase();
          return (
            <button
              key={cuisine}
              type='button'
              onClick={() => onCuisineSelect(isSelected ? undefined : cuisine)}
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
