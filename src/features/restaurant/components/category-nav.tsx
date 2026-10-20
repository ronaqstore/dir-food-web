'use client';

import * as React from 'react';
import type { PublicMenuCategory } from '../api/types';

interface CategoryNavProps {
  categories: PublicMenuCategory[];
  activeCategoryId?: string;
  onSelectCategory?: (id: string) => void;
}

export function CategoryNav({ categories, activeCategoryId, onSelectCategory }: CategoryNavProps) {
  const handleScrollTo = (id: string) => {
    onSelectCategory?.(id);
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      const yOffset = -80; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (categories.length <= 1) return null;

  return (
    <div className='sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-background/95 backdrop-blur-md border-b border-border/70 overflow-x-auto scrollbar-none'>
      <div className='mx-auto flex max-w-5xl items-center gap-2'>
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type='button'
              onClick={() => handleScrollTo(cat.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span>{cat.name}</span>
              <span className='ms-1.5 opacity-70'>({cat.items.length})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
