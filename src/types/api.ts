export interface ApiErrorDetails {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiSuccessResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  error: ApiErrorDetails;
}
