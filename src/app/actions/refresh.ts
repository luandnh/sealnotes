"use server"
import { redis } from "@/lib/redis";

export const fetchData = async(mergedSlug: string) => {
    return await redis.get(mergedSlug);   
}