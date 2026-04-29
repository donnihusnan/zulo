"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
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
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-primary">
              ZULO
            </span>
          </Link>
          <nav className="hidden ml-10 space-x-6 text-sm font-medium md:flex">
            <Link
              href="/"
              className="text-foreground/80 transition-colors hover:text-primary underline-offset-4 hover:underline"
            >
              Beranda
            </Link>
            <Link
              href="/properties"
              className="text-foreground/80 transition-colors hover:text-primary underline-offset-4 hover:underline"
            >
              Properti
            </Link>
            <Link
              href="/z-home"
              className="text-foreground/80 transition-colors hover:text-primary underline-offset-4 hover:underline"
            >
              Z-Home
            </Link>
            <Link
              href="/bangun-rumah-yab"
              className="text-foreground/80 transition-colors hover:text-primary underline-offset-4 hover:underline"
            >
              Bangun Rumah x YAB
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-full px-6 shadow-sm transition-all hover:shadow-md"
            >
              <Link href="/properties">Jelajahi Properti</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    Beranda
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/properties" className="cursor-pointer">
                    Properti
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
