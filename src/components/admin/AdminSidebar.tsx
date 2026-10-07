"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import { signOutUser } from "@/services/auth.service";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isOpen = false, onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);
  
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
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs sm:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card pt-16 transition-transform duration-300 ease-in-out sm:translate-x-0",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto px-3 py-4 flex flex-col">
          <div className="mb-6 px-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Menu Utama
            </h2>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="sm:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Tutup Menu"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <ul className="space-y-2 font-medium text-sm flex-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => onClose?.()}
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

          <div className="mt-8 px-2 border-t pt-4 space-y-3">
            {user && (
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-muted/50 sm:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs uppercase shrink-0">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || "A"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "Administrator"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {user.email || "Admin"}
                  </p>
                </div>
              </div>
            )}
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex w-full items-center rounded-lg p-2 text-sm font-medium text-red-500 hover:bg-red-500/10 group transition-colors"
            >
              <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors shrink-0" />
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

export default AdminSidebar;
