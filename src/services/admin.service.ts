"use server";

import prisma from "@/lib/prisma";
import { PropertyInput } from "@/types/property.types";
import { slugify } from "@/config/site";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function requireAdminAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized: Anda harus masuk sebagai admin.");
  }

  return user;
}

function validatePropertyData(data: Partial<PropertyInput>) {
  if (data.title !== undefined) {
    const trimmed = data.title.trim();
    if (!trimmed || trimmed.length > 200) {
      throw new Error("Judul properti wajib diisi (maksimal 200 karakter).");
    }
  }

  if (data.price !== undefined) {
    const priceNum = Number(data.price);
    if (isNaN(priceNum) || priceNum < 0) {
      throw new Error("Harga properti harus berupa angka positif.");
    }
  }

  if (data.bedrooms !== undefined) {
    const num = Number(data.bedrooms);
    if (isNaN(num) || num < 0 || num > 100) {
      throw new Error("Jumlah kamar tidur tidak valid.");
    }
  }

  if (data.bathrooms !== undefined) {
    const num = Number(data.bathrooms);
    if (isNaN(num) || num < 0 || num > 100) {
      throw new Error("Jumlah kamar mandi tidak valid.");
    }
  }

  if (data.landSize !== undefined) {
    const num = Number(data.landSize);
    if (isNaN(num) || num < 0) {
      throw new Error("Luas tanah harus berupa angka positif.");
    }
  }

  if (data.buildingSize !== undefined && data.buildingSize !== "") {
    const num = Number(data.buildingSize);
    if (isNaN(num) || num < 0) {
      throw new Error("Luas bangunan harus berupa angka positif.");
    }
  }

  if (data.images && Array.isArray(data.images)) {
    if (data.images.length > 20) {
      throw new Error("Maksimal 20 gambar diperbolehkan.");
    }
    for (const img of data.images) {
      if (typeof img !== "string" || (!img.startsWith("http://") && !img.startsWith("https://") && !img.startsWith("/"))) {
        throw new Error("Format URL gambar tidak valid.");
      }
    }
  }
}

export interface DashboardStatsResult {
  totalProperties: { value: number; change: string; trend: "up" | "down" };
  activeListings: { value: number; change: string; trend: "up" | "down" };
  typeBreakdown: { type: string; count: number }[];
  cityBreakdown: { city: string; count: number }[];
  recentListings: {
    id: string;
    title: string;
    slug: string;
    price: number;
    city: string;
    propertyType: string;
    status: string;
    image: string;
    createdAt: Date;
  }[];
}

export const fetchDashboardStats = async (): Promise<DashboardStatsResult> => {
  await requireAdminAuth();
  try {
    const [totalProperties, activeProperties, allProperties, recentProperties] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "available" } }),
      prisma.property.findMany({
        select: {
          propertyType: true,
          city: true,
        },
      }),
      prisma.property.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
        },
      }),
    ]);

    // Type Breakdown calculation
    const typeMap = new Map<string, number>();
    const cityMap = new Map<string, number>();

    allProperties.forEach((item) => {
      typeMap.set(item.propertyType, (typeMap.get(item.propertyType) || 0) + 1);
      cityMap.set(item.city, (cityMap.get(item.city) || 0) + 1);
    });

    const typeBreakdown = Array.from(typeMap.entries()).map(([type, count]) => ({
      type,
      count,
    }));

    const cityBreakdown = Array.from(cityMap.entries()).map(([city, count]) => ({
      city,
      count,
    }));

    const recentListings = recentProperties.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      price: p.price,
      city: p.city,
      propertyType: p.propertyType,
      status: p.status,
      image: p.images[0]?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      createdAt: p.createdAt,
    }));

    return {
      totalProperties: { value: totalProperties, change: "+0%", trend: "up" },
      activeListings: { value: activeProperties, change: "+0%", trend: "up" },
      typeBreakdown,
      cityBreakdown,
      recentListings,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalProperties: { value: 0, change: "0%", trend: "up" },
      activeListings: { value: 0, change: "0%", trend: "up" },
      typeBreakdown: [],
      cityBreakdown: [],
      recentListings: [],
    };
  }
};

async function generateUniqueSlug(baseTitle: string, excludeId?: string): Promise<string> {
  const cleanBase = slugify(baseTitle) || "properti";
  let slug = cleanBase;
  let counter = 1;

  while (true) {
    const existing = await prisma.property.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug;
    }

    counter += 1;
    slug = `${cleanBase}-${counter}`;
  }
}

export const createProperty = async (data: PropertyInput) => {
  await requireAdminAuth();
  validatePropertyData(data);
  try {
    const { images, price, bedrooms, bathrooms, landSize, buildingSize, ...restData } = data;
    const finalSlug = await generateUniqueSlug(restData.title);

    const property = await prisma.$transaction(async (tx) => {
      const created = await tx.property.create({
        data: {
          ...restData,
          slug: finalSlug,
          price: Number(price),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          landSize: Number(landSize),
          buildingSize: buildingSize !== undefined && buildingSize !== "" ? Number(buildingSize) : 0,
        },
      });

      if (images && Array.isArray(images) && images.length > 0) {
        await tx.propertyImage.createMany({
          data: images.map((url, index) => ({
            propertyId: created.id,
            imageUrl: url,
            order: index,
          })),
        });
      }

      return created;
    });

    try {
      revalidatePath("/");
      revalidatePath("/properties");
    } catch {}

    return property;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

export const fetchPropertyById = async (id: string) => {
  await requireAdminAuth();
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!property) return null;

    return {
      ...property,
      image: property.images[0]?.imageUrl || "",
    };
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
};

export const updateProperty = async (id: string, data: Partial<PropertyInput>) => {
  await requireAdminAuth();
  validatePropertyData(data);
  try {
    const { images, price, bedrooms, bathrooms, landSize, buildingSize, ...restData } = data;

    let finalSlug: string | undefined = undefined;
    if (restData.title) {
      finalSlug = await generateUniqueSlug(restData.title, id);
    }

    const property = await prisma.$transaction(async (tx) => {
      const updated = await tx.property.update({
        where: { id },
        data: {
          ...restData,
          ...(finalSlug ? { slug: finalSlug } : {}),
          ...(price !== undefined ? { price: Number(price) } : {}),
          ...(bedrooms !== undefined ? { bedrooms: Number(bedrooms) } : {}),
          ...(bathrooms !== undefined ? { bathrooms: Number(bathrooms) } : {}),
          ...(landSize !== undefined ? { landSize: Number(landSize) } : {}),
          ...(buildingSize !== undefined ? { buildingSize: Number(buildingSize) } : {}),
        },
      });

      // Synchronize images if provided
      if (images && Array.isArray(images)) {
        await tx.propertyImage.deleteMany({
          where: { propertyId: id },
        });

        if (images.length > 0) {
          await tx.propertyImage.createMany({
            data: images.map((url, index) => ({
              propertyId: id,
              imageUrl: url,
              order: index,
            })),
          });
        }
      }

      return updated;
    });

    try {
      revalidatePath("/");
      revalidatePath("/properties");
    } catch {}

    return property;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {
  await requireAdminAuth();
  try {
    const result = await prisma.$transaction(async (tx) => {
      await tx.propertyImage.deleteMany({
        where: { propertyId: id },
      });

      return await tx.property.delete({
        where: { id },
      });
    });

    try {
      revalidatePath("/");
      revalidatePath("/properties");
    } catch {}

    return result;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};
