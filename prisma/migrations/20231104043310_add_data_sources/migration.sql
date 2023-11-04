-- CreateEnum
CREATE TYPE "DataSourceType" AS ENUM ('POSTGRES');

-- CreateTable
CREATE TABLE "DataSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "DataSourceType" NOT NULL,
    "postgresConfigId" TEXT,

    CONSTRAINT "DataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostgresConfiguration" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "database" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PostgresConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataSource_postgresConfigId_key" ON "DataSource"("postgresConfigId");

-- AddForeignKey
ALTER TABLE "DataSource" ADD CONSTRAINT "DataSource_postgresConfigId_fkey" FOREIGN KEY ("postgresConfigId") REFERENCES "PostgresConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
