import { PostgresConfiguration } from "@prisma/client";
import { Pool } from "pg";
import { DataSourceWithConfiguration } from "~/app/data-sources/[id]/edit/utils";

export class DataSourceService {
  config: PostgresConfiguration;
  pool: Pool;

  constructor(config: PostgresConfiguration) {
    this.config = config;
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }
  async getSchema() {
    let client;
    try {
      client = await this.pool.connect();
    } catch (e) {
      throw new Error("Error while trying to connect to the Postgres database");
    }
    let results;
    try {
      results = await client.query(
        `select
        t.table_name,
        array_agg(c.column_name::text) as columns
    from
        information_schema.tables t
    inner join information_schema.columns c on
        t.table_name = c.table_name
    where
        t.table_schema = 'public'
        and t.table_type= 'BASE TABLE'
        and c.table_schema = 'public'
    group by t.table_name;`,
      );
    } catch (e) {
      throw new Error("Error while trying to run query");
    }
    return results.rows.map((row) => ({
      name: row.table_name,
      alias: row.table_name,
      description: "",
      postgresConfigId: this.config.id,
      columns: row.columns.map((columnName: string) => ({
        name: columnName,
        alias: columnName,
        description: "",
      })),
    }));
  }
}
