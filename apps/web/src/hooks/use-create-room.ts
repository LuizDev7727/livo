import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import createRoomHttp from '@/http/create-room.http';
import { queryClient } from '@/lib/react-query';
import type { Room } from '@/types/room';

export default function useCreateRoom() {
  return useMutation({
    mutationFn: createRoomHttp,
    onSuccess(data, variables, _) {
      const { roomId } = data;
      const { name, description } = variables;

      queryClient.setQueryData(['get-rooms'], (savedRooms: Room[]) => {
        return [
          ...savedRooms,
          {
            id: roomId,
            name,
            description,
            questionCount: 0,
            createdAt: new Date(),
          },
        ];
      });

      toast('Room created', {
        description: 'You can click outside this modal.',
      });
    },
  });
}
