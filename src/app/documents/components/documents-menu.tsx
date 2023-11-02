import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { prisma } from "~/prisma";

export default async function DocumentsMenu() {
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
    <div className="min-w-[200px] border-r bg-black pt-4">
      <div className="flex flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium text-white">
            <div className="flex flex-row items-center font-semibold text-white">
              <div className="flex-1">Documents</div>
              <form action={createNewDocument}>
                <Button
                  className="rounded-full text-white"
                  size="icon"
                  variant="ghost"
                >
                  <PlusIcon />
                  <span className="sr-only">New Note</span>
                </Button>
              </form>
            </div>
            {documents.map((document) => (
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:text-gray-300"
                href={`/documents/${document.id}/`}
              >
                {document.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
