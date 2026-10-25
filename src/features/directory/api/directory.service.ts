import { apiClient } from '@/lib/api/client';
import type {
  PublicCity,
  PublicArea,
  PublicRestaurantsResponse,
  QueryPublicRestaurantsParams
} from './types';

export const directoryService = {
  async getCities(): Promise<PublicCity[]> {
    return apiClient<PublicCity[]>('/public/cities');
  },

  async getAreas(cityId?: string): Promise<PublicArea[]> {
    return apiClient<PublicArea[]>(
      `/public/areas${cityId ? `?cityId=${encodeURIComponent(cityId)}` : ''}`
    );
  },

  async getRestaurants(
    params: QueryPublicRestaurantsParams = {}
  ): Promise<PublicRestaurantsResponse> {
    const searchParams = new URLSearchParams();

    if (params.cityId) searchParams.set('cityId', params.cityId);
    if (params.areaId) searchParams.set('areaId', params.areaId);
    if (params.cuisine) searchParams.set('cuisine', params.cuisine);
    if (params.q && params.q.trim().length >= 2) searchParams.set('q', params.q.trim());
    if (params.openNow !== undefined) searchParams.set('openNow', String(params.openNow));
    if (params.page) searchParams.set('page', String(params.page));
    if (params.limit) searchParams.set('limit', String(params.limit));

    const queryString = searchParams.toString();
    const endpoint = `/public/restaurants${queryString ? `?${queryString}` : ''}`;
    return apiClient<PublicRestaurantsResponse>(endpoint);
  }
};
