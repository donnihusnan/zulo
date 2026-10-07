import Link from "next/link";
import Hero from "@/components/property/Hero";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, Award, HelpCircle, Users } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  AccordionGallery,
  AccordionGalleryItem,
} from "@/components/ui/AccordionGallery";
import dynamic from "next/dynamic";
import type { FlexCarouselItem } from "@/components/ui/FlexCarousel";
import { Noise } from "@/components/ui/Noise";
import { fetchGalleryImages } from "@/services/property.service";

export const revalidate = 60;

const FlexCarousel = dynamic(
  () => import("@/components/ui/FlexCarousel").then((m) => m.FlexCarousel)
);
const Strands = dynamic(
  () => import("@/components/ui/Strands").then((m) => m.Strands)
);

const PRODUCT_ACCORDION_ITEMS: AccordionGalleryItem[] = [
  {
    image: "/images/cari-properti.jpg",
    label: "Cari Properti — Listing Rumah & Kavling Siap Huni",
    link: siteConfig.products.properti.href,
    alt: "Koleksi Properti Siap Huni Terverifikasi Zulo",
  },
  {
    image: "/z-home/brosur-1.jpeg",
    label: "Z-Home Hasramah — Mini Cluster Eksklusif 30 Unit",
    link: siteConfig.products.zHome.href,
    alt: "Z-Home Hasramah Mini Cluster",
  },
  {
    image: "/images/bangun-rumah.jpg",
    label: "Bangun Rumah x YAB — Kolaborasi Konstruksi & Arsitektur",
    link: siteConfig.products.bangunRumah.href,
    alt: "Jasa Bangun Rumah Profesional Bergaransi",
  },
];

const ADVANTAGES = [
  {
    icon: <ShieldCheck className="h-7 w-7 text-primary" />,
    title: "Legalitas Terverifikasi 100%",
    desc: "Setiap listing properti dan kavling telah melalui proses kurasi ketat untuk memastikan kelengkapan SHM, PBG/IMB, dan bebas sengketa.",
  },
  {
    icon: <Award className="h-7 w-7 text-primary" />,
    title: "One House, One Design",
    desc: "Bagi Anda yang mendambakan hunian berkarakter, tim arsitek Zulo siap merancang denah dan fasad eksklusif tanpa duplikasi.",
  },
  {
    icon: <Building2 className="h-7 w-7 text-primary" />,
    title: "RAB Transparan & Kontrak Jelas",
    desc: "Tidak ada biaya terselubung. Seluruh rincian volume pekerjaan, spesifikasi merk material, dan jadwal pembayaran tertuang transparan.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Pendampingan End-to-End",
    desc: "Mulai dari survey lokasi awal, pengajuan KPR bank rekanan, hingga serah terima kunci fisik didampingi oleh profesional kami.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rian Hendrawan",
    role: "Pemilik Rumah di Z-Home Hasramah",
    quote:
      "Sangat puas dengan konsep Z-Home. Fasad rumah kami benar-benar unik dan tidak ada kembarannya di cluster. Jalan depannya juga lega 6 meter, parkir mobil nyaman.",
  },
  {
    name: "Dr. Silvia Maharani",
    role: "Klien Bangun Rumah x YAB (Dago)",
    quote:
      "Awalnya khawatir bangun rumah dari nol karena takut biaya membengkak. Bersama Zulo x YAB, RAB-nya sangat presisi dan ada laporan opname mingguan transparan.",
  },
  {
    name: "Bambang Sujatmi",
    role: "Pembeli Properti Siap Huni",
    quote:
      "Proses pembelian properti sangat lancar. Data spesifikasi di website persis dengan kondisi nyata di lapangan. Tim Zulo sangat responsif mengurus berkas notaris.",
  },
];

const HOME_FAQS = [
  {
    q: "Apa yang membedakan Zulo dengan platform properti lain?",
    a: "Zulo adalah ekosistem terpadu. Kami tidak hanya mempertemukan penjual dan pembeli properti siap huni, tapi juga mengembangkan cluster unik (Z-Home) serta memiliki divisi konstruksi resmi (Bangun Rumah x YAB) untuk melayani rancang bangun kustom.",
  },
  {
    q: "Apakah saya bisa mengajukan KPR lewat Zulo?",
    a: "Ya. Zulo bermitra dengan berbagai bank terkemuka untuk memfasilitasi pengajuan KPR konvensional maupun syariah dengan pendampingan berkas hingga disetujui.",
  },
  {
    q: "Bagaimana cara menjadwalkan survey lokasi?",
    a: "Anda cukup memilih properti yang diinginkan dan klik tombol WhatsApp Konsultan di halaman detail properti atau hubungi kontak kami langsung. Tim kami akan mengatur jadwal kunjungan sesuai waktu luang Anda.",
  },
];

export default async function Home() {
  const galleryItems = await fetchGalleryImages();

  return (
    <div className="flex flex-col gap-0">
      {/* Screen 1: Hero Section */}
      <Hero />

      {/* Screen 2: Product Tracks Section - Tiga Pilar Zulo with React Bits AccordionGallery */}
      <section
        id="layanan"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-background flex flex-col justify-center py-16 md:py-20 border-b border-border/60 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8 space-y-8 my-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Layanan Terintegrasi
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground uppercase">
              Tiga Pilar <span className="text-primary italic">ZULO</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Solusi terintegrasi untuk kebutuhan properti Anda: mulai dari
              listing siap huni, cluster eksklusif Z-Home, hingga rancang bangun
              kustom bersama YAB Studio.
            </p>
          </div>

          <div className="w-full">
            <AccordionGallery
              items={PRODUCT_ACCORDION_ITEMS}
              defaultIndex={1}
              height={440}
              radius={24}
              accentColor="#D99B52"
              overlayColor="#062C2B"
              expandRatio={0.55}
              trigger="hover"
              grayscale={false}
            />
          </div>
        </div>
      </section>

      {/* Screen 3: Available Property Image Showcase - React Bits FlexCarousel */}
      <section
        id="galeri"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-muted/20 border-b border-border/60 flex flex-col justify-center py-16 md:py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8 my-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Koleksi Visual
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                Galeri Visual Unit Siap Huni
              </h2>
            </div>
            <p className="text-xs text-muted-foreground font-semibold">
              Geser kursor atau klik gambar untuk memperbesar
            </p>
          </div>

          <div className="w-full h-115 sm:h-135 relative">
            <FlexCarousel
              items={galleryItems}
              preset="liquid"
              cardHeight={0.65}
              radius={20}
              autoplay={true}
              interval={1.5}
              captions={false}
              captureWheel={true}
              followCursor={true}
            />
          </div>
        </div>
      </section>

      {/* Screen 4: Why Choose Zulo (Mengapa Zulo) */}
      <section
        id="keunggulan"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-muted/30 border-y border-border/60 flex flex-col justify-center py-16 md:py-20"
      >
        <div className="container mx-auto px-4 md:px-8 space-y-10 my-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Keunggulan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Mengapa Memilih Zulo?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Standar integritas tinggi untuk memastikan kepuasan dan ketenangan
              pikiran Anda berinvestasi hunian.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((adv, i) => (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(6, 44, 43, 0.08)"
                className="p-8 rounded-3xl bg-card border border-border/70 hover:border-primary/40 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="p-3.5 rounded-2xl bg-primary/10 w-fit">
                  {adv.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Screen 5: Testimonials */}
      <section
        id="testimoni"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-background border-b border-border/60 flex flex-col justify-center py-16 md:py-20"
      >
        <div className="container mx-auto px-4 md:px-8 space-y-10 my-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Cerita Klien
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Kepercayaan yang Dibangun Bersama
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              Kisah nyata dari klien dan pemilik hunian yang mempercayakan
              langkah mereka pada Zulo.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testi, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-border/70 bg-card shadow-xs flex flex-col justify-between space-y-6"
              >
                <p className="text-sm text-foreground/85 leading-relaxed italic">
                  &ldquo;{testi.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-bold text-sm text-foreground">
                    {testi.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen 6: FAQ Section */}
      <section
        id="faq"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-muted/20 border-b border-border/60 flex flex-col justify-center py-16 md:py-20"
      >
        <div className="container mx-auto max-w-4xl px-4 md:px-8 space-y-10 my-auto">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              Tanya Jawab
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              Jawaban cepat seputar skema pembelian, legalitas sertifikat, dan
              layanan kami.
            </p>
          </div>

          <div className="space-y-4">
            {HOME_FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border/70 bg-card space-y-2 shadow-xs"
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

      {/* Screen 7: Final CTA Banner */}
      <section
        id="cta"
        className="relative min-h-[calc(100dvh-4rem)] w-full bg-primary text-primary-foreground flex flex-col justify-center py-16 md:py-20 overflow-hidden"
      >
        {/* React Bits Ambient Background: Strands WebGL & Noise Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <Strands
            count={4}
            speed={0.4}
            glow={2.6}
            amplitude={1.1}
            colors={["#062C2B", "#D99B52", "#0A4643", "#F6D8A8"]}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Noise patternAlpha={20} patternRefreshInterval={3} />
        </div>

        <div className="container mx-auto px-4 text-center md:px-8 relative z-10 my-auto">
          <div className="mx-auto max-w-3xl space-y-8">
            <span className="text-xs font-black uppercase tracking-widest text-accent">
              Langkah Awal Hunian Impian
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Wujudkan Hunian Impian Anda Bersama Zulo.
            </h2>
            <p className="text-base sm:text-lg opacity-90 font-medium max-w-xl mx-auto leading-relaxed">
              Konsultasikan rencana properti Anda secara gratis. Tim konsultan
              resmi Zulo siap membantu dari survey hingga akad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                className="h-auto min-h-12 py-3.5 px-6 sm:px-10 text-sm sm:text-base font-black rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl whitespace-normal text-center"
                asChild
              >
                <Link href="/properties">Jelajahi Properti</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto min-h-12 py-3.5 px-6 sm:px-10 text-sm sm:text-base font-bold rounded-full border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md whitespace-normal text-center"
                asChild
              >
                <a
                  href={getWhatsAppUrl(
                    "Halo Zulo, saya ingin berkonsultasi mengenai layanan Zulo.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center whitespace-normal leading-snug"
                >
                  Konsultasi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
