"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Paintbrush,
  Ruler,
  HardHat,
  BadgeCheck,
  Calculator,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GradientText } from "@/components/ui/GradientText";
import { Noise } from "@/components/ui/Noise";
import dynamic from "next/dynamic";
const Strands = dynamic(
  () => import("@/components/ui/Strands").then((m) => m.Strands),
  { ssr: false }
);
import { getWhatsAppUrl, formatIDR } from "@/config/site";

const SERVICES = [
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Perencanaan Arsitektur & 3D",
    desc: "Denah tata ruang fungsional, gambar kerja detail arsitektural, dan visualisasi 3D realistis berstandar tinggi.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Konstruksi Struktur & Sipil",
    desc: "Pembangunan fisik dengan perhitungan beban struktur aman, pembesian standar SNI, dan uji beton terakreditasi.",
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: "Desain & Pengerjaan Interior",
    desc: "Solusi estetika ruang, tata pencahayaan (lighting), pemilihan material finishing, dan custom built-in furniture.",
  },
  {
    icon: <HardHat className="h-6 w-6" />,
    title: "Manajemen Proyek & QC Ketat",
    desc: "Supervisi harian oleh site engineer berpengalaman dengan pelaporan progress opname transparan tiap minggu.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Konsultasi & Survey Lahan",
    desc: "Diskusi mendalam mengenai kebutuhan ruang, preferensi desain, pengecekan kontur tanah, dan orientasi matahari.",
  },
  {
    number: "02",
    title: "Desain, Gambar Kerja, & RAB",
    desc: "Penyusunan gambar detail arsitektur, MEP (mekanikal-elektrikal-plumbing), dan breakdown RAB hingga detail terkecil tanpa biaya siluman.",
  },
  {
    number: "03",
    title: "Konstruksi & Pelaporan Mingguan",
    desc: "Eksekusi pembangunan dengan material pilihan dan laporan kemajuan fisik mingguan yang dapat dipantau langsung oleh Anda.",
  },
  {
    number: "04",
    title: "Serah Terima & Garansi Pemeliharaan",
    desc: "Pemeriksaan bersama (checklist), serah terima kunci fisik, serta proteksi garansi struktur resmi hingga 10 tahun.",
  },
];

const PACKAGES = [
  {
    id: "standard",
    name: "Standard Minimalis",
    ratePerMeter: 3800000,
    specs: [
      "Struktur Beton Bertulang SNI",
      "Dinding Bata Ringan Diplester Acian",
      "Lantai Granit Tile 60x60",
      "Sanitair Standar American Standard",
    ],
  },
  {
    id: "premium",
    name: "Premium Modern",
    ratePerMeter: 5200000,
    specs: [
      "Struktur Baja/Beton Kuat SNI",
      "Finishing Cat Eksterior Weathercoat",
      "Kusen Aluminium YKK / Setara",
      "Lantai Homogeneous Tile 80x80 / SPC Wood",
      "Sanitair Toto Premium",
    ],
    recommended: true,
  },
  {
    id: "luxury",
    name: "Luxury Architectural",
    ratePerMeter: 7500000,
    specs: [
      "Custom Architectural Concrete & Steel",
      "Facade Travertine / Wood Composite",
      "Smart Home Automation Ready",
      "Lantai Marmer Alam / Solid Wood",
      "Sanitair Kolaborasi Desainer",
    ],
  },
];

const FAQS = [
  {
    q: "Apakah biaya RAB bisa disesuaikan dengan budget saya?",
    a: "Sangat bisa. Kami menerapkan pendekatan 'Design to Budget', di mana tim arsitek dan kontraktor kami akan merekomendasikan alternatif material dan efisiensi denah agar tetap kokoh dan indah sesuai plafon anggaran Anda.",
  },
  {
    q: "Apakah ada garansi setelah rumah selesai dibangun?",
    a: "Ya. Setiap proyek Bangun Rumah x YAB dilindungi oleh Garansi Pemeliharaan selama 3-6 bulan untuk perapihan minor, serta Garansi Struktur Utama hingga 10 tahun yang tertuang resmi dalam perjanjian kontrak kerja (SPK).",
  },
  {
    q: "Apakah sudah termasuk pengurusan izin PBG (Persetujuan Bangunan Gedung)?",
    a: "Ya, tim kami menyediakan layanan pendampingan pengurusan izin PBG/IMB lengkap dengan gambar teknis yang memenuhi regulasi tata kota setempat.",
  },
];

export default function BangunRumahYABPage() {
  const [areaSize, setAreaSize] = useState<number>(120);
  const [selectedTier, setSelectedTier] = useState<string>("premium");

  const currentPkg = PACKAGES.find((p) => p.id === selectedTier) || PACKAGES[1];
  const estimatedTotal = areaSize * currentPkg.ratePerMeter;

  const calculatorWaUrl = getWhatsAppUrl(
    `Halo Zulo x YAB, saya mencoba kalkulator estimasi bangun rumah: Luas ~${areaSize} m² dengan paket "${currentPkg.name}" (Estimasi: ${formatIDR(estimatedTotal)}). Saya ingin konsultasi detail dan jadwal survey lokasi.`,
  );

  return (
    <div className="flex flex-col gap-0 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex items-center bg-zinc-950 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <Noise patternAlpha={20} patternRefreshInterval={3} />
        </div>
        <div className="container mx-auto relative z-10 px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.02]">
                  Membangun Rumah <br />
                  <GradientText
                    colors={[
                      "#D99B52",
                      "#F6D8A8",
                      "#E5A95D",
                      "#FDEED9",
                      "#D99B52",
                    ]}
                    className="italic"
                  >
                    Tanpa Cemas,
                  </GradientText>{" "}
                  <br />
                  Presisi Sempurna.
                </h1>
                <p className="max-w-xl text-base sm:text-lg font-medium text-zinc-300 leading-relaxed">
                  Kolaborasi arsitektur kontemporer dan kontraktor
                  berintegritas. Nikmati transparansi RAB hingga detail
                  terkecil, material standar SNI, dan pendampingan profesional
                  dari nol hingga serah terima kunci.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold rounded-full shadow-2xl bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                >
                  <a
                    href={calculatorWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Konsultasi & Survey Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base font-bold rounded-full text-white border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md"
                  asChild
                >
                  <Link href="#kalkulator">Hitung Estimasi Biaya</Link>
                </Button>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-white tabular-nums">
                    10 Thn
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Garansi Struktur
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-white tabular-nums">
                    100%
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Transparansi RAB
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-white tabular-nums">
                    SNI
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Material Grade A
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-white tabular-nums">
                    Weekly
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Laporan Opname
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl">
                <Image
                  src="/images/bangun-rumah.jpg"
                  alt="Proyek Konstruksi Bangun Rumah x YAB"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="layanan"
        className="py-24 bg-background border-b border-border/60"
      >
        <div className="container mx-auto px-4 md:px-8 space-y-16">
          <div className="grid gap-12 lg:grid-cols-2 items-end">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Layanan Terintegrasi
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
                Solusi Rancang Bangun Dari{" "}
                <span className="text-primary italic">A sampai Z.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Anda tidak perlu repot mencari arsitek dan kontraktor secara
              terpisah. Kami menggabungkan keduanya dalam satu sistem kerja
              terpadu untuk memastikan desain dapat direalisasikan secara
              presisi dan efisien.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((item, i) => (
              <SpotlightCard
                key={i}
                className="p-8 rounded-2xl bg-card border border-border/70 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                spotlightColor="rgba(6, 44, 43, 0.05)"
              >
                <div>
                  <div className="mb-6 p-4 rounded-2xl bg-primary/10 text-primary w-fit">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Budget Estimator (Kalkulator) */}
      <section
        id="kalkulator"
        className="py-24 bg-muted/30 border-b border-border/60"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <Calculator className="h-4 w-4" />
              Simulasi Cepat
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Kalkulator Estimasi Biaya Bangun
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Hitung perkiraan kasar anggaran pembangunan rumah impian Anda
              berdasarkan luas bangunan dan spesifikasi material.
            </p>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-lg space-y-8">
            {/* Input Luas Bangunan */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground">
                  Rencana Luas Bangunan (m²)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={36}
                    max={1000}
                    value={areaSize}
                    onChange={(e) =>
                      setAreaSize(Math.max(20, Number(e.target.value)))
                    }
                    className="w-24 text-right font-mono font-black text-lg p-2 rounded-lg border border-border/70 bg-background text-foreground"
                  />
                  <span className="text-sm font-semibold text-muted-foreground">
                    m²
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={36}
                max={500}
                step={5}
                value={areaSize}
                onChange={(e) => setAreaSize(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
                <span>Tipe 36 m²</span>
                <span>Tipe 120 m²</span>
                <span>Tipe 250 m²</span>
                <span>Tipe 500+ m²</span>
              </div>
            </div>

            {/* Hasil Estimasi */}
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-widest text-accent">
                  Perkiraan Total Anggaran
                </p>
                <div className="text-3xl sm:text-4xl font-black tabular-nums tracking-tight text-white">
                  {formatIDR(estimatedTotal)}
                </div>
                <p className="text-[11px] text-primary-foreground/75">
                  *Perhitungan merupakan estimasi awal. RAB resmi akan dihitung
                  akurat berdasarkan gambar kerja spesifik.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 py-6 rounded-full shadow-lg shrink-0"
                asChild
              >
                <a
                  href={calculatorWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kirim Hasil Estimasi via WA
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 md:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-accent">
              Alur Pengerjaan
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              SOP Teruji Demi Kualitas <br />
              <span className="text-accent italic">Tanpa Kompromi.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Setiap tahapan memiliki milestone checklist yang disepakati
              bersama sebelum melangkah ke tahap selanjutnya.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
              >
                <span className="text-4xl font-black text-accent/60 tabular-nums">
                  {item.number}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
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
              Tanya Jawab
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Pertanyaan Seputar Bangun Rumah
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

      {/* Final CTA */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-3xl px-5 py-10 sm:p-16 text-center text-primary-foreground max-w-4xl mx-auto space-y-6 sm:space-y-8 shadow-2xl relative overflow-hidden">
            {/* React Bits Ambient Background: Strands WebGL & Noise Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <Strands
                count={4}
                speed={0.4}
                glow={2.5}
                amplitude={1.1}
                colors={["#062C2B", "#D99B52", "#0A4643", "#F6D8A8"]}
              />
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <Noise patternAlpha={20} patternRefreshInterval={3} />
            </div>

            <div className="space-y-3 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                Konsultasi Tanpa Komitmen
              </span>
              <h2 className="text-2xl sm:text-5xl font-black tracking-tight leading-tight">
                Mulai Rencanakan Rumah Idaman Anda Bersama Kami
              </h2>
              <p className="text-primary-foreground/80 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
                Jadwalkan sesi konsultasi offline atau online bersama tim
                arsitek dan kontraktor Zulo x YAB sekarang. Gratis survey awal
                untuk area Bandung dan sekitarnya.
              </p>
            </div>

            <div className="pt-2 relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-auto min-h-12 py-3.5 px-6 sm:px-10 text-xs sm:text-base font-black rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl whitespace-normal text-center max-w-full"
                asChild
              >
                <a
                  href={calculatorWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center whitespace-normal leading-snug"
                >
                  Jadwalkan Konsultasi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
