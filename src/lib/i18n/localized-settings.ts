import type { Locale } from "@/lib/i18n/config";

type BrandSettings = {
  brandNameHy: string;
  brandNameRu?: string | null;
};

type AddressSettings = {
  address: string;
  addressRu?: string | null;
};

export function getLocalizedBrand(settings: BrandSettings, locale: Locale) {
  const brandNameRu = settings.brandNameRu ?? "";
  if (locale === "ru" && brandNameRu.trim()) {
    return brandNameRu;
  }
  return settings.brandNameHy;
}

export function getLocalizedAddress(settings: AddressSettings, locale: Locale) {
  const addressRu = settings.addressRu ?? "";
  if (locale === "ru" && addressRu.trim()) {
    return addressRu;
  }
  return settings.address;
}
