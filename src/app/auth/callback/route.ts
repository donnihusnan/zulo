import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const rawRedirectTo =
    requestUrl.searchParams.get("redirect_to")?.toString() ||
    requestUrl.searchParams.get("redirectTo")?.toString();

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Validate redirect destination: must be relative path starting with single slash
      const isValidRedirect =
        rawRedirectTo &&
        rawRedirectTo.startsWith("/") &&
        !rawRedirectTo.startsWith("//") &&
        !rawRedirectTo.includes("\\") &&
        !rawRedirectTo.includes("://");

      if (isValidRedirect) {
        return NextResponse.redirect(`${origin}${rawRedirectTo}`);
      }
      return NextResponse.redirect(`${origin}/admin`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}
