import { z } from 'zod/v4'

export const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Room name must contain at least 3 caracter(s)' }),
  description: z.string().min(6, { message: 'Room description must contain at least 3 caracter(s)' }),
})

export type CreateRoomFormType = z.infer<typeof createRoomSchema>