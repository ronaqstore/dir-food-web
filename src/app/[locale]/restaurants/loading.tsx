import { RestaurantGridSkeleton } from '@/features/directory/components/restaurant-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function RestaurantsLoading() {
  return (
    <div className='mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6'>
      {}
      <div className='space-y-2'>
        <Skeleton className='h-8 w-48 rounded-lg' />
        <Skeleton className='h-4 w-72 rounded-md' />
      </div>

      {}
      <div className='flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-7 w-32 rounded-lg' />
          <Skeleton className='h-7 w-24 rounded-lg' />
        </div>
        <Skeleton className='h-5 w-20 rounded-md' />
      </div>

      {}
      <div className='space-y-3'>
        <Skeleton className='h-11 w-full rounded-xl' />
        <div className='flex items-center gap-2 overflow-x-hidden pt-1'>
          <Skeleton className='h-8 w-16 shrink-0 rounded-lg' />
          <Skeleton className='h-8 w-20 shrink-0 rounded-lg' />
          <Skeleton className='h-8 w-24 shrink-0 rounded-lg' />
          <Skeleton className='h-8 w-20 shrink-0 rounded-lg' />
          <Skeleton className='h-8 w-28 shrink-0 rounded-lg' />
        </div>
      </div>

      {}
      <RestaurantGridSkeleton count={6} />
    </div>
  );
}
