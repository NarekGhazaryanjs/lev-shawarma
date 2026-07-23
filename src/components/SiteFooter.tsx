"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CATEGORIES, getCategoryLabel, getMenuCategoryHref } from "@/lib/categories";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getMainLinks } from "@/lib/navigation";
import { getLocalizedAddress, getLocalizedBrand } from "@/lib/i18n/localized-settings";
import { localizePath } from "@/lib/i18n/paths";

type Settings = {
  brandName: string;
  brandNameHy: string;
  brandNameRu: string;
  phone: string;
  address: string;
  addressRu: string;
  instagram: string;
  facebook: string;
};

export function SiteFooter({
  settings,
  locale,
  dict,
}: {
  settings: Settings;
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const links = getMainLinks(dict, locale);
  const brandSubtitle = getLocalizedBrand(settings, locale);
  const address = getLocalizedAddress(settings, locale);

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-panel">
          <div className="footer-grid">
            <div className="footer-col">
              <Link href={localizePath("/", locale)} className="footer-brand group">
                <span className="footer-brand-mark">L</span>
                <span>
                  <strong className="footer-brand-name">{settings.brandName}</strong>
                  <small className="footer-brand-sub">{brandSubtitle}</small>
                </span>
              </Link>
              <p className="footer-text">{dict.footer.tagline}</p>
              <div className="footer-contact-stack">
                <a href={phoneHref} className="footer-link footer-link-strong">
                  {settings.phone}
                </a>
                <p className="footer-text">{address}</p>
              </div>
            </div>

            <div className="footer-col">
              <p className="footer-title">{dict.common.pages}</p>
              <nav className="footer-nav">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-col">
              <p className="footer-title">{dict.nav.menu}</p>
              <nav className="footer-nav">
                {MENU_CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={getMenuCategoryHref(category, locale)}
                    className="footer-link"
                  >
                    {getCategoryLabel(category, locale)}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-col">
              <p className="footer-title">{dict.nav.contact}</p>
              <div className="footer-action-stack">
                <a href={phoneHref} className="btn btn-brand w-fit">
                  {dict.common.call}
                </a>
                <div className="footer-social-row">
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social"
                  >
                    Instagram
                  </a>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {settings.brandName}
          </p>
          <p className="footer-bottom-sub">{brandSubtitle}</p>
        </div>
      </div>
    </footer>
  );
}
