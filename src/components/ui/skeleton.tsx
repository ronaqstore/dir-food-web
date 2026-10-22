import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.ComponentProps<'div'> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot='skeleton'
      className={cn('animate-shimmer rounded-md bg-muted/70', className)}
      {...props}
    />
  );
}
