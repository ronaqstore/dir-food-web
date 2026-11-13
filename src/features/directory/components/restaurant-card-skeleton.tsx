import { Skeleton } from '@/components/ui/skeleton';
import type { SkeletonCountProps } from '@/types/common';

export function RestaurantCardSkeleton() {
  return (
    <div className='flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs'>
      {}
      <div className='relative h-36 w-full bg-muted/40 overflow-hidden'>
        <Skeleton className='h-full w-full rounded-none' />
        {}
        <div className='absolute inset-s-3 top-3'>
          <Skeleton className='h-6 w-20 rounded-full bg-background/60 backdrop-blur-xs' />
        </div>
      </div>

      {}
      <div className='flex flex-1 flex-col p-4 space-y-3'>
        {}
        <Skeleton className='h-5 w-3/4 rounded-md' />

        {}
        <div className='flex gap-1.5'>
          <Skeleton className='h-4 w-14 rounded-md' />
          <Skeleton className='h-4 w-16 rounded-md' />
          <Skeleton className='h-4 w-12 rounded-md' />
        </div>

        {}
        <div className='mt-auto pt-3 flex items-center justify-between border-t border-border/50'>
          <Skeleton className='h-4 w-28 rounded-md' />
          <Skeleton className='h-4 w-20 rounded-md' />
        </div>
      </div>
    </div>
  );
}

export function RestaurantGridSkeleton({ count = 6 }: SkeletonCountProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}
