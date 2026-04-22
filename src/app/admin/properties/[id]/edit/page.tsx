"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "@/services/admin.service";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: property, isLoading, isError } = useQuery({
    queryKey: ["admin-property", id],
    queryFn: () => fetchPropertyById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Properti Tidak Ditemukan</h2>
        <p className="text-muted-foreground">ID Properti tidak valid atau database tidak merespons.</p>
        <Button asChild variant="outline">
          <Link href="/admin/properties">Kembali ke Daftar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Detail Properti</h1>
        </div>
      </div>

      <PropertyForm key={id} mode="edit" initialData={property} />
    </div>
  );
}

