"use server";

import prisma from "@/lib/prisma";

export const fetchInquiries = async () => {
  try {
    return await prisma.inquiry.findMany({
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching inquiries from DB:", error);
    return [];
  }
};

export const createInquiry = async (data: {
  propertyId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    return await prisma.inquiry.create({
      data,
    });
  } catch (error) {
    console.error("Error creating inquiry in DB:", error);
    throw error;
  }
};

export const updateInquiryStatus = async (id: string, status: string) => {
  try {
    return await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    console.error("Error updating inquiry status in DB:", error);
    throw error;
  }
};
