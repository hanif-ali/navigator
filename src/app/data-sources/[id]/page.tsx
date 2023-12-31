import { notFound } from "next/navigation";
import { prisma } from "~/prisma";

interface Props {
  params: { id: string };
}

export default async function DataSourcePage({ params }: Props) {
  const { id } = params;

  const dataSource = await prisma.dataSource.findFirst({
    where: { id },
    include: {
      postgresConfig: true,
    },
  });
  if (!dataSource) {
    return notFound();
  }
  return (
    <div>
      {dataSource.name}
      <a href={`/data-sources/${dataSource.id}/edit/`}>Edit</a>
    </div>
  );
}
