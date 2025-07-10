import { PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateRoomForm from './create-room-form';
import RoomList from './rooms-list';

export const metadata: Metadata = {
  title: 'Rooms | Livo',
};

export default function Rooms() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="font-medium text-xl">Rooms</h1>
          <p className="text-muted-foreground text-sm">
            Here you can see all the rooms created and you can create your.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="size-5" />
              Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create room</DialogTitle>
              <DialogDescription>
                Create your room and start to get answers from your live.
              </DialogDescription>
            </DialogHeader>
            <CreateRoomForm />
          </DialogContent>
        </Dialog>
      </div>

      <RoomList />
    </div>
  );
}
