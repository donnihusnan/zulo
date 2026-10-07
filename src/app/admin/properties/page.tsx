import PropertiesTable from "@/components/admin/PropertiesTable";

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Manajemen Properti
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kelola listing properti, perbarui informasi, dan pantau ketersediaan.
        </p>
      </div>

      <PropertiesTable />
    </div>
  );
}
