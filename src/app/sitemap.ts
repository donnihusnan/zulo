import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/z-home`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bangun-rumah-yab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic property detail pages
  try {
    const properties = await prisma.property.findMany({
      select: { slug: true, updatedAt: true },
      take: 200,
    });

    const propertyRoutes: MetadataRoute.Sitemap = properties.map(
      (prop: { slug: string; updatedAt?: Date | null }) => ({
        url: `${baseUrl}/properties/${prop.slug}`,
        lastModified: prop.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    );

    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
