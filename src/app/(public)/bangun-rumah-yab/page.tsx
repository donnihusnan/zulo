import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Paintbrush, 
  Ruler, 
  HardHat, 
  ShieldCheck, 
  BadgeCheck, 
  Hammer,
  Layers,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function BangunRumahYABPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-zinc-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592dea585260?auto=format&fit=crop&w=2000&q=80"
            alt="Architecture and Construction"
            fill
            className="object-cover opacity-40 grayscale-[0.5]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-8">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-12 bg-primary"></div>
              <span className="text-primary font-black tracking-[0.2em] uppercase text-sm">Collaboration Excellence</span>
            </div>
            
            <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl leading-[0.85]">
              BANGUN <br />
              RUMAH <br />
              <span className="text-primary italic">x YAB</span>
            </h1>

            <p className="max-w-2xl text-xl font-medium text-gray-300 md:text-2xl leading-relaxed">
              Wujudkan hunian impian Anda dengan standar konstruksi terbaik dan sentuhan arsitektur modern yang fungsional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-xl shadow-2xl bg-primary hover:bg-primary/90" asChild>
                <a href="https://wa.me/6288223307570" target="_blank">Mulai Bangun</a>
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-12 text-xl font-bold rounded-xl text-white hover:bg-white/10" asChild>
                <Link href="#layanan">Lihat Layanan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="layanan" className="py-32 bg-background border-b">
         <div className="container px-4 md:px-8">
            <div className="grid gap-20 lg:grid-cols-2">
                <div className="space-y-6">
                    <h2 className="text-4xl font-black tracking-tight leading-tight">Solusi Konstruksi Menyeluruh dari <span className="text-primary italic">Ahlinya.</span></h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Bangun Rumah x YAB menghadirkan kolaborasi antara profesional konstruksi dan keahlian arsitektur untuk memastikan setiap sudut rumah Anda dibangun dengan presisi, keamanan, dan keindahan yang abadi.
                    </p>
                    <div className="pt-4 grid gap-4 grid-cols-2">
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-primary" />
                            <span className="font-bold">Bahan Premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-primary" />
                            <span className="font-bold">Tim Profesional</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-primary" />
                            <span className="font-bold">Harga Transparan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-primary" />
                            <span className="font-bold">Tepat Waktu</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <ServiceCard 
                        icon={<Paintbrush className="h-7 w-7" />}
                        title="Desain Interior"
                        desc="Sentuhan estetika yang memaksimalkan setiap inci ruang Anda."
                    />
                    <ServiceCard 
                        icon={<Building2 className="h-7 w-7" />}
                        title="Struktur & Sipil"
                        desc="Kekuatan bangunan yang terjamin untuk kenyamanan jangka panjang."
                    />
                    <ServiceCard 
                        icon={<Ruler className="h-7 w-7" />}
                        title="Perencanaan Arsitek"
                        desc="Gambar kerja mendetail yang fungsional dan modern."
                    />
                    <ServiceCard 
                        icon={<HardHat className="h-7 w-7" />}
                        title="Manajemen Proyek"
                        desc="Pengawasan ketat untuk menjamin kualitas di setiap tahap."
                    />
                </div>
            </div>
         </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 relative overflow-hidden bg-zinc-950 text-white">
        <div className="container relative z-10 px-4 md:px-8">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                 <div className="space-y-4">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Working Process</span>
                    <h2 className="text-5xl font-black tracking-tight">Setiap Langkah Adalah <br /> <span className="text-primary italic">Komitmen.</span></h2>
                 </div>
                 <p className="max-w-xs text-zinc-400 font-medium">Kami memandu Anda dari sekadar ide hingga kunci diserahkan ke tangan Anda.</p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <ProcessStep 
                    number="01" 
                    title="Konsultasi & Survey" 
                    desc="Memahami visi Anda dan menganalisis kondisi lahan secara langsung."
                />
                <ProcessStep 
                    number="02" 
                    title="Design & Budgeting" 
                    desc="Pembuatan draf desain dan perencanaan anggaran yang transparan."
                />
                <ProcessStep 
                    number="03" 
                    title="Konstruksi & Opname" 
                    desc="Pengerjaan fisik oleh tim ahli dengan standar QC yang tinggi."
                />
                <ProcessStep 
                    number="04" 
                    title="Handover & Warranty" 
                    desc="Penyerahan kunci dan masa garansi untuk ketenangan pikiran Anda."
                />
            </div>
        </div>
      </section>

      {/* CTA section with big text */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center space-y-10 shadow-2xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />
                
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white max-w-4xl leading-none italic">
                    Siap membangun <br /> rumah impian Anda?
                </h2>
                <p className="text-primary-foreground/80 text-xl md:text-2xl font-medium max-w-2xl">
                    Jadwalkan sesi konsultasi gratis dengan tim arsitek dan kontraktor kami sekarang.
                </p>
                <Button size="lg" variant="secondary" className="px-16 py-10 text-2xl font-black rounded-2xl bg-white text-primary hover:bg-zinc-100 shadow-xl transition-all" asChild>
                    <a href="https://wa.me/6288223307570" target="_blank">Hubungi Kami</a>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group p-8 rounded-[2rem] border bg-background hover:border-primary/50 hover:shadow-2xl transition-all duration-500">
        <div className="mb-6 p-4 rounded-2xl bg-primary/5 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-500">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative group">
        <span className="text-8xl font-black absolute -top-12 -left-4 text-white/5 group-hover:text-primary/10 transition-colors duration-500 pointer-events-none">
            {number}
        </span>
        <div className="relative z-10 pt-4 space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <div className="h-1 w-12 bg-primary rounded-full group-hover:w-20 transition-all duration-500" />
            <p className="text-zinc-400 leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
  );
}
