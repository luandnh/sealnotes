import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { redis } from "@/lib/redis"; 

export const notesRouter = createTRPCRouter({
  save: publicProcedure
    .input(
      z.object({
        data: z.string().min(1, "Data is required"),
        params: z.string().min(1, "Params is required"),
      })
    )
    .mutation(async ({ input }) => {
      const { data, params } = input;

      try {
        await redis.set(params, data);
        return { message: "Data successfully saved!", params, data };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to save data to Redis.");
      }
    }),
});
