import { queryOptions, useQuery } from '@tanstack/react-query';
import { directoryService } from './directory.service';
import type { QueryPublicRestaurantsParams } from './types';

export const directoryKeys = {
  all: ['directory'] as const,
  cities: () => [...directoryKeys.all, 'cities'] as const,
  areas: (cityId?: string) => [...directoryKeys.all, 'areas', cityId] as const,
  restaurants: (params: QueryPublicRestaurantsParams) =>
    [...directoryKeys.all, 'restaurants', params] as const
};

export const citiesQueryOptions = () =>
  queryOptions({
    queryKey: directoryKeys.cities(),
    queryFn: () => directoryService.getCities(),
    staleTime: 10 * 60 * 1000 // 10 minutes
  });

export const areasQueryOptions = (cityId?: string) =>
  queryOptions({
    queryKey: directoryKeys.areas(cityId),
    queryFn: () => directoryService.getAreas(cityId),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

export const restaurantsQueryOptions = (params: QueryPublicRestaurantsParams = {}) =>
  queryOptions({
    queryKey: directoryKeys.restaurants(params),
    queryFn: () => directoryService.getRestaurants(params),
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true
  });

export function usePublicCitiesQuery() {
  return useQuery(citiesQueryOptions());
}

export function usePublicAreasQuery(cityId?: string) {
  return useQuery(areasQueryOptions(cityId));
}

export function usePublicRestaurantsQuery(params: QueryPublicRestaurantsParams = {}) {
  return useQuery(restaurantsQueryOptions(params));
}
