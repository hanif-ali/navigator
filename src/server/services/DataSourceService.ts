import { PostgresConfiguration } from "@prisma/client";
import { Pool } from "pg";
import { DataSourceWithConfiguration } from "~/app/data-sources/[id]/utils";

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
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
      );
    } catch (e) {
      throw new Error("Error while trying to run query");
    }
    return results.rows;
  }
}
