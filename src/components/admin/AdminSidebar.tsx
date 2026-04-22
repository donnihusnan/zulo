"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { signOutUser } from "@/services/auth.service";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Berhasil keluar");
    } catch {
      toast.error("Gagal keluar");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Properti", href: "/admin/properties", icon: Home },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform sm:translate-x-0">
        <div className="h-full overflow-y-auto px-3 py-4 flex flex-col">
          <div className="mb-8 px-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Menu Utama
            </h2>
          </div>
          <ul className="space-y-2 font-medium text-sm flex-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-lg p-2 transition-colors hover:bg-muted",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      pathname === item.href
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  <span className="ml-3 flex-1">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="h-4 w-4" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 px-3 border-t pt-4 space-y-2">
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex w-full items-center rounded-lg p-2 text-sm font-medium text-red-500 hover:bg-red-50 group transition-colors"
            >
              <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors" />
              <span className="ml-3 text-left">Keluar</span>
            </button>
          </div>
        </div>
      </aside>


      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Keluar"
        description="Apakah Anda yakin ingin keluar dari sistem? Anda perlu masuk kembali untuk mengakses area admin."
        confirmText="Keluar"
        variant="destructive"
      />
    </>
  );
};



function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border", className)} />;
}

export default AdminSidebar;
