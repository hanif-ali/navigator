import { redirect } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import { prisma } from "~/prisma";
import { IconPlus } from "@tabler/icons-react";
import { DocumentNavItem } from "./document-nav-item";

export async function DocumentsMenu() {
  const documents = await prisma.document.findMany();

  const createNewDocument = async () => {
    "use server";
    const newDocument = await prisma.document.create({
      data: {
        name: "Untitled",
        content: "",
      },
    });
    redirect(`/documents/${newDocument.id}`);
  };

  return (
    <div className="flex w-[220px] flex-col gap-2 border-r pt-4 text-sm font-semibold">
      <div className="flex items-center justify-between px-3">
        <div>Documents</div>
        <form action={createNewDocument}>
          <Button
            className="rounded-full p-2 text-white"
            size="icon"
            variant="ghost"
          >
            <IconPlus />
            <span className="sr-only">New Document</span>
          </Button>
        </form>
      </div>
      {documents.map((document) => (
        <DocumentNavItem document={document} />
      ))}
    </div>
  );
}
