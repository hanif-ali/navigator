import { notFound } from "next/navigation";
import { prisma } from "~/prisma";
import { DocumentEditor } from "./components/DocumentEditor";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const document = await prisma.document.findFirst({
    where: { id },
  });

  if (!document) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col overflow-auto">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-white">
          <DocumentEditor document={document} />
        </div>
      </main>
    </div>
  );
}
