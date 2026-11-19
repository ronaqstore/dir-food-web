'use client';

import { useTranslations } from 'next-intl';
import { IconSearch, IconX, IconFlame } from '@/components/icons';
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
  openNowOnly = false,
  onOpenNowToggle,
  dealsOnly = false,
  onDealsToggle,
  under500Only = false,
  onUnder500Toggle,
  onResetAll,
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

  const handleSelectAll = () => {
    if (onResetAll) {
      onResetAll();
    } else {
      onCuisineSelect(undefined);
      onOpenNowToggle?.(false);
      onDealsToggle?.(false);
      onUnder500Toggle?.(false);
    }
  };

  const isAllActive = !selectedCuisine && !openNowOnly && !dealsOnly && !under500Only;

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
            aria-label='Clear search'
            className='absolute inset-e-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer'
          >
            <IconX className='h-3.5 w-3.5' />
          </button>
        )}
      </div>

      <div
        className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'
        onWheel={(e) => {
          if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
      >
        <button
          type='button'
          onClick={handleSelectAll}
          suppressHydrationWarning
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            isAllActive
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          {t('allCuisines')}
        </button>

        <div className='h-4 w-px bg-border/80 shrink-0 mx-0.5' aria-hidden='true' />

        {/* Quick Filter: Deals */}
        <button
          type='button'
          onClick={() => onDealsToggle?.(!dealsOnly)}
          suppressHydrationWarning
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
            dealsOnly
              ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
              : 'border-border bg-card text-muted-foreground hover:border-rose-500/40 hover:text-foreground'
          }`}
        >
          <IconFlame className={`h-3.5 w-3.5 ${dealsOnly ? 'text-rose-500' : 'text-amber-500'}`} />
          <span>{t('dealsFilter')}</span>
        </button>

        {/* Quick Filter: Open Now */}
        <button
          type='button'
          onClick={() => onOpenNowToggle?.(!openNowOnly)}
          suppressHydrationWarning
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
            openNowOnly
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
              : 'border-border bg-card text-muted-foreground hover:border-emerald-500/40 hover:text-foreground'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              openNowOnly ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/40'
            }`}
          />
          <span>{t('openNow')}</span>
        </button>

        {/* Quick Filter: Under Rs 500 */}
        <button
          type='button'
          onClick={() => onUnder500Toggle?.(!under500Only)}
          suppressHydrationWarning
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
            under500Only
              ? 'border-blue-500 bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
              : 'border-border bg-card text-muted-foreground hover:border-blue-500/40 hover:text-foreground'
          }`}
        >
          <span>⚡</span>
          <span>{t('under500')}</span>
        </button>

        <div className='h-4 w-px bg-border/80 shrink-0 mx-0.5' aria-hidden='true' />

        {/* Cuisines */}
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
