"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/services/property.service";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Home, Bed, Bath, Square } from "lucide-react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sync searchQuery if initialQuery changes (e.g., navigating from Hero again)
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const { data: properties, isLoading } = useQuery({
    queryKey: [
      "properties",
      {
        city,
        type,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        minArea,
        maxArea,
      },
    ],
    queryFn: () =>
      fetchProperties({
        city,
        type,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        minArea,
        maxArea,
      }),
  });

  const filteredProperties = properties?.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container px-4 py-8 md:px-8">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Properti Tersedia
          </h1>
          <p className="text-muted-foreground">
            Jelajahi daftar properti berkualitas tinggi pilihan kami.
          </p>
        </div>

        <div className="grid gap-6 border-y py-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Search */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kata Kunci</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan judul atau lokasi..."
                className="h-11 pl-10 border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Kota */}
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kota</label>
            <Select value={city} onValueChange={(val) => setCity(val ?? "All")}>
              <SelectTrigger className="h-11 border-primary/20">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Pilih Kota" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua Kota</SelectItem>
                <SelectItem value="Jakarta">Jakarta</SelectItem>
                <SelectItem value="Bandung">Bandung</SelectItem>
                <SelectItem value="Surabaya">Surabaya</SelectItem>
                <SelectItem value="Bali">Bali</SelectItem>
                <SelectItem value="Tangerang">Tangerang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipe */}
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tipe Properti</label>
            <Select value={type} onValueChange={(val) => setType(val ?? "All")}>
              <SelectTrigger className="h-11 border-primary/20">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Tipe Properti" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua Tipe</SelectItem>
                <SelectItem value="House">Rumah</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Apartment">Apartemen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Harga */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Rentang Harga (Rp)</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                placeholder="Min"
                className="h-11 border-primary/20"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="text-muted-foreground">—</span>
              <Input
                type="number"
                placeholder="Maks"
                className="h-11 border-primary/20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Kamar & Mandi */}
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kamar Tidur</label>
            <Select value={bedrooms} onValueChange={(val) => setBedrooms(val ?? "Any")}>
              <SelectTrigger className="h-11 border-primary/20">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Minimal" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Bebas</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kamar Mandi</label>
            <Select value={bathrooms} onValueChange={(val) => setBathrooms(val ?? "Any")}>
              <SelectTrigger className="h-11 border-primary/20">
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Minimal" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Bebas</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Luas Tanah */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Luas Tanah ($m^2$)</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                placeholder="Min Area"
                className="h-11 border-primary/20"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
              />
              <span className="text-muted-foreground">—</span>
              <Input
                type="number"
                placeholder="Max Area"
                className="h-11 border-primary/20"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
              />
            </div>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
            <Button
              variant="outline"
              className="text-sm border-primary/20 hover:bg-primary/5 hover:text-primary transition-all rounded-full px-8"
              onClick={() => {
                setCity("All");
                setType("All");
                setMinPrice("");
                setMaxPrice("");
                setBedrooms("Any");
                setBathrooms("Any");
                setMinArea("");
                setMaxArea("");
                setSearchQuery("");
              }}
            >
              Reset Semua Filter
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Menampilkan{" "}
            <span className="text-primary">
              {filteredProperties?.length || 0}
            </span>{" "}
            hasil
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProperties && filteredProperties.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Properti tidak ditemukan</h3>
            <p className="mt-2 text-muted-foreground text-sm max-w-xs">
              Kami tidak dapat menemukan properti yang sesuai dengan filter Anda
              saat ini. Coba sesuaikan pencarian atau filter Anda.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setCity("All");
                setType("All");
                setMinPrice("");
                setMaxPrice("");
                setSearchQuery("");
              }}
            >
              Hapus Semua Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="container p-8"><Skeleton className="h-20 w-full" /></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
