"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";

export default function AddPropertyPage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="outline" size="icon" className="shrink-0 h-9 w-9" asChild>
            <Link href="/admin/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight">Tambah Properti Baru</h1>
        </div>
      </div>

      <PropertyForm key="add" mode="add" />
    </div>
  );
}
