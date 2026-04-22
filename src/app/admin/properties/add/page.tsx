"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";

export default function AddPropertyPage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Tambah Properti Baru</h1>
        </div>
      </div>

      <PropertyForm key="add" mode="add" />
    </div>
  );
}

