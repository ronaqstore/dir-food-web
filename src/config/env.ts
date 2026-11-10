export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3011'
} as const;

export const API_BASE_URL = env.NEXT_PUBLIC_API_URL;
