"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center space-x-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/zulo-logo.png"
              alt="Zulo Logo"
              width={32}
              height={32}
              className="h-8 w-auto rounded-lg shadow-xs"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-primary leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Property & Build
              </span>
            </div>
          </Link>

          <nav className="hidden ml-10 space-x-1 text-sm font-medium md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-black"
                      : "text-foreground/75 hover:text-primary hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-muted-foreground hover:text-primary"
              asChild
            >
              <a
                href={getWhatsAppUrl("Halo Zulo, saya ingin berkonsultasi mengenai properti & layanan Zulo.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                Konsultasi WA
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-5 shadow-xs transition-all"
            >
              <Link href="/properties">
                Jelajahi Properti
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 rounded-lg"
                  aria-label="Menu Navigasi"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-2 space-y-1">
                {siteConfig.nav.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "cursor-pointer font-medium py-2 px-3 rounded-md text-sm",
                        pathname === item.href ? "bg-primary/10 text-primary font-bold" : ""
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="pt-1 flex flex-col gap-1.5">
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground font-bold rounded-lg text-xs"
                    asChild
                  >
                    <Link href="/properties">Jelajahi Properti</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs font-semibold border-emerald-600/30 text-emerald-700"
                    asChild
                  >
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
