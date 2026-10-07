"use client";

import { useState, Suspense } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Home, Bed, Bath, ArrowUpDown, RotateCcw } from "lucide-react";

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
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

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
        sort,
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
        sort,
      }),
  });

  const filteredProperties = properties?.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    );
  });

  const handleResetFilters = () => {
    setCity("All");
    setType("All");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("Any");
    setBathrooms("Any");
    setMinArea("");
    setMaxArea("");
    setSort("newest");
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span>Listing Resmi</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Terverifikasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Katalog Properti Pilihan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Temukan hunian idaman dengan informasi spesifikasi lengkap, skema pembayaran fleksibel, dan legalitas terjamin.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kata Kunci</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari judul, area, atau alamat..."
                  className="h-11 pl-10 border-border/70 focus-visible:ring-primary text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Kota */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kota</label>
              <Select value={city} onValueChange={(val) => setCity(val ?? "All")}>
                <SelectTrigger className="h-11 border-border/70 text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <SelectValue placeholder="Pilih Kota" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Kota</SelectItem>
                  <SelectItem value="Bandung">Bandung</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Surabaya">Surabaya</SelectItem>
                  <SelectItem value="Tangerang">Tangerang</SelectItem>
                  <SelectItem value="Bali">Bali</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipe Properti */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tipe Properti</label>
              <Select value={type} onValueChange={(val) => setType(val ?? "All")}>
                <SelectTrigger className="h-11 border-border/70 text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <Home className="h-4 w-4 text-primary shrink-0" />
                    <SelectValue placeholder="Semua Tipe" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Tipe</SelectItem>
                  <SelectItem value="Rumah">Rumah</SelectItem>
                  <SelectItem value="Apartemen">Apartemen</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Ruko">Ruko</SelectItem>
                  <SelectItem value="Tanah">Tanah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2 border-t border-border/50">
            {/* Rentang Harga */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rentang Harga (Rp)</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min (contoh: 500000000)"
                  className="h-10 text-xs border-border/70 font-mono"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="text-muted-foreground text-xs">—</span>
                <Input
                  type="number"
                  placeholder="Maks (contoh: 3000000000)"
                  className="h-10 text-xs border-border/70 font-mono"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Kamar Tidur */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kamar Tidur</label>
              <Select value={bedrooms} onValueChange={(val) => setBedrooms(val ?? "Any")}>
                <SelectTrigger className="h-10 border-border/70 text-xs">
                  <div className="flex items-center gap-2">
                    <Bed className="h-3.5 w-3.5 text-primary" />
                    <SelectValue placeholder="Bebas" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Bebas</SelectItem>
                  <SelectItem value="1">Minimal 1 KT</SelectItem>
                  <SelectItem value="2">Minimal 2 KT</SelectItem>
                  <SelectItem value="3">Minimal 3 KT</SelectItem>
                  <SelectItem value="4">Minimal 4+ KT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Kamar Mandi */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kamar Mandi</label>
              <Select value={bathrooms} onValueChange={(val) => setBathrooms(val ?? "Any")}>
                <SelectTrigger className="h-10 border-border/70 text-xs">
                  <div className="flex items-center gap-2">
                    <Bath className="h-3.5 w-3.5 text-primary" />
                    <SelectValue placeholder="Bebas" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Bebas</SelectItem>
                  <SelectItem value="1">Minimal 1 KM</SelectItem>
                  <SelectItem value="2">Minimal 2 KM</SelectItem>
                  <SelectItem value="3">Minimal 3+ KM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/40">
            {/* Sorting */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground font-semibold">Urutkan:</span>
              <Select
                value={sort}
                onValueChange={(val: "newest" | "price-asc" | "price-desc") => setSort(val)}
              >
                <SelectTrigger className="h-9 w-45 text-xs border-border/70">
                  <SelectValue placeholder="Urutan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru Ditambahkan</SelectItem>
                  <SelectItem value="price-asc">Harga Terendah</SelectItem>
                  <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary gap-1.5 h-9"
              onClick={handleResetFilters}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Semua Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">
            Menampilkan{" "}
            <span className="text-primary font-bold">
              {filteredProperties?.length || 0}
            </span>{" "}
            properti
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4 rounded-xl border p-4">
                <Skeleton className="aspect-4/3 w-full rounded-lg" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProperties && filteredProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed bg-muted/20 p-8">
            <div className="rounded-full bg-primary/10 p-5 text-primary mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Tidak Ada Properti yang Cocok</h3>
            <p className="mt-2 text-muted-foreground text-sm max-w-md">
              Kriteria filter atau kata kunci Anda saat ini belum menghasilkan properti. Silakan sesuaikan filter atau tekan tombol di bawah untuk melihat seluruh listing.
            </p>
            <Button
              className="mt-6 bg-primary text-primary-foreground font-bold"
              onClick={handleResetFilters}
            >
              Tampilkan Semua Properti
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-8">
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
