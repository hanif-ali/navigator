import { DataSource, PostgresConfiguration } from "@prisma/client";
import { z } from "zod";

export type DataSourceWithConfiguration = DataSource & {
  postgresConfig?: PostgresConfiguration;
};

export const dataSourceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.string(),
  postgresConfigID: z.string().optional(),
  postgresConfig: z
    .object({
      id: z.string().optional(),
      host: z.string().min(1),
      port: z.coerce.number().min(1),
      database: z.string().min(1),
      user: z.string().min(1),
      password: z.string().min(1),
    })
    .optional(),
});

export const validateDataSource = (
  dataSource: DataSourceWithConfiguration,
) => {};
