"use server"
import { redis } from "@/lib/redis";
import { encrypt } from "@/app/utils/vault";

export async function saveNotes(params: string, values: string, hash: string) {
  const encryptedNotes = encrypt(values, hash);
  await redis.set(params, encryptedNotes);

  return { message: "Notes encrypted and stored safely!", params, encryptedNotes };
}
