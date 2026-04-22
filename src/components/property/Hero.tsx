"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/properties?query=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/properties");
    }
  };

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero2.png"
          alt="Rumah Mewah"
          fill
          priority
          className="object-cover brightness-[0.6] scale-105 animate-pulse-slow"
        />
        {/* Gradients for better text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="container relative z-10 flex h-full flex-col justify-center px-4 md:px-8 pt-20">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tighter text-white sm:text-7xl lg:text-8xl leading-[1.1]">
              Hunian Modern <br />
              <span className="text-accent italic drop-shadow-sm">
                Masa Depan
              </span>{" "}
              Anda
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-200 md:text-xl opacity-90">
              Temukan koleksi properti eksklusif dengan desain kontemporer dan
              lingkungan yang asri bersama{" "}
              <span className="font-bold text-white underline underline-offset-4 decoration-accent">
                Zulo
              </span>
              .
            </p>
          </div>

          <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white/10 p-2 backdrop-blur-xl transition-all hover:bg-white/15 sm:flex-row border border-white/20 shadow-2xl">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
              <Input
                placeholder="Masukkan kota, kawasan, atau alamat..."
                className="h-14 border-none bg-transparent pl-12 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              size="lg"
              className="h-14 rounded-xl px-10 text-lg font-bold shadow-lg transition-transform active:scale-95 bg-primary hover:bg-primary/90"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" />
              Cari
            </Button>
          </div>

          <div className="flex items-center gap-10 pt-4">
            <StatsItem label="Properti Tersedia" value="1.200+" />
            <StatsItem label="Klien Puas" value="500+" />
            <StatsItem label="Tahun Pengalaman" value="15+" />
          </div>
        </div>
      </div>
    </section>
  );
};

function StatsItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-white group cursor-default">
      <p className="text-3xl font-black tracking-tight transition-transform group-hover:scale-110">
        {value}
      </p>
      <p className="text-xs font-medium uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">
        {label}
      </p>
    </div>
  );
}

export default Hero;
