import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { CreateOrderIntentPayload, OrderIntentResponse } from '../types';

export function useCreateOrderIntent() {
  return useMutation<OrderIntentResponse, Error, CreateOrderIntentPayload>({
    mutationFn: async (payload: CreateOrderIntentPayload) => {
      return apiClient<OrderIntentResponse>('/public/order-intents', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }
  });
}

export function useOrderIntent(reference: string | null) {
  return useQuery<OrderIntentResponse>({
    queryKey: ['order-intent', reference],
    queryFn: async () => {
      if (!reference) throw new Error('Reference is required');
      return apiClient<OrderIntentResponse>(
        `/public/order-intents/${encodeURIComponent(reference)}`
      );
    },
    enabled: Boolean(reference),
    staleTime: 5_000,
    refetchOnWindowFocus: 'always',
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'COMPLETED' || status === 'CANCELLED') {
        return false;
      }
      return 15_000;
    },
    retry: 1
  });
}

export function useRecordWhatsAppOpened() {
  return useMutation<{ status: string }, Error, string>({
    mutationFn: async (reference: string) => {
      return apiClient<{ status: string }>(
        `/public/order-intents/${encodeURIComponent(reference)}/whatsapp-opened`,
        {
          method: 'POST'
        }
      );
    }
  });
}
