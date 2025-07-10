import { api } from '@/lib/api';

type Request = {
  code: string;
};

type Response = {
  token: string;
};

export default async function signInWithGoogle(body: Request) {
  const { token } = await api
    .post('auth/google', {
      json: body,
    })
    .json<Response>();

  return { token };
}
