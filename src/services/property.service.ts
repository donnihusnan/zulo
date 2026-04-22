"use server";

import prisma from "@/lib/prisma";

export const fetchProperties = async (filters?: {
  city?: string;
  type?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  minArea?: string | number;
  maxArea?: string | number;
}) => {
  try {
    const where: any = {};

    if (filters) {
      if (filters.city && filters.city !== "All") {
        where.city = {
          equals: filters.city,
          mode: "insensitive",
        };
      }
      if (filters.type && filters.type !== "All") {
        where.propertyType = {
          equals: filters.type,
          mode: "insensitive",
        };
      }
      if (filters.minPrice) {
        where.price = {
          ...where.price,
          gte: Number(filters.minPrice),
        };
      }
      if (filters.maxPrice) {
        where.price = {
          ...where.price,
          lte: Number(filters.maxPrice),
        };
      }
      if (filters.bedrooms && filters.bedrooms !== "Any") {
        where.bedrooms = {
          gte: Number(filters.bedrooms),
        };
      }
      if (filters.bathrooms && filters.bathrooms !== "Any") {
        where.bathrooms = {
          gte: Number(filters.bathrooms),
        };
      }
      if (filters.minArea) {
        where.landSize = {
          ...where.landSize,
          gte: Number(filters.minArea),
        };
      }
      if (filters.maxArea) {
        where.landSize = {
          ...where.landSize,
          lte: Number(filters.maxArea),
        };
      }
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map Prisma model to our UI type (handling image field mapping)
    return properties.map((p) => ({
      ...p,
      image: p.images[0]?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    }));
  } catch (error) {
    console.error("Error fetching properties from DB:", error);
    return []; // Return empty array on error
  }
};

export const fetchPropertyBySlug = async (slug: string) => {
  try {
    const property = await prisma.property.findUnique({
      where: { slug },
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
      image: property.images[0]?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    };
  } catch (error) {
    console.error("Error fetching property by slug from DB:", error);
    return null;
  }
};

export const fetchFeaturedProperties = async () => {
  try {
    const properties = await prisma.property.findMany({
      where: { featured: true },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      take: 3,
    });

    return properties.map((p) => ({
      ...p,
      image: p.images[0]?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    }));
  } catch (error) {
    console.error("Error fetching featured properties from DB:", error);
    return [];
  }
};
