import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding database for Zulo...");

  // 0. Clean database
  await prisma.propertyImage.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.property.deleteMany();
  const properties = [
    {
      id: "cl_prop_1",
      title: "Villa Emerald Modern",
      slug: "villa-emerald-modern",
      description: "Villa mewah dengan desain kontemporer yang didominasi oleh elemen alam. Memiliki taman luas dan kolam renang infinity.",
      price: 5200000000,
      city: "Jakarta",
      address: "Kebayoran Baru, Jakarta Selatan",
      bedrooms: 5,
      bathrooms: 4,
      landSize: 450,
      buildingSize: 350,
      propertyType: "Villa",
      status: "available",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: "cl_prop_2",
      title: "Rumah Minimalis Zulo One",
      slug: "zulo-one-minimalist",
      description: "Ikon baru hunian minimalis di Bandung. Desain efisien dengan pemanfaatan cahaya alami maksimal.",
      price: 2100000000,
      city: "Bandung",
      address: "Dago, Bandung Utara",
      bedrooms: 3,
      bathrooms: 2,
      landSize: 120,
      buildingSize: 100,
      propertyType: "Rumah",
      status: "available",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: "cl_prop_3",
      title: "Penthouse Sky Garden",
      slug: "penthouse-sky-garden",
      description: "Apartemen termewah di Surabaya dengan taman pribadi di atap gedung. Pemandangan 360 derajat kota Surabaya.",
      price: 3500000000,
      city: "Surabaya",
      address: "Pakuwon, Surabaya Barat",
      bedrooms: 3,
      bathrooms: 3,
      landSize: 125,
      buildingSize: 125,
      propertyType: "Apartemen",
      status: "available",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  for (const prop of properties) {
    const { images, id, ...propData } = prop;
    await prisma.property.upsert({
      where: { slug: propData.slug },
      update: propData,
      create: {
        id,
        ...propData,
        images: {
          create: images.map((url, index) => ({
            imageUrl: url,
            order: index,
          })),
        },
      },
    });
  }

  console.log("Seeding completed successfully for Zulo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
