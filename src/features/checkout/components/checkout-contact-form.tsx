'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  IconMapPin,
  IconPhone,
  IconUser,
  IconHome,
  IconNotes,
  IconChevronRight
} from '@tabler/icons-react';
import { useArea } from '@/features/directory/context/area-context';

export interface CheckoutFormData {
  name: string;
  phone: string;
  landmark: string;
  directions: string;
}

interface CheckoutContactFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  disabled?: boolean;
}

export function CheckoutContactForm({ formData, onChange, disabled }: CheckoutContactFormProps) {
  const t = useTranslations('checkout');
  const { selectedArea, openAreaModal } = useArea();

  return (
    <div className='rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-6'>
      <div className='border-b border-border pb-4'>
        <h2 className='text-base font-bold text-foreground'>{t('deliveryDetailsTitle')}</h2>
        <p className='text-xs text-muted-foreground mt-0.5'>{t('deliveryDetailsSubtitle')}</p>
      </div>

      <div className='space-y-4'>
        {/* Delivery Area Picker */}
        <div className='space-y-1.5'>
          <label className='block text-xs font-semibold text-foreground'>
            {t('areaLabel')} <span className='text-destructive'>*</span>
          </label>
          <button
            type='button'
            onClick={openAreaModal}
            disabled={disabled}
            className='flex w-full items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5 text-start text-sm hover:bg-muted/50 transition-colors'
          >
            <div className='flex items-center gap-2.5 min-w-0'>
              <IconMapPin className='size-4 text-primary shrink-0' />
              <span
                className={`truncate font-medium ${selectedArea ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
              >
                {selectedArea ? selectedArea.name : t('selectAreaPlaceholder')}
              </span>
            </div>
            <div className='flex items-center gap-1 text-xs font-semibold text-primary shrink-0'>
              <span>{t('changeArea')}</span>
              <IconChevronRight className='size-3.5 rtl:rotate-180' />
            </div>
          </button>
        </div>

        {/* Landmark / Street address (Required) */}
        <div className='space-y-1.5'>
          <label htmlFor='landmark' className='block text-xs font-semibold text-foreground'>
            {t('landmarkLabel')} <span className='text-destructive'>*</span>
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground'>
              <IconHome className='size-4' />
            </div>
            <input
              id='landmark'
              type='text'
              value={formData.landmark}
              onChange={(e) => onChange('landmark', e.target.value)}
              disabled={disabled}
              placeholder={t('landmarkPlaceholder')}
              required
              minLength={3}
              maxLength={150}
              className='block w-full rounded-xl border border-border bg-background py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:opacity-60'
            />
          </div>
          <p className='text-[11px] text-muted-foreground'>{t('landmarkHint')}</p>
        </div>

        {/* Optional directions or house details */}
        <div className='space-y-1.5'>
          <label htmlFor='directions' className='block text-xs font-medium text-foreground'>
            {t('directionsLabel')}
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground'>
              <IconNotes className='size-4' />
            </div>
            <input
              id='directions'
              type='text'
              value={formData.directions}
              onChange={(e) => onChange('directions', e.target.value)}
              disabled={disabled}
              placeholder={t('directionsPlaceholder')}
              maxLength={300}
              className='block w-full rounded-xl border border-border bg-background py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:opacity-60'
            />
          </div>
        </div>

        {/* Customer Name & Phone grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2'>
          {/* Customer Name */}
          <div className='space-y-1.5'>
            <label htmlFor='customer-name' className='block text-xs font-medium text-foreground'>
              {t('nameLabel')}
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground'>
                <IconUser className='size-4' />
              </div>
              <input
                id='customer-name'
                type='text'
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
                disabled={disabled}
                placeholder={t('namePlaceholder')}
                maxLength={60}
                className='block w-full rounded-xl border border-border bg-background py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:opacity-60'
              />
            </div>
          </div>

          {/* Customer Phone */}
          <div className='space-y-1.5'>
            <label htmlFor='customer-phone' className='block text-xs font-medium text-foreground'>
              {t('phoneLabel')}
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground'>
                <IconPhone className='size-4' />
              </div>
              <input
                id='customer-phone'
                type='tel'
                value={formData.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                disabled={disabled}
                placeholder='0300 1234567'
                className='block w-full rounded-xl border border-border bg-background py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:opacity-60'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
