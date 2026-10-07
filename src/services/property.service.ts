"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Property } from "@/types/property.types";

const FALLBACK_PROPERTY_IMAGE = "/images/cari-properti.jpg";

export interface PropertyFilterParams {
  city?: string;
  type?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  minArea?: string | number;
  maxArea?: string | number;
  sort?: "newest" | "price-asc" | "price-desc";
}

export const fetchProperties = async (filters?: PropertyFilterParams): Promise<Property[]> => {
  try {
    const where: Prisma.PropertyWhereInput = {};

    if (filters) {
      if (filters.city && filters.city !== "All" && filters.city.trim() !== "") {
        where.city = {
          equals: filters.city.trim(),
          mode: "insensitive",
        };
      }

      if (filters.type && filters.type !== "All" && filters.type.trim() !== "") {
        const normalizedType = filters.type.trim().toLowerCase();
        // Allow bilingual matching for seamless UX
        if (normalizedType === "house" || normalizedType === "rumah") {
          where.propertyType = { in: ["Rumah", "House"], mode: "insensitive" };
        } else if (normalizedType === "apartment" || normalizedType === "apartemen") {
          where.propertyType = { in: ["Apartemen", "Apartment"], mode: "insensitive" };
        } else if (normalizedType === "villa") {
          where.propertyType = { equals: "Villa", mode: "insensitive" };
        } else if (normalizedType === "ruko") {
          where.propertyType = { equals: "Ruko", mode: "insensitive" };
        } else if (normalizedType === "tanah") {
          where.propertyType = { equals: "Tanah", mode: "insensitive" };
        } else {
          where.propertyType = {
            equals: filters.type.trim(),
            mode: "insensitive",
          };
        }
      }

      const priceFilter: Prisma.FloatFilter = {};
      if (filters.minPrice && !isNaN(Number(filters.minPrice))) {
        priceFilter.gte = Number(filters.minPrice);
      }
      if (filters.maxPrice && !isNaN(Number(filters.maxPrice))) {
        priceFilter.lte = Number(filters.maxPrice);
      }
      if (Object.keys(priceFilter).length > 0) {
        where.price = priceFilter;
      }

      if (filters.bedrooms && filters.bedrooms !== "Any" && !isNaN(Number(filters.bedrooms))) {
        where.bedrooms = {
          gte: Number(filters.bedrooms),
        };
      }

      if (filters.bathrooms && filters.bathrooms !== "Any" && !isNaN(Number(filters.bathrooms))) {
        where.bathrooms = {
          gte: Number(filters.bathrooms),
        };
      }

      const landSizeFilter: Prisma.FloatFilter = {};
      if (filters.minArea && !isNaN(Number(filters.minArea))) {
        landSizeFilter.gte = Number(filters.minArea);
      }
      if (filters.maxArea && !isNaN(Number(filters.maxArea))) {
        landSizeFilter.lte = Number(filters.maxArea);
      }
      if (Object.keys(landSizeFilter).length > 0) {
        where.landSize = landSizeFilter;
      }
    }

    // Determine sorting
    let orderBy: Prisma.PropertyOrderByWithRelationInput = { createdAt: "desc" };
    if (filters?.sort === "price-asc") {
      orderBy = { price: "asc" };
    } else if (filters?.sort === "price-desc") {
      orderBy = { price: "desc" };
    } else {
      orderBy = { createdAt: "desc" };
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
      orderBy,
    });

    return properties.map((p) => ({
      ...p,
      image: p.images[0]?.imageUrl || FALLBACK_PROPERTY_IMAGE,
    }));
  } catch (error) {
    console.error("Error fetching properties from DB:", error);
    return [];
  }
};

export const fetchPropertyBySlug = async (slug: string): Promise<Property | null> => {
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
      image: property.images[0]?.imageUrl || FALLBACK_PROPERTY_IMAGE,
    };
  } catch (error) {
    console.error("Error fetching property by slug from DB:", error);
    return null;
  }
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const properties = await prisma.property.findMany({
      where: { 
        featured: true,
        status: "available",
      },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    // If fewer than 3 featured properties, fallback to latest available
    if (properties.length === 0) {
      const fallbackProperties = await prisma.property.findMany({
        include: {
          images: {
            orderBy: { order: "asc" },
          },
        },
        take: 3,
        orderBy: { createdAt: "desc" },
      });

      return fallbackProperties.map((p) => ({
        ...p,
        image: p.images[0]?.imageUrl || FALLBACK_PROPERTY_IMAGE,
      }));
    }

    return properties.map((p) => ({
      ...p,
      image: p.images[0]?.imageUrl || FALLBACK_PROPERTY_IMAGE,
    }));
  } catch (error) {
    console.error("Error fetching featured properties from DB:", error);
    return [];
  }
};

export interface GalleryImageItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  slug?: string;
}

const FALLBACK_GALLERY_ITEMS: GalleryImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    alt: "Villa Emerald Modern",
    title: "Villa Emerald Modern",
    subtitle: "Jakarta • Villa",
  },
  {
    src: "/z-home/brosur-1.jpeg",
    alt: "Z-Home Hasramah Fasad Skandinavia",
    title: "Z-Home Hasramah",
    subtitle: "Bandung • Rumah",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Rumah Minimalis Kontemporer",
    title: "Rumah Minimalis Kontemporer",
    subtitle: "Bandung • Rumah",
  },
  {
    src: "/images/bangun-rumah.jpg",
    alt: "Konstruksi Rumah Presisi",
    title: "Bangun Rumah Presisi",
    subtitle: "YAB Studio • Konstruksi",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "The Green Haven Residence",
    title: "The Green Haven Residence",
    subtitle: "Surabaya • Apartemen",
  },
  {
    src: "/z-home/brosur-2.jpeg",
    alt: "Z-Home Cluster Eksklusif",
    title: "Z-Home Cluster Eksklusif",
    subtitle: "Bandung • Rumah",
  },
  {
    src: "/images/cari-properti.jpg",
    alt: "Koleksi Properti Terverifikasi",
    title: "Koleksi Properti Terverifikasi",
    subtitle: "Zulo Listing • Pilihan",
  },
  {
    src: "/z-home/brosur-3.jpeg",
    alt: "Desain Interior & Arsitektur Tropis",
    title: "Desain Interior & Arsitektur Tropis",
    subtitle: "Z-Home • Interior",
  },
];

export const fetchGalleryImages = async (): Promise<GalleryImageItem[]> => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: "available",
        images: {
          some: {},
        },
      },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
      take: 12,
    });

    const items: GalleryImageItem[] = [];

    // Interleave images round-robin across properties to ensure visual diversity
    let maxImages = 0;
    for (const p of properties) {
      if (p.images.length > maxImages) {
        maxImages = p.images.length;
      }
    }

    for (let round = 0; round < Math.min(maxImages, 3); round++) {
      for (const prop of properties) {
        const img = prop.images[round];
        if (img?.imageUrl && img.imageUrl.trim() !== "") {
          items.push({
            src: img.imageUrl,
            alt: `${prop.title} — ${prop.city}`,
            title: prop.title,
            subtitle: `${prop.city} • ${prop.propertyType}`,
            slug: prop.slug,
          });
        }
      }
    }

    // If database provides sufficient items (>= 4), return them directly
    if (items.length >= 4) {
      return items;
    }

    // If fewer than 4 items, supplement with curated fallbacks for seamless looping
    if (items.length > 0) {
      const existingUrls = new Set(items.map((i) => i.src));
      const remaining = FALLBACK_GALLERY_ITEMS.filter((f) => !existingUrls.has(f.src));
      return [...items, ...remaining].slice(0, 8);
    }

    return FALLBACK_GALLERY_ITEMS;
  } catch (error) {
    console.error("Error fetching gallery images from DB:", error);
    return FALLBACK_GALLERY_ITEMS;
  }
};
