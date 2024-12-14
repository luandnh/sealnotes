"use server"
import { redis } from "@/lib/redis";

export async function saveNotes(params: string, encryptedNotes: string) {
  await redis.set(params, encryptedNotes);

  return { message: "Notes encrypted and stored safely!", params, encryptedNotes };
}
