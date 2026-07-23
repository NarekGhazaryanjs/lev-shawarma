/** Russian translations keyed by Armenian menu item name (trimmed). */
export const MENU_RU_BY_NAME: Record<
  string,
  { nameRu: string; descriptionRu: string }
> = {
  "Հավի շաուրմա": {
    nameRu: "Куриная шаурма",
    descriptionRu: "Лаваш, курица, свежие овощи, соус",
  },
  "Տավարի շաուրմա": {
    nameRu: "Говяжья шаурма",
    descriptionRu: "Говядина, свежая начинка, соус",
  },
  "LEV Set": {
    nameRu: "LEV Сет",
    descriptionRu: "Шаурма, картофель фри, соус, напиток",
  },
  "Big Set": {
    nameRu: "Большой сет",
    descriptionRu: "Двойное мясо, картофель фри, 2 соуса, напиток",
  },
  "կոկա-կոլա": {
    nameRu: "Кока-Кола",
    descriptionRu: "0,5 л",
  },
  "Խչոի փայծախի շաուրմա": {
    nameRu: "Шаурма из селезёнки Хчо",
    descriptionRu: "Острая шаурма из селезёнки Хчо",
  },
  "խչոի ջանդակ": {
    nameRu: "Пиявка Хчо",
    descriptionRu: "Пиявка Хчо",
  },
  "մկնկն": {
    nameRu: "Мышь",
    descriptionRu: "аааааааааааааааааааа",
  },
  "ապուրով խչո": {
    nameRu: "Хчо в супе",
    descriptionRu: "Хчо в супе",
  },
  "արբանյակ": {
    nameRu: "Спутник",
    descriptionRu: "Перец + кола",
  },
  "խչոի վիզ": {
    nameRu: "Усы Хчо",
    descriptionRu: "Измельчённые усы Хчо с кетчупом",
  },
  "լավ սալաթ": {
    nameRu: "Хороший салат",
    descriptionRu: "Вкусное блюдо в двух словах",
  },
  "աաաաաաաա": {
    nameRu: "аааааааа",
    descriptionRu: "аааааааааааааааааааааа",
  },
};

export function getMenuRuTranslation(name: string) {
  return MENU_RU_BY_NAME[name.trim()] ?? null;
}
