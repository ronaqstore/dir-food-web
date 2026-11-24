import { queryOptions, useQuery } from '@tanstack/react-query';
import { restaurantService } from './restaurant.service';
import type { PublicRestaurantProfile, RestaurantMenuResponse } from './types';

export const restaurantKeys = {
  all: ['restaurant'] as const,
  profile: (slug: string) => [...restaurantKeys.all, 'profile', slug] as const,
  menu: (slug: string) => [...restaurantKeys.all, 'menu', slug] as const
};

export const restaurantProfileQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: restaurantKeys.profile(slug),
    queryFn: () => restaurantService.getProfile(slug),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  });

export const restaurantMenuQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: restaurantKeys.menu(slug),
    queryFn: () => restaurantService.getMenu(slug),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  });

export function useRestaurantProfileQuery(slug: string, initialData?: PublicRestaurantProfile) {
  return useQuery({
    ...restaurantProfileQueryOptions(slug),
    initialData
  });
}

export function useRestaurantMenuQuery(slug: string, initialData?: RestaurantMenuResponse) {
  return useQuery({
    ...restaurantMenuQueryOptions(slug),
    initialData
  });
}
