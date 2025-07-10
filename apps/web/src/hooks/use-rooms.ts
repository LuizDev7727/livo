import { useQuery } from '@tanstack/react-query';
import getRoomsHttp from '@/http/get-rooms.http';
import type { Room } from '@/types/room';

export default function useRooms() {
  return useQuery<Room[]>({
    queryKey: ['get-rooms'],
    queryFn: getRoomsHttp,
    refetchOnWindowFocus: false,
  });
}
