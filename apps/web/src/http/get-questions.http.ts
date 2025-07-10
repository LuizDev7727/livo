import { api } from '@/lib/api';
import type { Question } from '@/types/question';

type Request = {
  roomId: string;
};

export default async function getQuestions({ roomId }: Request) {
  return await api.get(`rooms/${roomId}/questions`).json<Question[]>();
}
