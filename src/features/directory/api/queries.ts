import { queryOptions, useQuery } from '@tanstack/react-query';
import { directoryService } from './directory.service';
import type { QueryPublicRestaurantsParams } from './types';

export const directoryKeys = {
  all: ['directory'] as const,
  areas: () => [...directoryKeys.all, 'areas'] as const,
  restaurants: (params: QueryPublicRestaurantsParams) =>
    [...directoryKeys.all, 'restaurants', params] as const
};

export const areasQueryOptions = () =>
  queryOptions({
    queryKey: directoryKeys.areas(),
    queryFn: () => directoryService.getAreas(),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

export const restaurantsQueryOptions = (params: QueryPublicRestaurantsParams = {}) =>
  queryOptions({
    queryKey: directoryKeys.restaurants(params),
    queryFn: () => directoryService.getRestaurants(params),
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true
  });

export function usePublicAreasQuery() {
  return useQuery(areasQueryOptions());
}

export function usePublicRestaurantsQuery(params: QueryPublicRestaurantsParams = {}) {
  return useQuery(restaurantsQueryOptions(params));
}
