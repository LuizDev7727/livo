import { api } from '@/lib/api';

type Request = {
  question: string;
  roomId: string;
};

type Response = {
  questionId: string;
  answer: string | null;
  createdAt: Date;
};

export default async function createQuestionHttp({
  question,
  roomId,
}: Request) {
  const body = {
    question,
  };
  return await api
    .post(`rooms/${roomId}/questions`, {
      json: body,
    })
    .json<Response>();
}
