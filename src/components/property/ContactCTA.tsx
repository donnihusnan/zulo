import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getWhatsAppUrl } from "@/config/site";

interface ContactCTAProps {
  title?: string;
  message?: string;
  propertyName?: string;
}

export function ContactCTA({
  title = "Tertarik dengan Properti Ini?",
  message = "Konsultasikan langsung dengan konsultan properti resmi Zulo. Dapatkan kepastian ketersediaan unit, jadwal survey lokasi, dan simulasi skema pembayaran.",
  propertyName,
}: ContactCTAProps) {
  const waText = propertyName
    ? `Halo Zulo, saya ingin menanyakan informasi detail dan survey untuk properti: "${propertyName}". Apakah unit ini masih tersedia?`
    : `Halo Zulo, saya tertarik dengan listing properti di Zulo. Bisa minta bantuan konsultasi?`;

  return (
    <SpotlightCard
      className="rounded-3xl border border-primary/20 bg-linear-to-b from-primary/5 via-card to-card p-6 sm:p-8 shadow-sm backdrop-blur-xs"
      spotlightColor="rgba(6, 44, 43, 0.08)"
    >
      <div className="relative z-10 space-y-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            Layanan Konsultasi Cepat
          </span>
          <h3 className="mt-1 text-xl font-black tracking-tight text-foreground">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>

        <Button
          asChild
          className="group relative w-full overflow-hidden bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 shadow-lg shadow-emerald-600/25 transition-all duration-300"
        >
          <a
            href={getWhatsAppUrl(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform" />
            <span className="relative z-10 text-sm font-bold">Chat Konsultan via WhatsApp</span>
          </a>
        </Button>

        <div className="space-y-2 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Respon Cepat Maks. 15 Menit di Jam Kerja</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Pendampingan Legalitas & Transaksi Aman</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
