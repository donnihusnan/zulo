"use client";

import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { CountUp } from "@/components/ui/CountUp";
import dynamic from "next/dynamic";
const Prism = dynamic(() => import("@/components/ui/Prism"), { ssr: false });
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Noise } from "@/components/ui/Noise";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh-4rem)] w-full bg-zinc-950 overflow-hidden flex flex-col justify-center"
    >
      {/* Prism & Noise Background */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="hover"
          glow={1.5}
          transparent={true}
          hueShift={0}
          timeScale={0.4}
        />
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <Noise patternAlpha={20} patternRefreshInterval={3} />
        </div>
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto relative z-10 flex h-full flex-col justify-center p-4 md:px-8 py-8 lg:py-0">
        <div className="max-w-4xl space-y-6 sm:space-y-8 my-auto">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Hunian Modern <br />
              <GradientText
                colors={["#D99B52", "#F6D8A8", "#E5A95D", "#FDEED9", "#D99B52"]}
                animationSpeed={5}
                className="font-black italic drop-shadow-xl"
              >
                Masa Depan
              </GradientText>{" "}
              Anda
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both max-w-xl text-base sm:text-lg md:text-xl font-medium leading-relaxed text-zinc-300">
              Temukan koleksi properti eksklusif dengan desain kontemporer dan
              lingkungan yang asri bersama{" "}
              <span className="font-bold text-white underline underline-offset-8 decoration-accent">
                Zulo
              </span>
              .
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-full shadow-2xl shadow-white/10 bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-105 transition-all"
              asChild
            >
              <Link href="/properties">
                Jelajahi Properti
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-full text-white border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all"
              asChild
            >
              <Link href="/z-home">Pelajari Z-Home</Link>
            </Button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both flex flex-wrap items-center gap-6 sm:gap-10 pt-4 sm:pt-6 w-fit rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 shadow-2xl">
            <StatsItem label="Properti Tersedia" to={1200} suffix="+" />
            <div className="hidden sm:block h-10 w-px bg-white/20" />
            <StatsItem label="Klien Puas" to={500} suffix="+" />
            <div className="hidden sm:block h-10 w-px bg-white/20" />
            <StatsItem label="Pengalaman" to={15} suffix="+ Thn" />
          </div>
        </div>
      </div>
    </section>
  );
};

function StatsItem({ label, to, suffix }: { label: string; to: number; suffix: string }) {
  return (
    <div className="text-white group cursor-default">
      <p className="text-3xl sm:text-4xl font-black tracking-tighter transition-transform group-hover:scale-105 tabular-nums">
        <CountUp to={to} suffix={suffix} duration={2.2} />
      </p>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-accent transition-colors mt-1">
        {label}
      </p>
    </div>
  );
}

export default Hero;
