import { env } from '@livo/env';
import ky from 'ky';

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
});
