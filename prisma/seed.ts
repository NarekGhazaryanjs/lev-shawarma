import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { MENU_CATEGORIES } from "../src/lib/categories";
import { getMenuRuTranslation } from "../src/lib/menu-translations";

async function syncCategories() {
  const existing = await prisma.category.findMany();

  for (const category of existing) {
    if (!MENU_CATEGORIES.includes(category.name as (typeof MENU_CATEGORIES)[number])) {
      await prisma.category.delete({ where: { id: category.id } });
    }
  }

  for (const [index, name] of MENU_CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { name },
      update: { sortOrder: index },
      create: { name, sortOrder: index },
    });
  }
}

async function syncMenuTranslations() {
  const items = await prisma.menuItem.findMany({ select: { id: true, name: true } });

  for (const item of items) {
    const translation = getMenuRuTranslation(item.name);
    if (!translation) continue;

    await prisma.menuItem.update({
      where: { id: item.id },
      data: {
        nameRu: translation.nameRu,
        descriptionRu: translation.descriptionRu,
      },
    });
  }
}

async function main() {
  await syncCategories();
  await syncMenuTranslations();

  const itemCount = await prisma.menuItem.count();
  if (itemCount === 0) {
    const categories = await prisma.category.findMany();
    const shawarma = categories.find((category) => category.name === "Շաուրմա");
    const sets = categories.find((category) => category.name === "Սեթեր");

    if (shawarma) {
      await prisma.menuItem.create({
        data: {
          name: "Հավի շաուրմա",
          nameRu: "Куриная шаурма",
          price: "2,100 դր.",
          description: "Լավաշ, հավ, թարմ բանջարեղեն, սոուս",
          descriptionRu: "Лаваш, курица, свежие овощи, соус",
          image: "/placeholder-food.svg",
          featured: true,
          categoryId: shawarma.id,
        },
      });
    }

    if (sets) {
      await prisma.menuItem.create({
        data: {
          name: "LEV Set",
          nameRu: "LEV Сет",
          price: "4,900 դր.",
          description: "Շաուրմա, ֆրի, սոուս, խմիչք",
          descriptionRu: "Шаурма, картофель фри, соус, напиток",
          image: "/placeholder-food.svg",
          featured: true,
          categoryId: sets.id,
        },
      });
    }
  }

  if ((await prisma.galleryImage.count()) === 0) {
    for (let i = 0; i < 4; i += 1) {
      await prisma.galleryImage.create({
        data: {
          image: "/placeholder-food.svg",
          alt: "LEV Shawarma",
          sortOrder: i,
        },
      });
    }
  }

  await prisma.homePage.upsert({
    where: { id: 1 },
    update: {
      heroTaglineRu: "Свежая шаурма, сеты и быстрое обслуживание.",
      aboutTextRu:
        "ЛЕВ Шаурма — шаурма, сеты и гриль из свежих ингредиентов. Отличный вкус, быстрое обслуживание и удобное расположение на Мелкумова.",
      step1TitleRu: "Выберите из меню",
      step1TextRu: "Найдите блюдо и цену.",
      step2TitleRu: "Позвоните",
      step2TextRu: "Подтвердите заказ по телефону:",
      step3TitleRu: "Получите заказ",
      step3TextRu: "Доставка или самовывоз.",
    },
    create: {
      id: 1,
      heroTagline: "Թարմ շաուրմա, սեթեր և արագ սպասարկում։",
      heroTaglineRu: "Свежая шаурма, сеты и быстрое обслуживание.",
      aboutText:
        "ԼԵՎ Շաուրմա — թարմ բաղադրիչներով շաուրմա, սեթեր և գրիլ։ Լավ համ, արագ սպասարկում և հարմար տեղակայում Մելքումովում։",
      aboutTextRu:
        "ЛЕВ Шаурма — шаурма, сеты и гриль из свежих ингредиентов. Отличный вкус, быстрое обслуживание и удобное расположение на Мелкумова.",
      step1Title: "Ընտրեք մենյուից",
      step1TitleRu: "Выберите из меню",
      step1Text: "Գտեք ուտեստը և գինը։",
      step1TextRu: "Найдите блюдо и цену.",
      step2Title: "Զանգահարեք",
      step2TitleRu: "Позвоните",
      step2Text: "Հաստատեք պատվերը հեռախոսով՝",
      step2TextRu: "Подтвердите заказ по телефону:",
      step3Title: "Ստացեք պատվերը",
      step3TitleRu: "Получите заказ",
      step3Text: "Առաքում կամ վերցրեք տեղում։",
      step3TextRu: "Доставка или самовывоз.",
    },
  });

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      brandNameRu: "ЛЕВ Шаурма",
      addressRu: "Мелкумова 23/4, Ереван, Армения",
    },
    create: {
      id: 1,
      brandName: "LEV Shawarma",
      brandNameHy: "ԼԵՎ Շաուրմա",
      brandNameRu: "ЛЕВ Шаурма",
      phone: "+374 93 636655",
      address: "Melkumov 23/4, Yerevan, Armenia",
      addressRu: "Мелкумова 23/4, Ереван, Армения",
      instagram: "https://www.instagram.com/lev_shawarma",
      facebook:
        "https://www.facebook.com/p/%D4%BC%D4%B5%D5%8E-%D5%87%D5%A1%D5%B8%D6%82%D6%80%D5%B4%D5%A1LEV-Shawarma-100090993925155/",
    },
  });

  await prisma.aboutPage.upsert({
    where: { id: 1 },
    update: {
      labelRu: "О нас",
      titleRu: "LEV Shawarma",
      introRu: "Свежая шаурма, сеты и быстрое обслуживание в центре Еревана.",
      paragraph1Ru:
        "ЛЕВ Шаурма предлагает шаурму, сеты и гриль из свежих ингредиентов. Мы верим в простые вещи: хороший вкус, чистая атмосфера и приятный сервис.",
      paragraph2Ru:
        "Наша команда каждый день готовит блюда свежими и быстро, чтобы каждый гость получил качественный и вкусный обед.",
    },
    create: {
      id: 1,
      label: "Մեր մասին",
      labelRu: "О нас",
      title: "LEV Shawarma",
      titleRu: "LEV Shawarma",
      intro: "Թարմ շաուրմա, սեթեր և արագ սպասարկում Երևանի սրտում։",
      introRu: "Свежая шаурма, сеты и быстрое обслуживание в центре Еревана.",
      paragraph1:
        "ԼԵՎ Շաուրման թարմ բաղադրիչներով շաուրմա, սեթեր և գրիլ է առաջարկում։ Մենք հավատում ենք պարզ բանին՝ լավ համ, մաքուր մթնոլորտ և հաճելի սպասարկում։",
      paragraph1Ru:
        "ЛЕВ Шаурма предлагает шаурму, сеты и гриль из свежих ингредиентов. Мы верим в простые вещи: хороший вкус, чистая атмосфера и приятный сервис.",
      paragraph2:
        "Մեր թիմը ամեն օր պատրաստում է ուտեստները թարմ և արագ, որպեսզի յուրաքանչյուր հաճախորդ ստանա որակյալ և համեղ ճաշ։",
      paragraph2Ru:
        "Наша команда каждый день готовит блюда свежими и быстро, чтобы каждый гость получил качественный и вкусный обед.",
      image: "/images/hero.png",
    },
  });

  await prisma.deliveryPage.upsert({
    where: { id: 1 },
    update: {
      labelRu: "Доставка",
      titleRu: "Доставка по Еревану",
      introRu: "Закажите LEV Shawarma и получите домой — горячим и свежим.",
      paragraph1Ru:
        "Мы доставляем по Еревану. Заказ можно оформить по телефону, выбрав блюда из меню.",
      paragraph2Ru:
        "Время доставки зависит от объёма заказа и адреса. Для подробностей звоните нам.",
      step1TitleRu: "Выберите из меню",
      step1TextRu: "Посмотрите меню, выберите блюда и укажите количество.",
      step2TitleRu: "Позвоните",
      step2TextRu: "Позвоните +374 93 636655 и подтвердите заказ.",
      step3TitleRu: "Получите доставку",
      step3TextRu: "Готовим блюда и доставляем по указанному адресу.",
    },
    create: {
      id: 1,
      label: "Առաքում",
      labelRu: "Доставка",
      title: "Առաքում Երևանում",
      titleRu: "Доставка по Еревану",
      intro: "Պատվիրեք LEV Shawarma-ն և ստացեք տանը՝ տաք ու թարմ։",
      introRu: "Закажите LEV Shawarma и получите домой — горячим и свежим.",
      paragraph1:
        "Մենք առաքում ենք Երևանի տարածքում։ Պատվերը կարող եք կատարել հեռախոսով՝ ընտրելով մենյուից ձեր նախընտրած ուտեստները։",
      paragraph1Ru:
        "Мы доставляем по Еревану. Заказ можно оформить по телефону, выбрав блюда из меню.",
      paragraph2:
        "Առաքման ժամանակը կախված է պատվերի ծավալից և տեղակայումից։ Մանրամասների համար զանգահարեք մեզ։",
      paragraph2Ru:
        "Время доставки зависит от объёма заказа и адреса. Для подробностей звоните нам.",
      image: "/images/hero.png",
      step1Title: "Ընտրեք մենյուից",
      step1TitleRu: "Выберите из меню",
      step1Text: "Դիտեք մենյուն, ընտրեք ուտեստները և նշեք քանակը։",
      step1TextRu: "Посмотрите меню, выберите блюда и укажите количество.",
      step2Title: "Զանգահարեք",
      step2TitleRu: "Позвоните",
      step2Text: "Զանգահարեք +374 93 636655 և հաստատեք պատվերը։",
      step2TextRu: "Позвоните +374 93 636655 и подтвердите заказ.",
      step3Title: "Ստացեք առաքումը",
      step3TitleRu: "Получите доставку",
      step3Text: "Պատրաստում ենք ուտեստները և առաքում ձեր նշված հասցեով։",
      step3TextRu: "Готовим блюда и доставляем по указанному адресу.",
    },
  });

  await prisma.contactPage.upsert({
    where: { id: 1 },
    update: {
      labelRu: "Контакты",
      titleRu: "Свяжитесь с нами",
      introRu: "Приходите к нам, звоните или пишите в соцсетях.",
      paragraph1Ru:
        "LEV Shawarma находится по адресу Мелкумова 23/4 в центре Еревана. Мы всегда рады видеть и обслуживать вас.",
      paragraph2Ru:
        "По вопросам заказов, доставки или другим вопросам звоните нам в рабочее время. Мы постараемся ответить как можно быстрее.",
    },
    create: {
      id: 1,
      label: "Կապ",
      labelRu: "Контакты",
      title: "Կապ մեզ հետ",
      titleRu: "Свяжитесь с нами",
      intro: "Մեզ մոտ եկեք, զանգահարեք կամ գրեք սոցիալական ցանցերում։",
      introRu: "Приходите к нам, звоните или пишите в соцсетях.",
      paragraph1:
        "LEV Shawarma-ն գտնվում է Մելքումով 23/4 հասցեում՝ Երևանի կենտրոնում։ Մենք միշտ ուրախ ենք ձեզ տեսնելու և սպասարկելու։",
      paragraph1Ru:
        "LEV Shawarma находится по адресу Мелкумова 23/4 в центре Еревана. Мы всегда рады видеть и обслуживать вас.",
      paragraph2:
        "Պատվերների, առաքման կամ հարցերի դեպքում զանգահարեք մեզ աշխատանքային ժամերին։ Մենք հնարավորինս արագ կպատասխանենք։",
      paragraph2Ru:
        "По вопросам заказов, доставки или другим вопросам звоните нам в рабочее время. Мы постараемся ответить как можно быстрее.",
      image: "/images/hero.png",
    },
  });

  const admin = await prisma.admin.findUnique({ where: { username: "admin" } });
  if (!admin) {
    const passwordHash = await bcrypt.hash("levadmin", 10);
    await prisma.admin.create({
      data: {
        username: "admin",
        password: passwordHash,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
