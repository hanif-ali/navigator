import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { prisma } from "~/prisma";
import { IconPlus } from "@tabler/icons-react";
import { DataSourceNavItem } from "./data-source-nav-item";

export async function DataSourcesMenu() {
  const dataSources = await prisma.dataSource.findMany();

  const createNewDataSource = async () => {
    "use server";
    const newDataSource = await prisma.dataSource.create({
      data: {
        name: "Test Data Source",
        description: "Test Description",
        type: "POSTGRES"
      },
    });
    redirect(`/data-sources/${newDataSource.id}`);
  };

  return (
    <div className="flex w-[220px] flex-col gap-2 border-r pt-4 text-sm font-semibold">
      <div className="flex items-center justify-between px-3">
        <div>Data Sources</div>
        <form action={createNewDataSource}>
          <Button
            className="rounded-full p-2 text-white"
            size="icon"
            variant="ghost"
          >
            <IconPlus />
          </Button>
        </form>
      </div>
      {dataSources.map((ds) => (
        <DataSourceNavItem dataSource={ds} />
      ))}
    </div>
  );
}
