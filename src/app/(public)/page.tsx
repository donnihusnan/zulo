import Image from "next/image";
import Hero from "@/components/property/Hero";
import FeaturedProperties from "@/components/property/FeaturedProperties";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Home as HomeIcon, Building2, ChevronRight, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />

      {/* Product Tracks Section */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-8">
          <div className="mb-20 text-center space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Core Business</h2>
            <h3 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl uppercase">
              Tiga Pilar <span className="text-primary italic">ZULO</span>
            </h3>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Solusi end-to-end untuk kebutuhan properti Anda, mulai dari pencarian unit siap huni hingga jasa pembangunan kustom.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Track 1: Properties */}
            <TrackCard 
              title="Cari Properti"
              subtitle="Listing Terverifikasi"
              desc="Jelajahi ribuan pilihan properti siap huni dengan data yang akurat dan transparan."
              href="/properties"
              btnText="Jelajahi Sekarang"
              icon={<Search className="h-6 w-6" />}
              img="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
            />
            
            {/* Track 2: Z-Home */}
            <TrackCard 
              title="Z-Home Hasramah"
              subtitle="Exclusive Mini Cluster"
              desc="Setiap rumah adalah identitas. Rasakan kemewahan hunian dengan desain yang 100% unik."
              href="/z-home"
              btnText="Lihat Proyek"
              variant="accent"
              icon={<HomeIcon className="h-6 w-6" />}
              img="/z-home/brosur-1.jpeg"
            />

            {/* Track 3: Bangun Rumah */}
            <TrackCard 
              title="Bangun Rumah x YAB"
              subtitle="Custom Construction"
              desc="Kolaborasi eksklusif untuk membangun hunian impian Anda dari awal hingga serah terima kunci."
              href="/bangun-rumah-yab"
              btnText="Konsultasi Jasa"
              icon={<Building2 className="h-6 w-6" />}
              img="https://images.unsplash.com/photo-1503387762-592dea585260?auto=format&fit=crop&w=800&q=80"
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
              <span className="italic text-accent drop-shadow-lg underline underline-offset-12 decoration-accent/40">hunian modern</span> Anda.
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

function TrackCard({ 
  title, 
  subtitle, 
  desc, 
  href, 
  btnText, 
  icon, 
  img, 
  variant = "primary" 
}: { 
  title: string; 
  subtitle: string; 
  desc: string; 
  href: string; 
  btnText: string; 
  icon: React.ReactNode; 
  img: string;
  variant?: "primary" | "accent";
}) {
  return (
    <Link href={href} className="group relative h-[450px] overflow-hidden rounded-[2.5rem] border border-border/50 bg-muted/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative h-full p-10 flex flex-col justify-end space-y-6">
        <div className={cn(
          "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg",
          variant === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}>
          {icon}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
            {subtitle}
          </p>
          <h4 className="text-3xl font-black tracking-tight">{title}</h4>
          <p className="text-muted-foreground leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>

        <div className="pt-4 flex items-center gap-2 font-bold text-sm text-primary group-hover:gap-4 transition-all">
          {btnText}
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
