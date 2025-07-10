import { api } from '@/lib/api';

type Request = {
  roomId: string;
  body: FormData;
};

export default async function uploadAudioHttp({ roomId, body }: Request) {
  await api.post(`rooms/${roomId}/audio`, {
    body,
  });
}
