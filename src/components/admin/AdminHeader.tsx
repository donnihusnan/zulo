"use client";

import { User, Home as HomeIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }: AdminHeaderProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full max-w-full border-b bg-card px-3 sm:px-8 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="sm:hidden -ml-1 h-9 w-9 text-foreground hover:bg-muted"
              aria-label={isSidebarOpen ? "Tutup Menu" : "Buka Menu"}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </Button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border/80 bg-background/60 hover:bg-primary/5 hover:border-primary/40 transition-all text-xs font-bold group"
          >
            <Image 
              src="/zulo-logo.png" 
              alt="Zulo Logo" 
              width={22} 
              height={22} 
              className="h-5 w-auto rounded shrink-0"
            />
            <span className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors">
              <HomeIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
              <span className="sm:hidden">Beranda</span>
            </span>
          </Link>
        </div>


        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none capitalize">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Administrator"}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">
                {user?.email || "Super Admin"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border bg-muted h-9 w-9"
            >
              <User className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};


export default AdminHeader;
