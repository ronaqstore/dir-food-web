'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useArea } from '../context/area-context';
import { usePublicAreasQuery, usePublicCitiesQuery } from '../api/queries';
import {
  IconCheck,
  IconChevronDown,
  IconLoader2,
  IconMapPin,
  IconSearch,
  IconX,
} from '@/components/icons';
import type { PublicArea, PublicCity } from '../api/types';

export function AreaModal() {
  const t = useTranslations();
  const {
    selectedCity,
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    isAreaModalOpen,
    closeAreaModal,
  } = useArea();

  const { data: cities = [] } = usePublicCitiesQuery();

  const [activeCity, setActiveCity] = React.useState<PublicCity | null>(null);
  const [activeArea, setActiveArea] = React.useState<PublicArea | null>(null);

  const [isDistrictOpen, setIsDistrictOpen] = React.useState(false);
  const [isAreaOpen, setIsAreaOpen] = React.useState(false);

  const [districtSearch, setDistrictSearch] = React.useState('');
  const [areaSearch, setAreaSearch] = React.useState('');
  const [areaVisibleLimit, setAreaVisibleLimit] = React.useState(40);

  const districtInputRef = React.useRef<HTMLInputElement>(null);
  const areaInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isAreaModalOpen) {
      const initialCity = selectedCity || cities[0] || null;
      setActiveCity(initialCity);
      setActiveArea(selectedArea);
      setIsDistrictOpen(false);
      setIsAreaOpen(false);
      setDistrictSearch('');
      setAreaSearch('');
      setAreaVisibleLimit(40);
    }
  }, [isAreaModalOpen, selectedCity, selectedArea, cities]);

  const { data: areas = [], isLoading: isLoadingAreas } = usePublicAreasQuery(
    activeCity?.id,
  );

  React.useEffect(() => {
    setAreaVisibleLimit(40);
  }, [activeCity?.id, areaSearch]);

  React.useEffect(() => {
    if (isDistrictOpen) {
      setTimeout(() => districtInputRef.current?.focus(), 60);
    }
  }, [isDistrictOpen]);

  React.useEffect(() => {
    if (isAreaOpen) {
      setTimeout(() => areaInputRef.current?.focus(), 60);
    }
  }, [isAreaOpen]);

  React.useEffect(() => {
    if (!isAreaModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDistrictOpen) {
          setIsDistrictOpen(false);
        } else if (isAreaOpen) {
          setIsAreaOpen(false);
        } else {
          closeAreaModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAreaModalOpen, isDistrictOpen, isAreaOpen, closeAreaModal]);

  const filteredDistricts = React.useMemo(() => {
    if (!districtSearch.trim()) return cities;
    const q = districtSearch.trim().toLowerCase();
    return cities.filter((c) => c.name.toLowerCase().includes(q));
  }, [cities, districtSearch]);

  const filteredAreas = React.useMemo(() => {
    if (!areaSearch.trim()) return areas;
    const q = areaSearch.trim().toLowerCase();
    return areas.filter((a) => a.name.toLowerCase().includes(q));
  }, [areas, areaSearch]);

  const displayedAreas = React.useMemo(() => {
    return filteredAreas.slice(0, areaVisibleLimit);
  }, [filteredAreas, areaVisibleLimit]);

  const handleToggleDistrictDropdown = () => {
    setIsDistrictOpen((prev) => !prev);
    setIsAreaOpen(false);
  };

  const handleToggleAreaDropdown = () => {
    setIsAreaOpen((prev) => !prev);
    setIsDistrictOpen(false);
  };

  const handleSelectDistrict = (city: PublicCity) => {
    setActiveCity(city);
    setActiveArea(null);
    setIsDistrictOpen(false);
    setDistrictSearch('');
  };

  const handleSelectArea = (area: PublicArea | null) => {
    setActiveArea(area);
    setIsAreaOpen(false);
    setAreaSearch('');
  };

  const handleAreaScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 30) {
      if (areaVisibleLimit < filteredAreas.length) {
        setAreaVisibleLimit((prev) =>
          Math.min(prev + 40, filteredAreas.length),
        );
      }
    }
  };

  const handleDistrictSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDistrictSearch(e.target.value);
  };

  const handleAreaSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaSearch(e.target.value);
  };

  const handleConfirm = () => {
    if (activeCity) {
      setSelectedCity(activeCity);
    }
    setSelectedArea(activeArea);
    closeAreaModal();
  };

  if (!isAreaModalOpen) return null;

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150'>
      <button
        type='button'
        aria-label={t('common.close')}
        tabIndex={-1}
        onClick={closeAreaModal}
        className='fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer border-0 p-0'
      />
      <dialog
        open
        aria-labelledby='area-modal-title'
        className='relative z-10 w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto scrollbar-none rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xl animate-in zoom-in-95 duration-150 text-card-foreground block m-0'
      >
        <div className='flex items-center justify-between pb-4 border-b border-border'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0'>
              <IconMapPin className='h-5 w-5' />
            </div>
            <div>
              <h2
                id='area-modal-title'
                className='text-base font-bold text-foreground'
              >
                {t('directory.selectAreaTitle')}
              </h2>
              <p className='text-xs text-muted-foreground'>
                {t('directory.selectAreaDesc')}
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={closeAreaModal}
            className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer'
            aria-label={t('common.close')}
          >
            <IconX className='h-4 w-4' />
          </button>
        </div>

        <div className='py-4 space-y-4'>
          <div className='space-y-1.5'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                <span className='flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary'>
                  1
                </span>
                <span>{t('directory.selectDistrict')}</span>
              </label>
              <span className='text-[10px] text-muted-foreground'>
                {cities.length} {t('directory.districts')}
              </span>
            </div>

            <div className='relative'>
              <button
                type='button'
                onClick={handleToggleDistrictDropdown}
                className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                  isDistrictOpen
                    ? 'border-primary ring-2 ring-primary/20 bg-background text-foreground'
                    : 'border-border bg-muted/40 hover:bg-muted/70 text-foreground'
                }`}
              >
                <div className='flex items-center gap-2 truncate'>
                  <IconMapPin className='h-3.5 w-3.5 text-primary shrink-0' />
                  <span className='font-semibold truncate'>
                    {activeCity?.name ?? t('directory.selectDistrictPlaceholder')}
                  </span>
                </div>
                <IconChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isDistrictOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDistrictOpen && (
                <div className='mt-1.5 rounded-xl border border-border bg-card p-2 shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 space-y-2'>
                  <div className='relative'>
                    <IconSearch className='absolute inset-s-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
                    <input
                      ref={districtInputRef}
                      type='text'
                      value={districtSearch}
                      onChange={handleDistrictSearchChange}
                      placeholder={t('directory.searchDistrictPlaceholder')}
                      className='w-full rounded-lg bg-muted/50 ps-8 pe-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border/60 focus:border-primary'
                    />
                  </div>

                  <div className='max-h-52 overflow-y-auto scrollbar-none space-y-0.5 pe-0.5'>
                    {filteredDistricts.length === 0 ? (
                      <p className='py-4 text-center text-xs text-muted-foreground'>
                        {t('directory.noRestaurants')}
                      </p>
                    ) : (
                      filteredDistricts.map((city) => {
                        const isSelected = activeCity?.id === city.id;
                        return (
                          <button
                            key={city.id}
                            type='button'
                            onClick={() => handleSelectDistrict(city)}
                            className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer text-start ${
                              isSelected
                                ? 'bg-primary text-primary-foreground font-semibold'
                                : 'hover:bg-muted text-foreground'
                            }`}
                          >
                            <span className='truncate'>{city.name}</span>
                            {isSelected && (
                              <IconCheck className='h-3.5 w-3.5 shrink-0 ms-1' />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='space-y-1.5'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                <span className='flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary'>
                  2
                </span>
                <span>
                  {t('directory.chooseAreaIn')} {activeCity?.name ?? ''}
                </span>
              </label>
              {activeCity && (
                <span className='text-[10px] text-primary font-medium'>
                  {isLoadingAreas ? (
                    <IconLoader2 className='inline h-3 w-3 animate-spin' />
                  ) : (
                    `${areas.length} ${t('directory.areasLoaded')}`
                  )}
                </span>
              )}
            </div>

            <div className='relative'>
              <button
                type='button'
                onClick={handleToggleAreaDropdown}
                className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                  isAreaOpen
                    ? 'border-primary ring-2 ring-primary/20 bg-background text-foreground'
                    : 'border-border bg-muted/40 hover:bg-muted/70 text-foreground'
                }`}
              >
                <div className='flex items-center gap-2 truncate'>
                  <IconMapPin className='h-3.5 w-3.5 text-primary shrink-0' />
                  <span className='font-semibold truncate'>
                    {activeArea
                      ? activeArea.name
                      : `${t('directory.all')} ${activeCity?.name ?? ''}`}
                  </span>
                </div>
                <IconChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isAreaOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isAreaOpen && (
                <div className='mt-1.5 rounded-xl border border-border bg-card p-2 shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 space-y-2'>
                  <div className='relative'>
                    <IconSearch className='absolute inset-s-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
                    <input
                      ref={areaInputRef}
                      type='text'
                      value={areaSearch}
                      onChange={handleAreaSearchChange}
                      placeholder={t('directory.searchAreaPlaceholder')}
                      className='w-full rounded-lg bg-muted/50 ps-8 pe-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border/60 focus:border-primary'
                    />
                  </div>

                  <div
                    onScroll={handleAreaScroll}
                    className='max-h-56 overflow-y-auto scrollbar-none space-y-0.5 pe-0.5'
                  >
                    <button
                      type='button'
                      onClick={() => handleSelectArea(null)}
                      className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer text-start ${
                        activeArea === null
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span className='truncate font-medium'>
                        {t('directory.all')} {activeCity?.name ?? ''}
                      </span>
                      {activeArea === null && (
                        <IconCheck className='h-3.5 w-3.5 shrink-0 ms-1' />
                      )}
                    </button>

                    {isLoadingAreas ? (
                      <div className='py-6 text-center'>
                        <IconLoader2 className='mx-auto h-5 w-5 animate-spin text-primary' />
                      </div>
                    ) : displayedAreas.length === 0 ? (
                      <p className='py-4 text-center text-xs text-muted-foreground'>
                        {t('directory.noAreasIn')} {activeCity?.name ?? ''}{' '}
                        {t('directory.yet')}
                      </p>
                    ) : (
                      displayedAreas.map((area) => {
                        const isSelected = activeArea?.id === area.id;
                        return (
                          <button
                            key={area.id}
                            type='button'
                            onClick={() => handleSelectArea(area)}
                            className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer text-start ${
                              isSelected
                                ? 'bg-primary text-primary-foreground font-semibold'
                                : 'hover:bg-muted text-foreground'
                            }`}
                          >
                            <span className='truncate'>{area.name}</span>
                            {isSelected && (
                              <IconCheck className='h-3.5 w-3.5 shrink-0 ms-1' />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='pt-3 border-t border-border flex flex-col gap-2'>
          <div className='flex items-center justify-between text-[11px] text-muted-foreground px-1'>
            <span>{t('directory.deliveringTo')}</span>
            <span className='font-semibold text-foreground truncate max-w-[220px]'>
              {activeCity?.name ?? ''}
              {activeArea ? ` • ${activeArea.name}` : ` • ${t('directory.all')}`}
            </span>
          </div>

          <button
            type='button'
            onClick={handleConfirm}
            className='w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shadow-xs'
          >
            <IconCheck className='h-4 w-4' />
            <span>{t('directory.confirmSelection')}</span>
          </button>
        </div>
      </dialog>
    </div>
  );
}
