'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCreateRoom from '@/hooks/use-create-room';
import {
  type CreateRoomFormType,
  createRoomSchema,
} from '@/schemas/create-room-schema';

export default function CreateRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomFormType>({
    resolver: zodResolver(createRoomSchema),
  });

  const { mutateAsync } = useCreateRoom();

  async function handleCreateRoom({ name, description }: CreateRoomFormType) {
    await mutateAsync({
      name,
      description,
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleCreateRoom)}>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input placeholder="React & Typescript" {...register('name')} />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          placeholder="Um projeto sobre como funciona...."
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          'Create Room'
        )}
      </Button>
    </form>
  );
}
