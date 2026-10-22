import * as React from 'react';
import { RestaurantGridSkeleton } from '@/features/directory/components/restaurant-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className='mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 space-y-10'>
      {/* Hero Banner Skeleton */}
      <div className='rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 sm:p-10 space-y-4'>
        <Skeleton className='h-6 w-32 rounded-full' />
        <Skeleton className='h-10 w-64 sm:w-80 rounded-xl' />
        <Skeleton className='h-4 w-96 max-w-full rounded-md' />
        <div className='pt-2'>
          <Skeleton className='h-11 w-40 rounded-xl' />
        </div>
      </div>

      {/* Directory Section Skeleton */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1.5'>
            <Skeleton className='h-6 w-44 rounded-md' />
            <Skeleton className='h-3.5 w-60 rounded-md' />
          </div>
          <Skeleton className='h-4 w-20 rounded-md' />
        </div>

        <RestaurantGridSkeleton count={6} />
      </section>
    </div>
  );
}
