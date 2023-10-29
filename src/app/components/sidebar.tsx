import { prisma } from "~/prisma";

export async function SideBar() {
  const navigatorDocuments = await prisma.navigatorDocument.findMany();
  return (
    <nav className="w-56 flex-none border-r px-2 pt-10">
      {navigatorDocuments.map((ng) => (
        <div>{ng.name}</div>
      ))}
    </nav>
  );
}
