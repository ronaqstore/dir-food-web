import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderDetailsSkeleton() {
  return (
    <div className='min-h-[85vh] bg-muted/20 py-8 sm:py-12'>
      <div className='mx-auto max-w-2xl px-4 sm:px-6 space-y-6'>
        {/* Success Card Header Skeleton */}
        <div className='rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-center shadow-xs space-y-4'>
          {/* Circular badge */}
          <div className='mx-auto flex size-16 items-center justify-center rounded-full'>
            <Skeleton className='size-16 rounded-full' />
          </div>

          <div className='space-y-2 flex flex-col items-center'>
            <Skeleton className='h-8 w-64 rounded-lg' />
            <Skeleton className='h-4 w-80 max-w-full rounded-md' />
          </div>

          {/* Reference Code Box */}
          <div className='inline-flex items-center justify-center gap-3 rounded-2xl border border-border bg-background px-6 py-3 shadow-xs'>
            <div className='space-y-1.5'>
              <Skeleton className='h-3 w-20 rounded-sm' />
              <Skeleton className='h-6 w-32 rounded-md' />
            </div>
            <Skeleton className='size-9 rounded-xl' />
          </div>

          {/* WhatsApp Button Skeleton */}
          <div className='pt-2 space-y-2'>
            <Skeleton className='h-14 w-full rounded-2xl' />
            <Skeleton className='h-3 w-48 mx-auto rounded-sm' />
          </div>
        </div>

        {/* Copy Message Card Skeleton */}
        <div className='rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-2'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-44 rounded-md' />
            <Skeleton className='h-7 w-24 rounded-lg' />
          </div>
          <Skeleton className='h-3.5 w-64 rounded-md' />
        </div>

        {/* Order Details Breakdown Card Skeleton */}
        <div className='rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4'>
          <div className='border-b border-border pb-3'>
            <Skeleton className='h-5 w-32 rounded-md' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='flex items-center gap-2.5'>
              <Skeleton className='size-7 rounded-lg' />
              <div className='space-y-1'>
                <Skeleton className='h-4 w-28 rounded-md' />
                <Skeleton className='h-3 w-20 rounded-md' />
              </div>
            </div>
            <div className='flex items-center gap-2.5'>
              <Skeleton className='size-7 rounded-lg' />
              <div className='space-y-1'>
                <Skeleton className='h-4 w-32 rounded-md' />
                <Skeleton className='h-3 w-24 rounded-md' />
              </div>
            </div>
          </div>

          {/* Items breakdown list */}
          <div className='border-t border-border/60 pt-3 space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center justify-between'>
                <Skeleton className='h-4 w-36 rounded-md' />
                <Skeleton className='h-4 w-16 rounded-md' />
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className='border-t border-border/60 pt-3 flex justify-between items-center'>
            <Skeleton className='h-5 w-20 rounded-md' />
            <Skeleton className='h-6 w-24 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
