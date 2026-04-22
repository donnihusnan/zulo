import Hero from "@/components/property/Hero";
import FeaturedProperties from "@/components/property/FeaturedProperties";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Clock, Award, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      {/* Mengapa Memilih Kami */}
      <section className="bg-muted/20 py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container px-4 md:px-8">
          <div className="mb-20 text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl uppercase">
              Mengapa Memilih <span className="text-primary italic">ZULO</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Kami menghadirkan platform properti paling inovatif dan transparan untuk
              memenuhi standar hunian modern Anda.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureItem
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Properti Terverifikasi"
              description="Listing kami melewati proses audit ketat untuk menjamin keamanan transaksi dan kualitas bangunan."
            />
            <FeatureItem
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Digital First"
              description="Proses seleksi hingga negosiasi dilakukan secara digital yang memudahkan Anda dari mana saja."
            />
            <FeatureItem
              icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
              title="Transparansi Penuh"
              description="Tidak ada biaya tersembunyi. Semua informasi harga dan spesifikasi disajikan sejujur mungkin."
            />
            <FeatureItem
              icon={<Award className="h-10 w-10 text-primary" />}
              title="Standard Premium"
              description="Setiap hunian di Zulo dipilih berdasarkan standar desain dan kenyamanan internasional."
            />
          </div>
        </div>
      </section>

      <FeaturedProperties />

      {/* CTA Section */}
      <section className="bg-primary py-32 text-primary-foreground relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="container px-4 text-center md:px-8 relative z-10">
          <div className="mx-auto max-w-4xl space-y-10">
            <h2 className="text-5xl font-black tracking-tighter sm:text-7xl leading-[1.05]">
              Temukan standar baru <br />
              <span className="italic text-accent drop-shadow-lg underline underline-offset-[12px] decoration-accent/40">hunian modern</span> Anda.
            </h2>
            <p className="text-xl md:text-2xl opacity-90 font-medium max-w-2xl mx-auto leading-relaxed">
              Zulo telah membantu ratusan keluarga menemukan hunian impian mereka dengan proses yang transparan dan tanpa ribet.
            </p>
            <div className="flex flex-col justify-center gap-6 pt-6 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="px-14 py-10 text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 bg-white text-primary hover:bg-white/95"
                asChild
              >
                <Link href="/properties">Jelajahi Properti</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col items-center space-y-6 rounded-3xl border bg-background p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 transition-colors group-hover:bg-primary/10 shadow-inner">
        <div className="group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
