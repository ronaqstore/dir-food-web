import { apiClient } from '@/lib/api/client';
import type { PublicRestaurantProfile, RestaurantMenuResponse } from './types';

export const restaurantService = {
  async getProfile(slug: string): Promise<PublicRestaurantProfile> {
    return apiClient<PublicRestaurantProfile>(`/public/restaurants/${encodeURIComponent(slug)}`);
  },

  async getMenu(slug: string): Promise<RestaurantMenuResponse> {
    return apiClient<RestaurantMenuResponse>(
      `/public/restaurants/${encodeURIComponent(slug)}/menu`
    );
  }
};
