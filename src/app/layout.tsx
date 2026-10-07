import type { Metadata } from "next";
import { Rubik, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/zulo-favicon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "32x32" },
      { url: "/zulo-logo.png?v=2", type: "image/png" },
    ],
    shortcut: "/zulo-favicon.png?v=2",
    apple: "/zulo-logo.png?v=2",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans scroll-smooth", geist.variable)}>
      <body
        className={`${rubik.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
