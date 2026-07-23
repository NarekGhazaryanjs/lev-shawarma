import { prisma } from "../src/lib/prisma";

async function main() {
  const items = await prisma.menuItem.findMany({
    where: { featured: true },
    select: {
      id: true,
      name: true,
      nameRu: true,
      description: true,
      descriptionRu: true,
      price: true,
    },
  });

  console.log(JSON.stringify(items, null, 2));
  await prisma.$disconnect();
}

main();
