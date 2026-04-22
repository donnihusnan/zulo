"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProperties } from "@/services/property.service";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProperties = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: () => fetchFeaturedProperties(),
  });

  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4 md:px-8">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-xl space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Properti <span className="text-primary">Unggulan</span> Kami
            </h2>
            <p className="text-muted-foreground">
              Properti premium pilihan yang menawarkan nilai terbaik, lokasi
              strategis, dan fitur mewah untuk gaya hidup Anda.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/properties">
              Lihat Semua Properti
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">
            Belum ada properti unggulan yang tersedia.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
