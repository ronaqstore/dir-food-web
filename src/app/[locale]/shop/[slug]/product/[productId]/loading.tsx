import { StorefrontSkeleton } from '@/features/restaurant/components/storefront-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoading() {
  return (
    <div className='mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
      <div className='mb-4'>
        <Skeleton className='h-4 w-28 rounded-md' />
      </div>
      <StorefrontSkeleton />
    </div>
  );
}
