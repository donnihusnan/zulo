"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, formatIDR } from "@/config/site";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    slug: string;
    price: number;
    city: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    buildingSize?: number;
    propertyType: string;
    status: string;
    image: string;
    featured?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imgSrc, setImgSrc] = useState(property.image || "/images/cari-properti.jpg");

  const waMessage = `Halo Zulo, saya tertarik dengan properti "${property.title}" di ${property.city} (Harga: ${formatIDR(property.price)}). Bisa minta informasi selengkapnya dan jadwal survey?`;

  return (
    <Card className="group overflow-hidden border border-border/60 bg-card hover:border-primary/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgSrc("/images/cari-properti.jpg")}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.featured && (
              <Badge className="bg-amber-600 text-white font-bold border-none text-[10px] tracking-wider uppercase px-2.5 shadow-sm">
                Unggulan
              </Badge>
            )}
            <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-md text-[10px] font-semibold border-border/50">
              {property.propertyType}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              {property.status === "available" ? "Tersedia" : property.status}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 z-10 text-white font-medium text-xs flex items-center gap-1 opacity-90 drop-shadow-md">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span>{property.city}</span>
          </div>
        </div>

        <CardHeader className="p-5 pb-2">
          <div className="text-xs text-muted-foreground truncate mb-1">
            {property.address}
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className="line-clamp-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight"
          >
            {property.title}
          </Link>
        </CardHeader>

        <CardContent className="px-5 py-2">
          <div className="flex items-center justify-between border-y border-border/50 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{property.bedrooms}</span> KT
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{property.bathrooms}</span> KM
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{property.landSize}</span> m²
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between p-5 pt-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Harga</span>
          <span className="text-lg font-black text-primary tabular-nums tracking-tight">
            {formatIDR(property.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 px-3 border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            asChild
          >
            <a
              href={getWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat WhatsApp mengenai ${property.title}`}
            >
              <MessageCircle className="h-4 w-4 mr-1 text-emerald-600" />
              WA
            </a>
          </Button>

          <Button size="sm" className="h-9 px-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold" asChild>
            <Link href={`/properties/${property.slug}`}>
              Detail
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
