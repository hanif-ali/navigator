import { notFound } from "next/navigation";
import { prisma } from "~/prisma";
import { DataSourceForm } from "./form";

interface Props {
  params: { id: string };
}
export default async function DataSourcePage({ params }: Props) {
  const { id } = params;

  const dataSource = await prisma.dataSource.findFirst({
    where: { id },
    include: {
      postgresConfig: true
    }
  });
  if (!dataSource) {
    return notFound();
  }

  return (
    <div className="container mt-6">
      <h1 className="text-xl font-bold">{dataSource.name}</h1>
      <DataSourceForm dataSource={dataSource} />
    </div>
  );
}
