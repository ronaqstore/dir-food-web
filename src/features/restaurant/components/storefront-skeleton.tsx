import { Skeleton } from '@/components/ui/skeleton';

export function StoreHeaderSkeleton() {
  return (
    <div className='relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xs'>
      <div className='relative h-44 sm:h-56 w-full bg-muted/50 overflow-hidden'>
        <Skeleton className='h-full w-full rounded-none' />
        <div className='absolute top-4 inset-s-4'>
          <Skeleton className='h-7 w-24 rounded-full bg-background/70 backdrop-blur-xs' />
        </div>
      </div>

      <div className='p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          <div className='flex items-start sm:items-center gap-4 -mt-12 sm:-mt-16'>
            <div className='relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border-4 border-card bg-card shadow-md overflow-hidden'>
              <Skeleton className='h-full w-full rounded-xl' />
            </div>

            <div className='pt-8 sm:pt-0 space-y-2'>
              <Skeleton className='h-7 w-48 sm:w-64 rounded-md' />
              <div className='flex gap-1.5'>
                <Skeleton className='h-4 w-16 rounded-md' />
                <Skeleton className='h-4 w-20 rounded-md' />
                <Skeleton className='h-4 w-14 rounded-md' />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Skeleton className='h-8 w-28 rounded-xl' />
            <Skeleton className='h-8 w-24 rounded-xl' />
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center gap-4'>
          <Skeleton className='h-4 w-32 rounded-md' />
          <Skeleton className='h-4 w-44 rounded-md' />
          <Skeleton className='h-4 w-28 rounded-md' />
        </div>
      </div>
    </div>
  );
}

export function FeaturedDealsCarouselSkeleton() {
  return (
    <div className='space-y-3.5 pt-2'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-6 rounded-md' />
            <Skeleton className='h-6 w-36 rounded-md' />
            <Skeleton className='h-5 w-16 rounded-full' />
          </div>
          <Skeleton className='h-3.5 w-60 rounded-md' />
        </div>
      </div>

      <div className='flex gap-3.5 sm:gap-4 overflow-x-hidden pb-3 pt-1'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='w-[280px] sm:w-[310px] shrink-0 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 bg-card p-3.5 shadow-xs space-y-3'
          >
            <div className='relative h-36 w-full overflow-hidden rounded-xl bg-muted'>
              <Skeleton className='h-full w-full rounded-xl' />
              <div className='absolute top-2.5 inset-s-2.5'>
                <Skeleton className='h-5 w-20 rounded-full' />
              </div>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center justify-between gap-2'>
                <Skeleton className='h-5 w-36 rounded-md' />
                <Skeleton className='h-3.5 w-16 rounded-md' />
              </div>
              <Skeleton className='h-3.5 w-full rounded-md' />
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-border/50'>
              <div className='flex items-baseline gap-2'>
                <Skeleton className='h-6 w-20 rounded-md' />
                <Skeleton className='h-3.5 w-14 rounded-md' />
              </div>
              <Skeleton className='h-8 w-20 rounded-xl' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryNavSkeleton() {
  return (
    <div className='sticky top-16 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 bg-background/95 backdrop-blur-md border-b border-border/60'>
      <div className='flex items-center gap-2 overflow-x-hidden'>
        <Skeleton className='h-9 w-24 shrink-0 rounded-xl' />
        <Skeleton className='h-9 w-28 shrink-0 rounded-xl' />
        <Skeleton className='h-9 w-20 shrink-0 rounded-xl' />
        <Skeleton className='h-9 w-32 shrink-0 rounded-xl' />
        <Skeleton className='h-9 w-24 shrink-0 rounded-xl' />
      </div>
    </div>
  );
}

export function MenuItemCardSkeleton() {
  return (
    <div className='flex items-start justify-between gap-3 rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-xs'>
      <div className='flex flex-1 flex-col justify-between self-stretch pe-2 space-y-2'>
        <div className='space-y-1.5'>
          <Skeleton className='h-5 w-3/4 rounded-md' />
          <Skeleton className='h-3.5 w-full rounded-md' />
          <Skeleton className='h-3.5 w-2/3 rounded-md' />
        </div>
        <div className='flex items-end justify-between pt-2'>
          <Skeleton className='h-5 w-20 rounded-md' />
          <Skeleton className='h-8 w-20 rounded-xl' />
        </div>
      </div>

      <Skeleton className='h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl' />
    </div>
  );
}

export function StorefrontSkeleton() {
  return (
    <div className='space-y-6'>
      <StoreHeaderSkeleton />
      <FeaturedDealsCarouselSkeleton />
      <CategoryNavSkeleton />

      <div className='space-y-8 pt-2'>
        {[1, 2].map((catIdx) => (
          <div key={catIdx} className='space-y-4'>
            <div className='flex items-center justify-between border-b border-border/60 pb-2'>
              <Skeleton className='h-6 w-36 rounded-md' />
              <Skeleton className='h-4 w-16 rounded-md' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4'>
              {[1, 2, 3, 4].map((dishIdx) => (
                <MenuItemCardSkeleton key={dishIdx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
