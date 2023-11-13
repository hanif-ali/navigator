-- CreateTable
CREATE TABLE "PostgresTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postgresConfigId" TEXT NOT NULL,

    CONSTRAINT "PostgresTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostgresColumn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postgresTableId" TEXT NOT NULL,

    CONSTRAINT "PostgresColumn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostgresTable" ADD CONSTRAINT "PostgresTable_postgresConfigId_fkey" FOREIGN KEY ("postgresConfigId") REFERENCES "PostgresConfiguration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostgresColumn" ADD CONSTRAINT "PostgresColumn_postgresTableId_fkey" FOREIGN KEY ("postgresTableId") REFERENCES "PostgresTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
