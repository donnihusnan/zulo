"use client";

import { useState, useTransition, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/services/property.service";
import { deleteProperty } from "@/services/admin.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";

interface AdminProperty {
  id: string;
  title: string;
  slug: string;
  price: number;
  city: string;
  address?: string;
  image: string;
  propertyType: string;
  status: string;
  featured: boolean;
}

const PropertiesTable = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; title: string } | null>(null);

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: () => fetchProperties(),
  });

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    const { id, title } = propertyToDelete;
    
    startTransition(async () => {
      try {
        await deleteProperty(id);
        toast.success(`Properti "${title}" berhasil dihapus`);
        refetch();
        router.refresh();
        setPropertyToDelete(null);
      } catch {
        toast.error("Gagal menghapus properti");
      }
    });
  };

  const columns = useMemo<ColumnDef<AdminProperty>[]>(() => [
    {
      accessorKey: "image",
      header: "Gambar",
      cell: ({ row }) => (
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border shadow-sm">
          <Image
            src={row.getValue("image")}
            alt={row.getValue("title")}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Judul
            <ArrowUpDown className="h-3 w-3" />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[250px]">
          <span className="font-bold truncate text-foreground group-hover:text-primary transition-colors">
            {row.getValue("title")}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.propertyType}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Harga
            <ArrowUpDown className="h-3 w-3" />
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price") as string);
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(amount);
        return <div className="font-medium whitespace-nowrap">{formatted}</div>;
      },
    },
    {
      accessorKey: "city",
      header: "Lokasi",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("city")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={status === "available" ? "default" : "outline"}
            className={
              status === "available"
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none shadow-none"
                : "bg-red-50 text-red-600 hover:bg-red-50 border-red-100"
            }
          >
            <div className="flex items-center gap-1.5">
              {status === "available" ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {status === "available" ? "Tersedia" : "Tidak Tersedia"}
            </div>
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        if (!value || value === "all") return true;
        return row.getValue(id) === value;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 px-2 py-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Opsi Konten
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/properties/${property.slug}`} target="_blank">
                      <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                      Lihat Halaman
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/properties/${property.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                      Edit Detail
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setPropertyToDelete({ id: property.id, title: property.title })}
                  className="text-red-500 font-medium focus:bg-red-50 focus:text-red-600"
                  disabled={isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Properti
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], [isPending]);

  const table = useReactTable({
    data: properties,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchStr = (row.original.title + " " + row.original.city + " " + (row.original.address || "")).toLowerCase();
      return searchStr.includes(filterValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full bg-emerald-500/5 h-[80px] animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari judul, kota, atau lokasi..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 bg-background/50 border-emerald-100 focus-visible:ring-emerald-500 h-10"
            />
          </div>
          
          <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
          >
            <SelectTrigger className="w-[180px] bg-background/50 border-emerald-100 h-10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Semua Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="available">Tersedia</SelectItem>
              <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="button"
          onClick={() => router.push("/admin/properties/add")}
          className="h-10 px-6 font-bold shadow-emerald-200 shadow-lg hover:shadow-emerald-300 transition-all"
        >
          <Plus className="mr-2 h-5 w-5" />
          Tambah Properti
        </Button>
      </div>

      <div className="rounded-2xl border bg-card/30 backdrop-blur-sm shadow-xl shadow-emerald-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-emerald-100 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-emerald-900/60 font-bold uppercase text-[10px] tracking-widest h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-emerald-50/50 hover:bg-emerald-50/30 transition-all cursor-default"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                       <Search className="h-8 w-8 opacity-20" />
                       <p className="font-medium">Tidak ada properti yang ditemukan.</p>
                       <p className="text-xs">Coba sesuaikan kata kunci atau filter Anda.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground font-medium">
          Menampilkan <span className="text-foreground">{table.getFilteredRowModel().rows.length}</span> properti
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Baris per halaman</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px] bg-background/50 border-emerald-100">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-10 w-10 p-0 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Halaman sebelumnya</span>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="h-10 w-10 p-0 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Halaman berikutnya</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!propertyToDelete}
        onClose={() => setPropertyToDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Properti"
        description={`Apakah Anda yakin ingin menghapus properti "${propertyToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        variant="destructive"
        isLoading={isPending}
      />
    </div>
  );
};

export default PropertiesTable;
