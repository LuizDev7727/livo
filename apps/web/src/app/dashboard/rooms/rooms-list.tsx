'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import useRooms from '@/hooks/use-rooms';
import { dayjs } from '@/lib/day-js';
import RoomsLoading from './rooms-loading';

export default function RoomList() {
  const { data: rooms = [], isLoading } = useRooms();

  if (isLoading) {
    return <RoomsLoading />;
  }

  const hasRooms = rooms.length > 0;

  return (
    <div className="mt-4 space-y-4">
      {hasRooms ? (
        rooms.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
              href={`/dashboard/rooms/${room.id}`}
              key={room.id}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">${room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant={'secondary'}>
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge className="text-xs" variant={'secondary'}>
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>
              <p className="hover:underline">Access Room</p>
            </Link>
          );
        })
      ) : (
        <p className="text-muted-foreground">0 Rooms </p>
      )}
    </div>
  );
}
