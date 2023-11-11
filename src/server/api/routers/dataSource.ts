import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DataSourceService } from "~/server/services/DataSourceService";

export const dataSourceRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        type: z.enum(["POSTGRES"]),
        postgresConfig: z
          .object({
            id: z.string().optional(),
            host: z.string(),
            port: z.coerce.number(),
            database: z.string(),
            user: z.string(),
            password: z.string(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const sourceData = {
        id: input.id,
        name: input.name,
        type: input.type,
      };
      if (input.postgresConfig) {
        return await ctx.db.dataSource.update({
          where: { id: input.id },
          data: {
            ...sourceData,
            postgresConfig: {
              upsert: {
                create: input.postgresConfig,
                update: input.postgresConfig,
              },
            },
          },
        });
      }
      return await ctx.db.dataSource.update({
        where: { id: input.id },
        data: sourceData,
      });
    }),

  connect: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const dataSource = await ctx.db.dataSource.findFirst({
        where: { id: input.id },
        include: { postgresConfig: true },
      });
      if (!dataSource) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No data source found for the given ID",
        });
      }
      if (!dataSource.postgresConfig) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No data source config for the given data source",
        });
      }
      const dataSourceService = new DataSourceService(
        dataSource.postgresConfig,
      );
      try {
        return dataSourceService.getSchema();
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        });
      }
    }),
});
