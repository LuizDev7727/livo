import { useQuery } from '@tanstack/react-query';
import getQuestions from '@/http/get-questions.http';

export default function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: () => getQuestions({ roomId }),
  });
}
