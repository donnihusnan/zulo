"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchPropertyBySlug } from "@/services/property.service";
import { ContactCTA } from "@/components/property/ContactCTA";
import { PropertyImage } from "@/types/property.types";
import PropertyGallery from "@/components/property/PropertyGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Tag,
  Share2,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Building,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { formatIDR } from "@/config/site";

const PropertyDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [isFavorited, setIsFavorited] = useState(false);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: () => fetchPropertyBySlug(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && property?.id) {
      try {
        const favs = JSON.parse(localStorage.getItem("zulo_favorites") || "[]");
        const isFav = favs.includes(property.id);
        queueMicrotask(() => {
          setIsFavorited(isFav);
        });
      } catch {
        // Ignore localStorage parsing errors
      }
    }
  }, [property?.id]);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: property?.title || "Properti Zulo",
            text: `Lihat properti ini di Zulo: ${property?.title}`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Tautan berhasil disalin ke clipboard!");
        }
      } catch {
        // Fallback clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Tautan berhasil disalin ke clipboard!");
      }
    }
  };

  const toggleFavorite = () => {
    if (!property?.id) return;
    try {
      const favs: string[] = JSON.parse(localStorage.getItem("zulo_favorites") || "[]");
      let nextFavs: string[];
      if (isFavorited) {
        nextFavs = favs.filter((id) => id !== property.id);
        setIsFavorited(false);
        toast.info("Dihapus dari daftar favorit.");
      } else {
        nextFavs = [...favs, property.id];
        setIsFavorited(true);
        toast.success("Disimpan ke daftar favorit Anda!");
      }
      localStorage.setItem("zulo_favorites", JSON.stringify(nextFavs));
    } catch {
      toast.error("Gagal memperbarui favorit.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-3xl font-black tracking-tight text-foreground">Properti Tidak Ditemukan</h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-md">
          Properti yang Anda tuju mungkin sudah terjual atau tautan telah diperbarui. Silakan jelajahi katalog properti lainnya.
        </p>
        <Button className="mt-8 bg-primary text-primary-foreground font-bold" asChild>
          <Link href="/properties">Kembali ke Katalog Properti</Link>
        </Button>
      </div>
    );
  }

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images.map((img: PropertyImage) => img.imageUrl)
      : [property.image || "/images/cari-properti.jpg"];

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-xs font-semibold text-muted-foreground hover:text-primary" asChild>
        <Link href="/properties">
          <ChevronLeft className="mr-1.5 h-4 w-4" />
          Kembali ke Katalog Properti
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1">
                {property.propertyType}
              </Badge>
              <Badge variant="outline" className="border-emerald-600/30 text-emerald-700 font-semibold px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />
                {property.status === "available" ? "Status: Tersedia" : property.status}
              </Badge>
              {property.featured && (
                <Badge className="bg-amber-600 text-white font-bold px-3 py-1">
                  Unggulan
                </Badge>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-1.5">
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
                  {property.title}
                </h1>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="mr-1.5 h-4 w-4 text-primary shrink-0" />
                  <span>{property.address}, {property.city}</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Harga Penawaran</span>
                <div className="text-3xl font-black text-primary sm:text-4xl tabular-nums">
                  {formatIDR(property.price)}
                </div>
              </div>
            </div>
          </div>

          <PropertyGallery images={galleryImages} />

          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card p-6 sm:grid-cols-4 shadow-xs">
            <SpecItem
              icon={<Bed className="h-5 w-5" />}
              label="Kamar Tidur"
              value={`${property.bedrooms} Kamar`}
            />
            <SpecItem
              icon={<Bath className="h-5 w-5" />}
              label="Kamar Mandi"
              value={`${property.bathrooms} Ruang`}
            />
            <SpecItem
              icon={<Square className="h-5 w-5" />}
              label="Luas Tanah"
              value={`${property.landSize} m²`}
            />
            <SpecItem
              icon={<Building className="h-5 w-5" />}
              label="Luas Bangunan"
              value={property.buildingSize ? `${property.buildingSize} m²` : "-"}
            />
          </div>

          {property.paymentSchema && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Skema Pembayaran yang Didukung
              </h3>
              <div className="flex flex-wrap gap-2">
                {String(property.paymentSchema)
                  .split(", ")
                  .map((schema: string) => (
                    <Badge
                      key={schema}
                      variant="secondary"
                      className="bg-background border-primary/20 text-primary font-bold px-3.5 py-1.5 rounded-lg shadow-xs"
                    >
                      {schema}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Deskripsi & Informasi Properti</h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {property.description}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                Terdaftar sejak{" "}
                {new Date(property.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 font-semibold hover:text-primary transition-colors cursor-pointer"
              >
                <Share2 className="h-4 w-4 text-primary" />
                Bagikan
              </button>

              <button
                onClick={toggleFavorite}
                className="flex items-center gap-1.5 font-semibold hover:text-primary transition-colors cursor-pointer"
              >
                <Heart
                  className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-primary"}`}
                />
                {isFavorited ? "Tersimpan" : "Simpan Favorit"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="sticky top-24 space-y-6">
            <ContactCTA propertyName={property.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
      <div className="flex items-center gap-1.5 text-primary">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="text-base font-black text-foreground tabular-nums">{value}</p>
    </div>
  );
}

export default PropertyDetailPage;
