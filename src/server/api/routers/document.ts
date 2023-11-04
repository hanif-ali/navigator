import { z } from "zod";
import { OutputData as EditorJSOutputData } from "@editorjs/editorjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const documentRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        content: z.record(z.any()).optional(),
        icon: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.document.update({
        where: { id: input.id },
        data: { name: input.name, content: input.content, icon: input.icon },
      });
    }),
});
