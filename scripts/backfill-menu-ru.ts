import "dotenv/config";
import { getMenuRuTranslation } from "../src/lib/menu-translations";
import { prisma } from "../src/lib/prisma";

async function main() {
  const items = await prisma.menuItem.findMany({
    select: { id: true, name: true, nameRu: true, descriptionRu: true },
  });

  let updated = 0;

  for (const item of items) {
    const translation = getMenuRuTranslation(item.name);
    if (!translation) {
      console.log(`skip (no translation): ${item.id} "${item.name}"`);
      continue;
    }

    const needsUpdate =
      item.nameRu !== translation.nameRu || item.descriptionRu !== translation.descriptionRu;

    if (!needsUpdate) {
      console.log(`ok: ${item.id} "${item.name}"`);
      continue;
    }

    await prisma.menuItem.update({
      where: { id: item.id },
      data: {
        nameRu: translation.nameRu,
        descriptionRu: translation.descriptionRu,
      },
    });

    updated += 1;
    console.log(`updated: ${item.id} "${item.name}" -> "${translation.nameRu}"`);
  }

  console.log(`\nDone. Updated ${updated} of ${items.length} items.`);
  await prisma.$disconnect();
}

main();
