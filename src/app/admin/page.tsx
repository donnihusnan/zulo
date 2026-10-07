"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  TrendingUp,
  Building2,
  MapPin,
  Plus,
  ArrowRight,
  Eye,
  Clock,
  Layers,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/admin.service";
import { formatIDR } from "@/config/site";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchDashboardStats(),
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Ringkasan Dashboard
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
            Pantau inventaris properti, sebaran wilayah, dan listing terbaru secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs font-semibold shrink-0" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Lihat Website
            </Link>
          </Button>

          <Button size="sm" className="bg-primary text-primary-foreground font-bold text-xs shrink-0" asChild>
            <Link href="/admin/properties/add">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Tambah Properti
            </Link>
          </Button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isStatsLoading ? (
          [1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-border/70 shadow-xs">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 rounded-lg mb-3" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-8 w-1/3" />
              </CardContent>
            </Card>
          ))
        ) : stats ? (
          <>
            <StatCard
              title="Total Inventaris"
              value={stats.totalProperties.value.toString()}
              description="Total seluruh properti di database"
              icon={<Home className="h-5 w-5" />}
            />
            <StatCard
              title="Listing Aktif"
              value={stats.activeListings.value.toString()}
              description="Siap dipasarkan ke publik"
              icon={<TrendingUp className="h-5 w-5" />}
              highlight
            />
            <StatCard
              title="Kategori Properti"
              value={stats.typeBreakdown.length.toString()}
              description="Variasi jenis hunian"
              icon={<Layers className="h-5 w-5" />}
            />
            <StatCard
              title="Cakupan Kota"
              value={stats.cityBreakdown.length.toString()}
              description="Sebaran wilayah listing"
              icon={<MapPin className="h-5 w-5" />}
            />
          </>
        ) : null}
      </div>

      {/* Middle Grid: Type Distribution & City Spread */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Distribusi Tipe */}
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Distribusi Tipe Properti
            </CardTitle>
            <CardDescription className="text-xs">
              Komposisi unit berdasarkan kategori bangunan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isStatsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-lg" />
                ))}
              </div>
            ) : stats?.typeBreakdown && stats.typeBreakdown.length > 0 ? (
              stats.typeBreakdown.map((item, idx) => {
                const total = stats.totalProperties.value || 1;
                const percentage = Math.round((item.count / total) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">{item.type}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.count} unit ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                Belum ada data tipe properti.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Sebaran Kota */}
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Sebaran Wilayah & Kota
            </CardTitle>
            <CardDescription className="text-xs">
              Listing berdasarkan kota dan kabupaten aktif.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isStatsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-lg" />
                ))}
              </div>
            ) : stats?.cityBreakdown && stats.cityBreakdown.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {stats.cityBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-border/60 bg-muted/20 flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-foreground truncate">{item.city}</span>
                    <span className="text-lg font-black text-primary tabular-nums mt-1">
                      {item.count} <span className="text-[10px] font-normal text-muted-foreground">listing</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">
                Belum ada data wilayah.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties Table */}
      <Card className="border border-border/70 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Listing Terbaru
            </CardTitle>
            <CardDescription className="text-xs">
              5 properti terakhir yang ditambahkan ke sistem.
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1" asChild>
            <Link href="/admin/properties">
              Kelola Semua
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isStatsLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : stats?.recentListings && stats.recentListings.length > 0 ? (
            <div className="divide-y divide-border/50">
              {stats.recentListings.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border/60 shrink-0 bg-muted">
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <Link
                        href={`/admin/properties/${prop.id}/edit`}
                        className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {prop.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{prop.city}</span>
                        <span>•</span>
                        <span>{prop.propertyType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-black text-primary tabular-nums hidden sm:block">
                      {formatIDR(prop.price)}
                    </span>
                    <Badge
                      variant={prop.status === "available" ? "default" : "outline"}
                      className={
                        prop.status === "available"
                          ? "bg-emerald-500/15 text-emerald-800 border-emerald-500/30 text-[10px]"
                          : "text-muted-foreground text-[10px]"
                      }
                    >
                      {prop.status === "available" ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-muted-foreground">
              Belum ada listing properti.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  highlight = false,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Card className="border border-border/70 shadow-xs">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">{title}</span>
          <div
            className={`p-2 rounded-xl ${
              highlight ? "bg-emerald-500/15 text-emerald-800" : "bg-primary/10 text-primary"
            }`}
          >
            {icon}
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-foreground tabular-nums tracking-tight">
            {value}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
