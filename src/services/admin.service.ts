"use server";

import prisma from "@/lib/prisma";

export const fetchDashboardStats = async () => {
  try {
    const [totalProperties, activeProperties] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "available" } }),
    ]);

    return {
      totalProperties: { value: totalProperties, change: "+0%", trend: "up" as const },
      activeListings: { value: activeProperties, change: "+0%", trend: "up" as const },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalProperties: { value: 0, change: "0%", trend: "up" as const },
      activeListings: { value: 0, change: "0%", trend: "up" as const },
    };
  }
};


export const createProperty = async (data: any) => {
  try {
    const { images, ...propertyData } = data;
    
    return await prisma.$transaction(async (tx) => {
      const property = await tx.property.create({
        data: {
          ...propertyData,
          price: parseFloat(propertyData.price),
          bedrooms: parseInt(propertyData.bedrooms),
          bathrooms: parseInt(propertyData.bathrooms),
          landSize: parseFloat(propertyData.landSize),
          buildingSize: propertyData.buildingSize ? parseFloat(propertyData.buildingSize) : 0,
        },
      });

      if (images && Array.isArray(images) && images.length > 0) {
        await tx.propertyImage.createMany({
          data: images.map((url, index) => ({
            propertyId: property.id,
            imageUrl: url,
            order: index,
          })),
        });
      }

      return property;
    });
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};



export const fetchPropertyById = async (id: string) => {
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

export const updateProperty = async (id: string, data: any) => {
  try {
    const { images, ...propertyData } = data;
    
    return await prisma.$transaction(async (tx) => {
      const property = await tx.property.update({
        where: { id },
        data: {
          ...propertyData,
          price: parseFloat(propertyData.price),
          bedrooms: parseInt(propertyData.bedrooms),
          bathrooms: parseInt(propertyData.bathrooms),
          landSize: parseFloat(propertyData.landSize),
          buildingSize: propertyData.buildingSize ? parseFloat(propertyData.buildingSize) : 0,
        },
      });

      // Simple sync: delete all and re-create
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

      return property;
    });
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {

  try {
    return await prisma.property.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

