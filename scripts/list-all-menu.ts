import { prisma } from "../src/lib/prisma";

async function main() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      nameRu: true,
      description: true,
      descriptionRu: true,
      price: true,
      featured: true,
      category: { select: { name: true } },
    },
  });

  console.log(JSON.stringify(items, null, 2));
  await prisma.$disconnect();
}

main();
