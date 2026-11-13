import { WHATSAPP_BASE_URL } from '@/config/env';

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0092')) {
    digits = `0${digits.slice(4)}`;
  } else if (digits.startsWith('92') && digits.length >= 12) {
    digits = `0${digits.slice(2)}`;
  }
  return digits;
}

export const RESERVED_PHONE_NUMBERS = [
  '03115514151',
  '03059596704',
  '03029825213',
  '03484894115'
] as const;

export function isReservedPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const normalized = normalizePhone(phone);
  return (RESERVED_PHONE_NUMBERS as readonly string[]).includes(normalized);
}

export const PUBLIC_ADMIN_CONTACTS = [
  {
    phone: '03029825213',
    display: '0302 9825213',
    whatsappUrl: `${WHATSAPP_BASE_URL}/923029825213`
  },
  {
    phone: '03484894115',
    display: '0348 4894115',
    whatsappUrl: `${WHATSAPP_BASE_URL}/923484894115`
  }
] as const;
