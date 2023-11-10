import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dataSourceRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        type: z.enum(['POSTGRES'])
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.dataSource.update({
        where: { id: input.id },
        data: { name: input.name, type: input.type },
      });
    }),
});
