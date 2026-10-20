'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useArea } from '../context/area-context';
import { usePublicAreasQuery } from '../api/queries';
import { IconCheck, IconLoader2, IconMapPin, IconX } from '@/components/icons';
import type { PublicArea } from '../api/types';

export function AreaModal() {
  const t = useTranslations();
  const { selectedArea, setSelectedArea, isAreaModalOpen, closeAreaModal } = useArea();
  const { data: areas, isLoading } = usePublicAreasQuery();

  if (!isAreaModalOpen) return null;

  const handleSelect = (area: PublicArea | null) => {
    setSelectedArea(area);
    closeAreaModal();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150'>
      <dialog
        open
        aria-labelledby='area-modal-title'
        className='relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150 text-card-foreground block m-0'
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

        {/* Content */}
        <div className='mt-4 max-h-[60vh] overflow-y-auto space-y-1.5 pe-1'>
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
              <span>{t('directory.allAreas')}</span>
            </div>
            {selectedArea === null && <IconCheck className='h-4 w-4 text-primary' />}
          </button>

          {/* Loading */}
          {isLoading && (
            <div className='flex items-center justify-center py-8 text-muted-foreground'>
              <IconLoader2 className='h-5 w-5 animate-spin' />
            </div>
          )}

          {/* List of active delivery areas */}
          {areas?.map((area) => {
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
        </div>
      </dialog>
    </div>
  );
}
