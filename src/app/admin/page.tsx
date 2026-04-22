"use client";

import {
  Home,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/admin.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchDashboardStats(),
  });

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">
            Ringkasan Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang kembali! Pantau performa properti Anda di sini.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {isStatsLoading ? (
          [1, 2].map((i) => (
            <Card key={i} className="border-none shadow-xl shadow-emerald-900/5 overflow-hidden">
              <CardContent className="p-8">
                <Skeleton className="h-12 w-12 rounded-2xl mb-6" />
                <Skeleton className="h-5 w-1/2 mb-3" />
                <Skeleton className="h-10 w-1/3" />
              </CardContent>
            </Card>
          ))
        ) : stats ? (
          <>
            <StatCard
              title="Total Properti"
              value={stats.totalProperties.value.toString()}
              change={stats.totalProperties.change}
              trend={stats.totalProperties.trend}
              icon={<Home className="h-6 w-6" />}
            />
            <StatCard
              title="Listing Aktif"
              value={stats.activeListings.value.toString()}
              change={stats.activeListings.change}
              trend={stats.activeListings.trend}
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </>
        ) : null}
      </div>

      <div className="grid gap-6">
        <Card className="shadow-2xl shadow-emerald-900/5 border-none bg-primary/5 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Performa Platform</CardTitle>
            <CardDescription>
              Kunjungan dan interaksi dalam 30 hari terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-2 border-dashed border-primary/10 m-8 rounded-3xl bg-background/50">
            <div className="text-center group">
              <Eye className="h-12 w-12 text-primary/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                Data Visualisasi Sedang Disiapkan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-none shadow-md overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            {icon}
          </div>
          <div
            className={cn(
              "flex items-center text-xs font-bold px-2 py-1 rounded-full",
              trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-black">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
