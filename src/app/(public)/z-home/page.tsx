"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  MapPin,
  Ruler,
  Palette,
  FileText,
  ShieldCheck,
  Compass,
  ArrowRight,
  HelpCircle,
  Car,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GradientText } from "@/components/ui/GradientText";
import dynamic from "next/dynamic";
const PixelSwap = dynamic(
  () => import("@/components/ui/PixelSwap").then((m) => m.PixelSwap),
  { ssr: false }
);
import { Noise } from "@/components/ui/Noise";
import { getWhatsAppUrl } from "@/config/site";

const HIGHLIGHTS = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "1 Fasad = 1 Karakter",
    description:
      "Setiap rumah dirancang unik tanpa fasad kembar di dalam kawasan. Rumah mencerminkan identitas penghuni.",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Free Custom Arsitek & 3D",
    description:
      "Konsultasi langsung dengan tim arsitek Zulo. Pilih gaya Minimalis Modern, Scandinavian, atau Tropis Kontemporer.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Fleksibilitas Kavling",
    description:
      "Pilihan fleksibel: beli kavling siap bangun mandiri, atau paket komplit tanah plus konstruksi siap huni.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Legalitas SHM Aman",
    description:
      "Status tanah clean and clear dengan sertifikat hak milik (SHM) dan perizinan PBG/IMB terjamin resmi.",
  },
];

const SPECS = [
  {
    label: "Total Populasi",
    value: "30 Unit Eksklusif",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Lebar Jalan Utama",
    value: "Row 6 Meter (2 Mobil)",
    icon: <Car className="h-4 w-4" />,
  },
  {
    label: "Konsep Desain",
    value: "One House, One Design",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    label: "Legalitas Tanah",
    value: "SHM (Sertifikat Hak Milik)",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    label: "Skema Pembelian",
    value: "Cash Keras, Bertahap, & KPR",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    label: "Lokasi",
    value: "Kabupaten Bandung, Jawa Barat",
    icon: <MapPin className="h-4 w-4" />,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Pilih Kavling & Survey Lokasi",
    description:
      "Pilih posisi kavling strategis sesuai selera dan jadwalkan visit lokasi langsung bersama tim pemasaran kami.",
  },
  {
    number: "02",
    title: "Konsultasi Kebutuhan Ruang",
    description:
      "Sampaikan jumlah kamar, preferensi pencahayaan, sirkulasi udara, dan anggaran pembangunan Anda.",
  },
  {
    number: "03",
    title: "Perancangan Fasad & 3D Gratis",
    description:
      "Tim arsitek menyusun denah kerja dan render 3D visual realistis hingga Anda puas 100%.",
  },
  {
    number: "04",
    title: "Konstruksi & Serah Terima Kunci",
    description:
      "Pembangunan terawasi dengan laporan berkala hingga serah terima fisik dan garansi pemeliharaan.",
  },
];

const GALLERY_TABS = [
  {
    id: "fasad",
    title: "Konsep Fasad & Arsitektur",
    image: "/z-home/brosur-3.jpeg",
    caption:
      "Eksplorasi fasad kontemporer tropis dengan sentuhan kayu, kaca tempered, dan ventilasi silang optimal.",
  },
  {
    id: "siteplan",
    title: "Master Siteplan Kavling",
    image: "/z-home/brosur-2.jpeg",
    caption:
      "Layout masterplan terencana dengan row jalan 6 meter dan orientasi kavling yang memaksimalkan sirkulasi udara.",
  },
  {
    id: "brosur",
    title: "Spesifikasi Cluster",
    image: "/z-home/brosur-1.jpeg",
    caption:
      "Ringkasan konsep cluster eksklusif 30 unit dengan atmosfer tenang, asri, dan privat.",
  },
];

const FAQS = [
  {
    q: "Apakah biaya desain arsitek dan 3D benar-benar gratis?",
    a: "Ya. Setiap pembelian unit di Z-Home Hasramah sudah mendapatkan paket perancangan desain arsitek dan render visual 3D tanpa biaya tambahan.",
  },
  {
    q: "Bisa beli tanah kavlingnya saja tanpa bangunan?",
    a: "Bisa. Kami menyediakan opsi pembelian kavling tanah siap bangun bagi Anda yang ingin berinvestasi tanah atau membangun secara bertahap.",
  },
  {
    q: "Bagaimana sistem pembayaran yang tersedia?",
    a: "Tersedia opsi Cash Keras (dengan diskon khusus), Cash Bertahap hingga 12-24 bulan langsung ke developer, serta skema KPR dengan bank rekanan terpercaya.",
  },
];

export default function ZHomePage() {
  const [activeTab, setActiveTab] = useState(0);

  const waBookingUrl = getWhatsAppUrl(
    "Halo Zulo, saya sangat tertarik dengan Z-Home Hasramah (Mini Cluster 30 Unit). Bisa kirimkan brosur lengkap, siteplan kavling, dan jadwal survey lokasi?",
  );

  return (
    <div className="flex flex-col gap-0 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex items-center w-full bg-zinc-950 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/z-home/brosur-1.jpeg"
            alt="Z-Home Hasramah Mini Cluster"
            fill
            priority
            className="object-cover opacity-50 brightness-[0.75] transition-transform duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950/80 via-transparent to-zinc-950/40" />
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <Noise patternAlpha={20} patternRefreshInterval={3} />
          </div>
        </div>

        <div className="container mx-auto relative z-10 px-4 md:px-8">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-[0.95]">
              Z-HOME <br />
              <GradientText
                colors={["#D99B52", "#F6D8A8", "#E5A95D", "#FDEED9", "#D99B52"]}
                className="italic drop-shadow-lg"
              >
                HASRAMAH
              </GradientText>
            </h1>

            <p className="max-w-2xl text-lg font-medium text-zinc-300 md:text-xl leading-relaxed">
              Konsep mini cluster modern yang mengutamakan privasi, sirkulasi
              udara alami, dan filosofi keunikan:{" "}
              <span className="text-white font-bold underline underline-offset-4 decoration-accent">
                satu rumah, satu desain unik.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-bold rounded-full shadow-xl bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi & Survey Kavling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-bold rounded-full border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md"
                asChild
              >
                <Link href="#spesifikasi">Lihat Spesifikasi & Siteplan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      <section className="bg-primary text-primary-foreground py-6 border-y border-primary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SPECS.map((item, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <div className="flex items-center gap-1.5 text-accent text-xs font-semibold">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <p className="text-sm font-bold text-white tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="konsep" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                  Filosofi Arsitektur
                </span>
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-foreground">
                  One House, <br />
                  <span className="text-primary italic">One Identity</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  Mayoritas perumahan massal memiliki fasad seragam yang
                  monoton. Di Z-Home Hasramah, kami memastikan setiap unit
                  memiliki karakter tersendiri yang mencerminkan cita rasa
                  pemiliknya.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {HIGHLIGHTS.map((item, i) => (
                  <SpotlightCard
                    key={i}
                    className="p-6 rounded-2xl bg-card border border-border/70 hover:border-primary/40 shadow-xs transition-all duration-300"
                    spotlightColor="rgba(6, 44, 43, 0.05)"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-3">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Visual Preview with React Bits PixelSwap */}
            <div className="relative group">
              <PixelSwap
                className="w-full aspect-4/5 border-4 border-background shadow-2xl rounded-3xl"
                trigger="hover"
                pixelSize={32}
                firstContent={
                  <div className="relative w-full h-full">
                    <Image
                      src="/z-home/brosur-3.jpeg"
                      alt="Konsep Fasad Z-Home Hasramah"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold text-accent border border-accent/20">
                      Visual Fasad 3D
                    </div>
                  </div>
                }
                secondContent={
                  <div className="relative w-full h-full">
                    <Image
                      src="/z-home/brosur-1.jpeg"
                      alt="Master Siteplan & Arsitektur Z-Home"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                      Masterplan Kawasan
                    </div>
                  </div>
                }
              />
              <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-card/95 backdrop-blur-md p-5 rounded-2xl border border-border/80 shadow-xl max-w-xs space-y-1 z-30">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black uppercase tracking-wider text-primary">
                    Estetika Tropis Modern
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Hover / Tap
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Optimalisasi sirkulasi udara dan cahaya alami. Sentuh atau hover untuk beralih denah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gallery / Siteplan Tabs Section */}
      <section
        id="spesifikasi"
        className="py-24 bg-muted/30 border-y border-border/60"
      >
        <div className="container mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Masterplan & Desain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Dokumentasi & Siteplan Eksklusif
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Telusuri rancangan denah kawasan dan contoh inspirasi arsitektur
              unit Z-Home Hasramah.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {GALLERY_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/70"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active View */}
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl p-4 sm:p-6 space-y-4">
            <div className="relative aspect-16/10 sm:aspect-video w-full rounded-2xl overflow-hidden bg-muted">
              <Image
                src={GALLERY_TABS[activeTab].image}
                alt={GALLERY_TABS[activeTab].title}
                fill
                className="object-contain sm:object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">
                  {GALLERY_TABS[activeTab].title}
                </h3>
                <p className="text-xs text-muted-foreground max-w-xl">
                  {GALLERY_TABS[activeTab].caption}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground font-bold shrink-0"
                asChild
              >
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minta Gambar Resolusi Penuh
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 md:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-accent">
              Tahapan Memiliki
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Dari Ide Sketsa hingga <br />
              <span className="text-accent italic">Serah Terima Fisik.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Kami memandu setiap langkah agar transparan, nyaman, dan sesuai
              harapan Anda sekeluarga.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
              >
                <span className="text-4xl font-black text-accent/60 group-hover:text-accent transition-colors tabular-nums">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Pertanyaan Umum
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Seputar Proyek Z-Home Hasramah
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border/70 bg-card space-y-2"
              >
                <div className="flex items-center gap-2.5 font-bold text-base text-foreground">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                  <h4>{faq.q}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-3xl px-5 py-10 sm:p-16 text-center text-primary-foreground max-w-4xl mx-auto space-y-6 sm:space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                Unit Sangat Terbatas
              </span>
              <h2 className="text-2xl sm:text-5xl font-black tracking-tight leading-tight">
                Miliki Unit Eksklusif Z-Home Sekarang
              </h2>
              <p className="text-primary-foreground/80 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
                Hanya 30 unit kavling di seluruh kawasan. Jadwalkan temu survey
                dan dapatkan promo bebas biaya desain 3D arsitek sekarang.
              </p>
            </div>

            <div className="pt-2 relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-auto min-h-12 py-3.5 px-6 sm:px-10 text-xs sm:text-base font-black rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl whitespace-normal text-center max-w-full"
                asChild
              >
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center whitespace-normal leading-snug"
                >
                  Hubungi Marketing via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
