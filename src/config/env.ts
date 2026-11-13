export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3011',
  NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:3012'
} as const;

export const API_BASE_URL = env.NEXT_PUBLIC_API_URL;
export const ADMIN_URL = env.NEXT_PUBLIC_ADMIN_URL;
export const WHATSAPP_BASE_URL = 'https://wa.me';
