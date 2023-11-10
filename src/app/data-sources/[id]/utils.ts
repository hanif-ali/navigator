import { DataSource, PostgresConfiguration } from "@prisma/client";
import { z } from "zod";

export type DataSourceWithConfiguration = DataSource & {
  postgresConfig?: PostgresConfiguration;
};

export const dataSourceSchema = z.object(
	{
		id: z.string(),
		name: z.string(),
		type: z.string(),
		postgresConfigID: z.string().optional(),
		postgresConfig: z.object({
			id: z.string().optional(),
			host: z.string(),
			port: z.number(),
			database: z.string(),
			user: z.string(),
			password: z.string(),
		}).optional()
	}
)

export const validateDataSource = (dataSource: DataSourceWithConfiguration) => {
	
};
