import PropertiesTable from "@/components/admin/PropertiesTable";

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Manajemen Properti
        </h1>
        <p className="text-muted-foreground">
          Kelola listing properti, perbarui informasi, dan pantau ketersediaan.
        </p>
      </div>

      <PropertiesTable />
    </div>
  );
}
