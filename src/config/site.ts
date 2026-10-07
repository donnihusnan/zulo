/**
 * Single source of truth for all website configuration, branding,
 * contact information, navigation, and product tracks.
 */

export const siteConfig = {
  name: "ZULO",
  legalName: "Zulo",
  tagline: "Platform Properti & Pembangunan Hunian Modern",
  description:
    "Solusi terpadu kebutuhan hunian Anda: listing properti siap huni terverifikasi, cluster eksklusif Z-Home Hasramah, dan jasa bangun rumah kustom profesional bersama YAB.",
  url: "https://zulo.id",

  contact: {
    whatsapp: "6288223307570",
    phoneDisplay: "+62 882-2330-7570",
    email: "hello@zulo.id",
    address:
      "Jl. Cipasung, Rancatungku, Pameumpeuk, Kab. Bandung, Jawa Barat 40376",
    mapsUrl:
      "https://maps.google.com/?q=Jl.+Cipasung,+Rancatungku,+Pameumpeuk,+Kab.+Bandung",
    hours: "Senin – Sabtu: 08:30 – 17:00 WIB",
  },

  socials: {
    instagram: "https://instagram.com/zulo.id",
    tiktok: "https://tiktok.com/@zulo.id",
    youtube: "https://youtube.com/@zulo_id",
  },

  products: {
    properti: {
      id: "properti",
      title: "Cari Properti",
      badge: "Listing Terverifikasi",
      description:
        "Jelajahi pilihan properti siap huni terkurasi dengan data legalitas yang akurat dan transparan.",
      href: "/properties",
      cta: "Jelajahi Properti",
      image: "/images/cari-properti.jpg",
    },
    zHome: {
      id: "z-home",
      title: "Z-Home Hasramah",
      badge: "Exclusive Mini Cluster",
      description:
        "Cluster eksklusif 30 unit dengan konsep 'One House, One Design'. Desain fasad unik, jalan lebar 6m, dan free arsitek 3D.",
      href: "/z-home",
      cta: "Pelajari Z-Home",
      image: "/z-home/brosur-1.jpeg",
      unitsTotal: 30,
      rowRoad: "6 Meter",
    },
    bangunRumah: {
      id: "bangun-rumah-yab",
      title: "Bangun Rumah x YAB",
      badge: "Design & Build Solution",
      description:
        "Kolaborasi eksklusif arsitektur Zulo dan kontraktor YAB untuk pembangunan rumah impian dari nol dengan transparansi RAB 100%.",
      href: "/bangun-rumah-yab",
      cta: "Konsultasi Bangun",
      image: "/images/bangun-rumah.jpg",
      guaranteeYears: 10,
    },
  },

  nav: [
    { label: "Beranda", href: "/" },
    { label: "Properti", href: "/properties" },
    { label: "Z-Home", href: "/z-home" },
    { label: "Bangun Rumah x YAB", href: "/bangun-rumah-yab" },
  ],
} as const;

/**
 * Generate a click-to-chat WhatsApp URL with prefilled message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultText = `Halo Zulo, saya ingin berkonsultasi mengenai layanan dan properti Zulo.`;
  const message = customMessage || defaultText;
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Format numbers as Indonesian Rupiah currency string
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clean slugify string for URLs (removes punctuation, double hyphens, and whitespace)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
