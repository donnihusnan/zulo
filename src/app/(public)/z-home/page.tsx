import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, MapPin, Ruler, Palette, FileText, ChevronRight } from "lucide-react";

export default function ZHomePage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/z-home/brosur-1.jpeg"
            alt="Z-Home Hasramah"
            fill
            priority
            className="object-cover opacity-60 brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="container relative z-10 flex h-full flex-col justify-end pb-20 px-4 md:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1 text-sm font-bold text-accent backdrop-blur-md border border-accent/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              EXCLUSIVELY 30 UNITS ONLY
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl leading-[0.9]">
              Z-HOME <br />
              <span className="text-accent italic">HASRAMAH</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium text-gray-200 md:text-2xl opacity-90 leading-relaxed">
              Hunian konsep mini cluster modern yang mengutamakan privasi, estetika, dan keunikan identitas setiap rumah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full shadow-lg" asChild>
                <a href="https://wa.me/6288223307570" target="_blank">Konsultasi Gratis</a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full border-white text-white hover:bg-white hover:text-primary transition-all" asChild>
                <Link href="#konsep">Lihat Konsep</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="konsep" className="py-24 bg-background">
        <div className="container px-4 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Konsep Unggulan</h2>
                <h3 className="text-4xl font-black tracking-tight sm:text-5xl">
                  One House <br />
                  <span className="text-primary italic">One Design</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami percaya rumah bukan sekadar tempat tinggal, tapi identitas. Di Zhome Hasramah, setiap fasad dirancang unik tanpa ada yang kembar di dalam satu kawasan.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <HighlightCard 
                  icon={<Palette className="h-6 w-6" />}
                  title="1 Fasad = 1 Karakter"
                  description="Setiap unit punya identitas sendiri, tidak ada desain yang sama."
                />
                <HighlightCard 
                  icon={<Home className="h-6 w-6" />}
                  title="Premium Aesthetic"
                  description="Lingkungan terlihat seperti perumahan high-end, bukan mass product."
                />
                <HighlightCard 
                  icon={<FileText className="h-6 w-6" />}
                  title="Free Design (Custom)"
                  description="Bisa request gaya Minimalis, Scandinavian, atau Tropis."
                />
                <HighlightCard 
                  icon={<Ruler className="h-6 w-6" />}
                  title="Sesuai Kebutuhan"
                  description="Pilihan kavling saja, atau paket tanah + bangunan."
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white">
                <Image
                  src="/z-home/brosur-2.jpeg"
                  alt="Siteplan Z-Home"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Eksklusivitas Tanpa Batas</h2>
            <p className="text-muted-foreground text-lg">Investasi masa depan dengan kenyamanan hunian yang didesain khusus untuk Anda.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureItem 
              icon={<MapPin className="h-8 w-8 text-primary" />}
              title="Akses Nyaman"
              description="Akses jalan utama selebar 6 meter, mobil leluasa berpapasan dan lingkungan lebih lega."
            />
            <FeatureItem 
              icon={<CheckCircle2 className="h-8 w-8 text-primary" />}
              title="Low Density"
              description="Hanya 30 unit di seluruh kawasan, menciptakan suasana yang lebih privat dan tenang."
            />
            <FeatureItem 
              icon={<ChevronRight className="h-8 w-8 text-primary" />}
              title="Layout Rapi"
              description="Lingkungan tertata dengan layout proporsional yang mengoptimalkan sirkulasi udara dan cahaya."
            />
          </div>
        </div>
      </section>

      {/* Alur Pembelian */}
      <section className="py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-10">
              <h2 className="text-5xl font-black tracking-tight leading-[0.9]">
                Mulai Rancang <br />
                <span className="italic text-accent">Masa Depan Anda</span>
              </h2>
              
              <div className="space-y-6">
                <StepItem number="01" title="Pilih Kavling" description="Pilih lokasi strategis yang paling sesuai dengan preferensi Anda." />
                <StepItem number="02" title="Konsultasi Konsep" description="Diskusikan keinginan dan kebutuhan ruang bersama tim arsitek kami." />
                <StepItem number="03" title="Desain Custom + 3D GRATIS" description="Visualisasikan rumah impian Anda secara realistis sebelum pembangunan dimulai." />
                <StepItem number="04" title="Proses Pembangunan" description="Wujudkan hunian dengan kualitas material terbaik dan pengawasan ketat." />
              </div>

              <div className="pt-6">
                <Button size="lg" variant="secondary" className="px-14 py-8 text-xl font-bold rounded-full hover:scale-105 transition-all shadow-xl" asChild>
                   <a href="https://wa.me/6288223307570" target="_blank">Hubungi Marketing Sekarang</a>
                </Button>
              </div>
            </div>

            <div className="flex-1 relative">
                <div className="relative aspect-square w-full max-w-lg mx-auto rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
                    <Image 
                        src="/z-home/brosur-3.jpeg" 
                        alt="Z-Home Fasad Concept" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline Footer */}
      <section className="py-12 bg-accent text-accent-foreground">
        <div className="container px-4 text-center">
           <p className="text-xl md:text-3xl font-black italic tracking-tight">
             &ldquo;Tidak Ada Rumah yang Sama, Semua Punya Cerita&rdquo;
           </p>
        </div>
      </section>
    </div>
  );
}

function HighlightCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-muted/50 border hover:bg-background hover:shadow-xl transition-all group">
      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-background border shadow-inner">
        {icon}
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-4xl font-black text-accent/40 group-hover:text-accent transition-colors">
        {number}
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-bold group-hover:text-accent transition-colors">{title}</h4>
        <p className="opacity-70 text-sm">{description}</p>
      </div>
    </div>
  );
}
