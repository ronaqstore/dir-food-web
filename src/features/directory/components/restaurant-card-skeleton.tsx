import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function RestaurantCardSkeleton() {
  return (
    <div className='flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs'>
      {/* Top Banner / Logo Area */}
      <div className='relative h-36 w-full bg-muted/40 overflow-hidden'>
        <Skeleton className='h-full w-full rounded-none' />
        {/* Live Status Badge overlay placeholder */}
        <div className='absolute start-3 top-3'>
          <Skeleton className='h-6 w-20 rounded-full bg-background/60 backdrop-blur-xs' />
        </div>
      </div>

      {/* Info Body */}
      <div className='flex flex-1 flex-col p-4 space-y-3'>
        {/* Restaurant Name */}
        <Skeleton className='h-5 w-3/4 rounded-md' />

        {/* Cuisine Tags */}
        <div className='flex gap-1.5'>
          <Skeleton className='h-4 w-14 rounded-md' />
          <Skeleton className='h-4 w-16 rounded-md' />
          <Skeleton className='h-4 w-12 rounded-md' />
        </div>

        {/* Footer info: Availability text & min order */}
        <div className='mt-auto pt-3 flex items-center justify-between border-t border-border/50'>
          <Skeleton className='h-4 w-28 rounded-md' />
          <Skeleton className='h-4 w-20 rounded-md' />
        </div>
      </div>
    </div>
  );
}

export function RestaurantGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}
