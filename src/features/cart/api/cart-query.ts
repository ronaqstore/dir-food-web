import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { ValidateCartRequest, ValidateCartResponse } from '../types';

export function useValidateCart(request: ValidateCartRequest | null, enabled = true) {
  return useQuery<ValidateCartResponse>({
    queryKey: ['cart-validation', request?.restaurantSlug, request?.items, request?.deliveryAreaId],
    queryFn: async () => {
      if (!request || !request.restaurantSlug || request.items.length === 0) {
        throw new Error('Invalid cart validation payload');
      }
      return apiClient<ValidateCartResponse>('/public/cart/validate', {
        method: 'POST',
        body: JSON.stringify(request)
      });
    },
    enabled: Boolean(enabled && request && request.restaurantSlug && request.items.length > 0),
    staleTime: 10_000,
    refetchOnWindowFocus: 'always',
    retry: 1
  });
}
