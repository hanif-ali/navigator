import Link from "next/link";
import { prisma } from "~/prisma";

export async function SideBar() {
  const documents = await prisma.document.findMany();
  return (
    <nav className="min-h-screen w-56 flex-none border-r px-2 pt-10">
      {documents.map((doc) => (
        <div>
          <Link href={`/documents/${doc.id}`}>{doc.name}</Link>
        </div>
      ))}
    </nav>
  );
}
