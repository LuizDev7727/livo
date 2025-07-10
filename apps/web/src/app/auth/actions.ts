'use server';

import { env } from '@livo/env';
import { redirect } from 'next/navigation';

// biome-ignore lint/suspicious/useAwait: I dont need to await a function
export async function signInWithYoutubeAction() {
  const googleURL = new URL('o/oauth2/v2/auth', 'https://accounts.google.com');

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  googleURL.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  googleURL.searchParams.set('redirect_uri', env.GOOGLE_REDIRECT_URI);
  googleURL.searchParams.set('response_type', 'code');
  googleURL.searchParams.set('include_granted_scopes', 'true');
  googleURL.searchParams.set('scope', scopes.join(' '));

  redirect(googleURL.toString());
}
