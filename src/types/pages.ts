import type { ReactNode } from 'react';

export interface LocalePageParams {
  locale: string;
}

export interface LocalePageProps {
  params: Promise<LocalePageParams>;
}

export interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<LocalePageParams>;
}

export interface HomePageSearchParams {
  q?: string;
  category?: string;
  inStock?: string;
}

export interface HomePageProps {
  params: Promise<LocalePageParams>;
  searchParams?: Promise<HomePageSearchParams>;
}

export interface RestaurantPageParams {
  locale: string;
  slug: string;
}

export interface RestaurantPageProps {
  params: Promise<RestaurantPageParams>;
}
