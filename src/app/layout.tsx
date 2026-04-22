import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Zulo | Temukan Hunian Impian Anda",
  description:
    "Jelajahi daftar properti, lihat detail, dan temukan rumah impian Anda melalui Zulo - Platform real estate modern dan terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
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

