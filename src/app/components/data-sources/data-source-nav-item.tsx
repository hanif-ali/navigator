import { DataSource, Document } from "@prisma/client";
import Link from "next/link";
import { Button } from "~/app/components/ui/button";

import { IconTrash } from "@tabler/icons-react";
import { prisma } from "~/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export function DataSourceNavItem(props: { dataSource: DataSource }) {
  const { dataSource } = props;

  const deleteDataSource = async (id: string) => {
    "use server";
    await prisma.dataSource.delete({
      where: { id },
    });
    if (dataSource.id === id) {
      redirect("/data-sources");
    }
    revalidatePath("/data-sources");
  };

  return (
    <div
      className="group relative flex h-6 cursor-default select-none items-center justify-between rounded-sm px-2 py-1 pl-5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      cmdk-item=""
      role="option"
      data-value="calendar"
    >
      <Link
        className="w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap"
        href={`/data-sources/${dataSource.id}/`}
      >
        {dataSource.name}
      </Link>
      <form
        className="hidden w-[20%] group-hover:inline-flex"
        action={deleteDataSource.bind(null, dataSource.id)}
      >
        <Button
          size="icon"
          className="h-6 w-6"
          variant="destructive"
          type="submit"
        >
          <IconTrash className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
