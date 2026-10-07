import { NextResponse } from "next/server";
import { fetchGalleryImages } from "@/services/property.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await fetchGalleryImages();
    return NextResponse.json(
      {
        success: true,
        count: items.length,
        data: items,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error) {
    console.error("API Error fetching gallery images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }
}
