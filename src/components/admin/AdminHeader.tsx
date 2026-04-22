"use client";

import { Bell, User, LogOut, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const AdminHeader = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-card px-4 py-3 sm:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-3 group transition-all">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Image 
                src="/zulo-logo.png" 
                alt="Zulo Logo" 
                width={28} 
                height={28} 
                className="h-6 w-auto"
              />
            </div>
            <Button variant="ghost" className="h-9 px-3 text-xs font-bold uppercase tracking-widest text-primary gap-2 hover:bg-primary/5">
              <HomeIcon className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
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
