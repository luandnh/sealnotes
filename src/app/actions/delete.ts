"use server"
import { redis } from "@/lib/redis";


export async function deleteNotes(params: string) {
  await redis.del(params);

  return { message: "Notes deleted!", params};
}
