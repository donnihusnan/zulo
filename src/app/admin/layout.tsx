import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-4 pt-24 transition-all duration-300 sm:ml-64 sm:p-8 sm:pt-24">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
