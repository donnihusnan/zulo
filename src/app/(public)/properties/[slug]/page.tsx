"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchPropertyBySlug } from "@/services/property.service";
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
  MessageCircle,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

const PropertyDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: () => fetchPropertyBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container px-4 py-12 md:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-3xl font-bold">Properti Tidak Ditemukan</h2>
        <p className="mt-2 text-muted-foreground">
          Properti yang Anda cari mungkin telah dihapus atau sedang tidak
          tersedia.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/properties">Kembali ke Daftar Properti</Link>
        </Button>
      </div>
    );
  }

  const galleryImages = property.images && property.images.length > 0
    ? property.images.map(img => img.imageUrl)
    : [property.image];

  return (
    <div className="container px-4 py-8 md:px-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/properties">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Kembali ke Pencarian
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-white">
                {property.propertyType}
              </Badge>
              <Badge variant="outline">
                {property.status === "available" ? "Dijual" : property.status}
              </Badge>
              {property.featured && (
                <Badge className="bg-amber-500 text-white font-bold">
                  Unggulan
                </Badge>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {property.title}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4 text-primary" />
                  <span>{property.address}</span>
                </div>
              </div>
              <div className="text-3xl font-black text-primary sm:text-4xl">
                Rp {property.price.toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          <PropertyGallery images={galleryImages} />

          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-muted/50 p-6 sm:grid-cols-4">
            <SpecItem
              icon={<Bed className="h-5 w-5" />}
              label="Kamar Tidur"
              value={property.bedrooms}
            />
            <SpecItem
              icon={<Bath className="h-5 w-5" />}
              label="Kamar Mandi"
              value={property.bathrooms}
            />
            <SpecItem
              icon={<Square className="h-5 w-5" />}
              label="Luas Tanah"
              value={`${property.landSize} m²`}
            />
            <SpecItem
              icon={<Tag className="h-5 w-5" />}
              label="Luas Bangunan"
              value={`${property.buildingSize} m²`}
            />
          </div>

          {(property as any).paymentSchema && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Skema Pembayaran Tersedia
              </h3>
              <div className="flex flex-wrap gap-2">
                {String((property as any).paymentSchema).split(", ").map((schema: string) => (
                  <Badge key={schema} variant="secondary" className="bg-white/80 border-primary/10 text-primary font-bold px-4 py-2 rounded-lg">
                    {schema}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tentang Properti Ini</h2>
            <p className="leading-relaxed text-muted-foreground">
              {property.description}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Properti ini terletak di lokasi strategis yang dekat dengan
              berbagai fasilitas umum seperti sekolah, rumah sakit, pusat
              perbelanjaan, dan akses transportasi publik. Lingkungan perumahan
              yang aman dan nyaman menjadikannya pilihan sempurna untuk
              keluarga.
            </p>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Ditambahkan pada{" "}
                {new Date(property.createdAt).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <button className="hover:text-primary">Bagikan Listing</button>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <button className="hover:text-primary">Simpan ke Favorit</button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border bg-primary/5 p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-primary">Tertarik dengan Properti Ini?</h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Tim Zulo siap membantu Anda mendapatkan hunian terbaik. 
                Hubungi kami langsung via WhatsApp untuk respon instan dan informasi lebih lengkap.
              </p>
              
              <Button 
                asChild 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 mb-6 shadow-lg shadow-emerald-200"
              >
                <a 
                  href={`https://wa.me/6288223307570?text=${encodeURIComponent(`Halo Zulo, saya tertarik dengan properti "${property.title}". Bisa minta informasi lebih lanjut?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Hubungi via WhatsApp
                </a>
              </Button>

              <div className="flex items-center gap-3 text-xs font-semibold text-primary/80">
                <CheckCircle2 className="h-4 w-4" />
                <span>Respon Cepat (Maks. 24 Jam)</span>
              </div>
            </div>
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
    <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

export default PropertyDetailPage;
