import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export type SupabaseCookie = {
  name: string;
  value: string;
  options?: Partial<ResponseCookie>;
};
