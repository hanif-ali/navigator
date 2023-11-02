import { Document } from "@prisma/client";
import Link from "next/link";
import { Button } from "~/components/ui/button";

import { IconTrash } from "@tabler/icons-react";
import { prisma } from "~/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export function DocumentNavItem(props: { document: Document }) {
  const { document } = props;

  const deleteDocument = async (id: string) => {
    "use server";
    await prisma.document.delete({
      where: { id },
    });
    if (document.id === id){
      redirect("/documents")
    }
    revalidatePath("/documents");
  };

  return (
    <div className="hover:bg-dark-100 flex h-8 items-center px-3 pl-6 leading-10">
      <div
        className="group flex w-full items-center justify-between rounded-lg "
      >
        <Link className="m-w-[80%]" href={`/documents/${document.id}/`}>{document.name}</Link>
        
        <form
          className="hidden w-[20%] group-hover:inline-flex"
          action={deleteDocument.bind(null, document.id)}
        >
          <Button size="icon" variant="destructive" type="submit">
            <IconTrash />
          </Button>
        </form>
      </div>
    </div>
  );
}
