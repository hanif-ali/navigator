import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.document.upsert({
    where: {
      id: "61d6fb8a-b658-4313-96f9-608d3b3a0ae9",
      name: "Sample Document 1",
    },
    update: {},
    create: {
      id: "61d6fb8a-b658-4313-96f9-608d3b3a0ae9",
      name: "Sample Document 1",
      content: "This is a sample document content.\n\n This is the second line",
    },
  });
  await prisma.document.upsert({
    where: {
      id: "62d6fb8a-b658-4313-96f9-608d3b3a0ae9",
      name: "Sample Document 1",
    },
    update: {},
    create: {
      id: "62d6fb8a-b658-4313-96f9-608d3b3a0ae9",
      name: "Sample Document 2",
      content: "This is a sample document content.\n\n This is the second line",
    },
  });
  console.log("✅ Database seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
