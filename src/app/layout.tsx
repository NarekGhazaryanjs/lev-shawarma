import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "LEV Shawarma",
  description: "LEV Shawarma",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const lang = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return (
    <html lang={lang} className={outfit.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
