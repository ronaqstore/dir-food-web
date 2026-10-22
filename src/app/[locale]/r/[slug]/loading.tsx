import * as React from 'react';
import { StorefrontSkeleton } from '@/features/restaurant/components/storefront-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function RestaurantLoading() {
  return (
    <div className='mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6'>
      {/* Back button placeholder */}
      <div className='mb-4'>
        <Skeleton className='h-4 w-28 rounded-md' />
      </div>

      {/* Storefront Layout Skeleton */}
      <StorefrontSkeleton />
    </div>
  );
}
