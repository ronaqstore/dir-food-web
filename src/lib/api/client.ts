import { API_BASE_URL } from '@/config/env';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';

export type { ApiSuccessResponse, ApiErrorResponse };

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = json as ApiErrorResponse | null;
    const code = errorData?.error?.code ?? 'UNKNOWN_ERROR';
    const message = errorData?.error?.message ?? `Request failed with status ${response.status}`;
    throw new ApiError(code, message, response.status, errorData?.error?.details);
  }

  if (json && typeof json === 'object' && 'data' in json && 'meta' in json) {
    return json as T;
  }

  const successData = json as ApiSuccessResponse<T> | null;
  return (successData?.data !== undefined ? successData.data : json) as T;
}
