import { notFound } from "next/navigation";
import { prisma } from "~/prisma";

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
          <h1 className="mb-4 text-xl font-bold text-white">{document.name}</h1>
          <p className="text-sm text-white">{document.content}</p>
        </div>
      </main>
    </div>
  );
}
