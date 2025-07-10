import { api } from "@/lib/api"

type Request = {
  name: string
  description: string
}

type Response = {
  roomId: string
}

export default async function createRoomHttp(body:Request) {
  return await api.post<Response>('rooms',{
    json: body
  }).json()
}