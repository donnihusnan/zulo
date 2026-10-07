import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 transition-colors">
      <div className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/zulo-logo.png"
                alt="Zulo Logo"
                width={36}
                height={36}
                className="h-9 w-auto rounded-lg shadow-xs"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-primary leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Property & Build
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              Produk & Layanan
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={siteConfig.products.properti.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{siteConfig.products.properti.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.products.zHome.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{siteConfig.products.zHome.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.products.bangunRumah.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{siteConfig.products.bangunRumah.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              Navigasi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Katalog Properti
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs opacity-75 hover:opacity-100"
                >
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span className="leading-snug">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary font-medium transition-colors tabular-nums"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground text-xs">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} (
            {siteConfig.legalName}). Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] opacity-75">
            Hunian Masa Depan dengan Standar Kualitas Terpercaya.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
