import { api } from "@/lib/api";
import { Room } from "@/types/room";

export default async function getRoomsHttp(): Promise<Room[]> {
  return await api.get<Room[]>('rooms').json()
}