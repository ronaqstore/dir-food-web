'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useArea } from '../context/area-context';
import { usePublicAreasQuery, usePublicCitiesQuery } from '../api/queries';
import { IconCheck, IconLoader2, IconMapPin, IconSearch, IconX } from '@/components/icons';
import type { PublicArea } from '../api/types';

export function AreaModal() {
  const t = useTranslations();
  const {
    selectedCity,
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    isAreaModalOpen,
    closeAreaModal
  } = useArea();

  const { data: cities = [] } = usePublicCitiesQuery();
  const activeCity = selectedCity || cities[0] || null;
  const { data: areas, isLoading } = usePublicAreasQuery(activeCity?.id);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibleLimit, setVisibleLimit] = React.useState(20);
  const [isLoadingBatch, setIsLoadingBatch] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!selectedCity && cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  }, [selectedCity, cities, setSelectedCity]);

  // Reset pagination when active city or search changes
  React.useEffect(() => {
    setVisibleLimit(20);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [activeCity?.id, searchQuery]);

  const filteredAreas = React.useMemo(() => {
    if (!areas) return [];
    if (!searchQuery.trim()) return areas;
    const q = searchQuery.trim().toLowerCase();
    return areas.filter((a) => a.name.toLowerCase().includes(q));
  }, [areas, searchQuery]);

  const displayedAreas = React.useMemo(() => {
    return filteredAreas.slice(0, visibleLimit);
  }, [filteredAreas, visibleLimit]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 30) {
        if (visibleLimit < filteredAreas.length && !isLoadingBatch) {
          setIsLoadingBatch(true);
          setTimeout(() => {
            setVisibleLimit((prev) => Math.min(prev + 20, filteredAreas.length));
            setIsLoadingBatch(false);
          }, 120);
        }
      }
    },
    [visibleLimit, filteredAreas.length, isLoadingBatch]
  );

  React.useEffect(() => {
    if (!isAreaModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAreaModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAreaModalOpen, closeAreaModal]);

  if (!isAreaModalOpen) return null;

  const handleSelect = (area: PublicArea | null) => {
    setSelectedArea(area);
    setSearchQuery('');
    closeAreaModal();
  };

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in duration-150'>
      <button
        type='button'
        aria-label='Close'
        tabIndex={-1}
        onClick={closeAreaModal}
        className='fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer border-0 p-0'
      />
      <dialog
        open
        aria-labelledby='area-modal-title'
        className='relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150 text-card-foreground block m-0'
      >
        {/* Header */}
        <div className='flex items-center justify-between pb-4 border-b border-border'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
              <IconMapPin className='h-4 w-4' />
            </div>
            <div>
              <h2 id='area-modal-title' className='text-base font-bold text-foreground'>
                {t('directory.selectAreaTitle')}
              </h2>
              <p className='text-xs text-muted-foreground'>{t('directory.selectAreaDesc')}</p>
            </div>
          </div>
          <button
            type='button'
            onClick={closeAreaModal}
            className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
            aria-label='Close'
          >
            <IconX className='h-4 w-4' />
          </button>
        </div>

        {/* District Switcher Section */}
        {cities.length > 0 && (
          <div className='py-3 border-b border-border space-y-1.5'>
            <span className='text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
              1. Select District
            </span>
            <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
              {cities.map((city) => {
                const isActive = activeCity?.id === city.id;
                return (
                  <button
                    key={city.id}
                    type='button'
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedArea(null);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40'
                    }`}
                  >
                    <IconMapPin className={`h-3 w-3 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    <span>{city.name}</span>
                    {isActive && <IconCheck className='h-3 w-3 ms-0.5' />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2 Header */}
        <div className='pt-3 pb-1 flex items-center justify-between'>
          <span className='text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
            2. Choose Area in {activeCity?.name ?? 'District'}
          </span>
          {activeCity && (
            <span className='text-[10px] text-primary font-medium'>
              {filteredAreas.length} {filteredAreas.length === 1 ? 'area' : 'areas'}
            </span>
          )}
        </div>

        {/* Search input for area lists */}
        {areas && (areas.length > 0 || searchQuery) && (
          <div className='mt-1 relative'>
            <IconSearch className='absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('directory.selectAreaTitle')}
              className='h-9 w-full rounded-xl border border-border bg-background ps-9 pe-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
            />
            {searchQuery && (
              <button
                type='button'
                onClick={() => setSearchQuery('')}
                className='absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer'
              >
                <IconX className='h-3 w-3' />
              </button>
            )}
          </div>
        )}

        {/* Counter Header when many items */}
        {filteredAreas.length > 20 && (
          <div className='mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground'>
            <span>Matches: {filteredAreas.length}</span>
            <span className='text-primary font-medium text-[10px]'>
              Showing {displayedAreas.length} of {filteredAreas.length}
            </span>
          </div>
        )}

        {/* Content with 20-by-20 auto-fetch infinite scroll */}
        <div
          ref={listRef}
          onScroll={handleScroll}
          className='mt-2 max-h-[50vh] overflow-y-auto space-y-1.5 pe-1'
        >
          {/* All Areas Option */}
          <button
            type='button'
            onClick={() => handleSelect(null)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl p-3 text-sm transition-colors text-start ${
              selectedArea === null
                ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <div className='flex items-center gap-2.5'>
              <IconMapPin className='h-4 w-4 text-muted-foreground' />
              <span>{activeCity ? `All ${activeCity.name}` : t('directory.allAreas')}</span>
            </div>
            {selectedArea === null && <IconCheck className='h-4 w-4 text-primary' />}
          </button>

          {/* Loading */}
          {isLoading && (
            <div className='flex items-center justify-center py-8 text-muted-foreground'>
              <IconLoader2 className='h-5 w-5 animate-spin' />
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredAreas.length === 0 && (
            <div className='py-6 text-center text-xs text-muted-foreground'>
              No delivery areas registered in {activeCity?.name || 'this district'} yet.
            </div>
          )}

          {/* List of active delivery areas (paginated 20-by-20) */}
          {displayedAreas.map((area) => {
            const isSelected = selectedArea?.id === area.id;
            return (
              <button
                key={area.id}
                type='button'
                onClick={() => handleSelect(area)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl p-3 text-sm transition-colors text-start ${
                  isSelected
                    ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <div className='flex items-center gap-2.5'>
                  <IconMapPin className='h-4 w-4 text-muted-foreground' />
                  <span>{area.name}</span>
                </div>
                {isSelected && <IconCheck className='h-4 w-4 text-primary' />}
              </button>
            );
          })}

          {/* Loading indicator when scrolling near bottom to fetch next 20 items */}
          {isLoadingBatch && (
            <div className='flex items-center justify-center gap-1.5 py-2 text-xs text-primary font-medium'>
              <IconLoader2 className='h-3.5 w-3.5 animate-spin' />
              <span className='text-[11px]'>Loading more areas...</span>
            </div>
          )}

          {/* End of list */}
          {displayedAreas.length >= filteredAreas.length && filteredAreas.length > 20 && (
            <div className='py-2 text-center text-[10px] text-muted-foreground/70'>
              All {filteredAreas.length} areas loaded
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
