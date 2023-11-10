import { Document } from "@prisma/client";
import Link from "next/link";
import { Button } from "~/app/components/ui/button";

import { IconTrash } from "@tabler/icons-react";
import { prisma } from "~/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { IconSelector } from "~/app/components/documents/icon-selector";

export function DocumentNavItem(props: { document: Document }) {
  const { document } = props;

  const deleteDocument = async (id: string) => {
    "use server";
    await prisma.document.delete({
      where: { id },
    });
    if (document.id === id) {
      redirect("/documents");
    }
    revalidatePath("/documents");
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
        href={`/documents/${document.id}/`}
      >
        <span className="mr-2">{document.icon}</span>{document.name}
      </Link>
      <form
        className="hidden w-[20%] group-hover:inline-flex"
        action={deleteDocument.bind(null, document.id)}
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
