"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const rawRedirect = searchParams.get("redirectTo");
  const redirectTo =
    rawRedirect &&
    rawRedirect.startsWith("/") &&
    !rawRedirect.startsWith("//") &&
    !rawRedirect.includes("\\") &&
    !rawRedirect.includes("://")
      ? rawRedirect
      : "/admin";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message === "Invalid login credentials"
            ? "Email atau kata sandi tidak cocok."
            : err.message
          : "Terjadi kesalahan saat masuk.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Masuk ke Dashboard
        </CardTitle>
        <CardDescription>
          Gunakan kredensial akun administrator Anda.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAuth}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email Administrator</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@zulo.id"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Kata Sandi</Label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-primary py-6 text-base font-bold hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              "Masuk ke Portal Admin"
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center pt-2">
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Akses terbatas untuk tim dan staf pengelola resmi Zulo.</span>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src="/zulo-logo.png"
            alt="Zulo Logo"
            width={64}
            height={64}
            className="mb-2"
          />
          <h1 className="text-3xl font-black tracking-tight text-primary">
            ZULO ADMIN
          </h1>
          <p className="text-sm text-muted-foreground">
            Portal otentikasi aman manajemen properti.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
