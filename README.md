# ZULO — Platform Properti & Pembangunan Hunian Modern

Modern, fullstack real estate and construction platform built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS v4**, **Supabase (Auth, Postgres, Storage)**, **Prisma ORM**, and **TanStack Query**.

---

## 🌟 Key Features & Product Tracks

### 1. Public Real Estate Portal
- **Beranda (`/`)**: Hero carousel properti dinamis, showcase Z-Home & Bangun Rumah, highlight keunggulan, galeri interaktif, dan FAQ.
- **Katalog Properti (`/properties`)**: Listing properti terverifikasi dengan filter kota, jenis bangunan, rentang harga, dan status ketersediaan.
- **Detail Properti (`/properties/[slug]`)**: Galeri foto multi-angle, spesifikasi lengkap (LT, LB, KT, KM), skema pembayaran (Cash/KPR), estimasi angsuran, dan integrasi direct inquiry via WhatsApp.
- **Z-Home Hasramah (`/z-home`)**: Mini cluster eksklusif 30 unit dengan konsep *"One House, One Design"*, akses jalan 6m, fasilitas cluster, dan booking survey.
- **Bangun Rumah x YAB (`/bangun-rumah-yab`)**: Solusi rancang-bangun kemitraan arsitektur Zulo dan kontraktor YAB. Dilengkapi kalkulator estimasi RAB interaktif, paket material, dan garansi konstruksi 10 tahun.

### 2. Admin Content Management System (CMS)
- **Ringkasan Dashboard (`/admin`)**: Metrik inventaris real-time, rasio listing aktif, distribusi kategori properti, sebaran wilayah kota, dan 5 listing terbaru.
- **Tabel Properti Terpadu (`/admin/properties`)**: Manajemen data menggunakan **TanStack Table** dengan pencarian global, filter status, pengurutan, pagination responsif, dan konfirmasi modal hapus.
- **Form Tambah & Edit Properti (`/admin/properties/add`, `/admin/properties/[id]/edit`)**:
  - Multi-image upload langsung ke bucket **Supabase Storage** (`property-images`).
  - Pemilihan multi-skema pembayaran (*Cash Keras, Cash Bertahap, KPR Bank, KPR Developer*).
  - Validasi data ketat dan update status (*Tersedia / Tidak Tersedia*).
- **Keamanan & Autentikasi**: Proteksi rute berbasis server (`createClient` SSR) dan Supabase Auth cookie session guard.
- **Desain Responsif**: Drawer sidebar mobile dengan backdrop overlay, drawer close button, dan hamburger navigation.

---

## 🛠️ Tech Stack

| Domain | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Package Manager** | [Bun](https://bun.sh/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`, [shadcn/ui](https://ui.shadcn.com/), Radix UI |
| **Motion & WebGL Canvas** | [OGL](https://github.com/oframe/ogl) (Strands WebGL), GSAP, Lucide Icons |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) |
| **Database & ORM** | [Prisma ORM v7](https://www.prisma.io/) & PostgreSQL |
| **Backend & Auth** | [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth SSR, Supabase Storage) |
| **Forms & Notification** | React Hook Form, Sonner (Toast notifications) |

---

## 📁 Project Structure

```text
zulo/
├── prisma/
│   ├── schema.prisma        # Skema model Property dan PropertyImage
│   └── seed.ts              # Data awal/seeding database
├── public/                  # Asset publik (logo, foto cluster, brosur)
├── src/
│   ├── app/
│   │   ├── (public)/        # Rute publik (/, /properties, /z-home, /bangun-rumah-yab)
│   │   ├── admin/           # Rute CMS admin terlindungi (/admin, /properties, /add, /edit)
│   │   ├── api/             # API Route Handlers (gallery, dsb.)
│   │   ├── auth/            # Auth callback route Supabase
│   │   ├── globals.css      # Design tokens Tailwind CSS v4 & tema Emerald
│   │   └── layout.tsx       # Root layout & providers
│   ├── components/
│   │   ├── admin/           # Komponen CMS (AdminShell, AdminSidebar, PropertiesTable, dll.)
│   │   ├── home/            # Komponen landing page (Hero, FlexCarousel, dll.)
│   │   ├── layout/          # Navbar & Footer
│   │   ├── property/        # Komponen properti publik (PropertyCard, ContactCTA, dll.)
│   │   └── ui/              # Primitif UI (Button, Card, Dialog, Table, Input, dll.)
│   ├── config/
│   │   └── site.ts          # Single source of truth konfigurasi web, kontak, & helpers
│   ├── services/            # Abstraksi business logic & pemanggilan API Supabase/Prisma
│   ├── types/               # TypeScript interfaces & domain types
│   └── utils/
│       └── supabase/        # Supabase client & server factory (@supabase/ssr)
├── bun.lock                 # Bun lockfile
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Bun](https://bun.sh/) installed (v1.2+ recommended)
- Akun Supabase (project PostgreSQL & Storage bucket aktif)

### 2. Install Dependencies
```bash
bun install
```

### 3. Environment Variables
Buat berkas `.env` di direktori utama:

```env
# Database connection (Prisma / Supabase Postgres)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"

# Supabase Auth & Storage
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="[YOUR_SUPABASE_ANON_KEY]"

# App URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Catatan Storage Supabase:** Pastikan bucket dengan nama `property-images` telah dibuat di dashboard Supabase dengan kebijakan akses *Public* (Read).

### 4. Database Migration & Seeding
Sinkronisasikan skema Prisma ke database Supabase dan masukkan data awal:

```bash
bun x prisma db push
bun x prisma db seed
```

### 5. Menjalankan Server Development
```bash
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat website publik, atau [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke dashboard admin.

---

## 📜 Available Scripts

- `bun run dev` — Menjalankan development server lokal dengan Turbopack.
- `bun run build` — Melakukan optimasi dan kompilasi production build.
- `bun run start` — Menjalankan server build production.
- `bun run lint` — Menjalankan ESLint untuk memeriksa kualitas kode.
- `bun x tsc --noEmit` — Memvalidasi seluruh type-checking TypeScript tanpa emit file.

---

## 🔒 Security & Best Practices

- **Supabase SSR Authentication**: Validasi kredensial admin dieksekusi di Server Components sebelum konten dashboard di-render.
- **Sanitized Uploads**: Unggahan berkas foto properti divalidasi MIME-type (JPG, PNG, WebP, AVIF) dan batas ukuran maksimum 5MB.
- **Mobile Responsive Guaranteed**: Seluruh tampilan publik dan dashboard CMS telah diuji untuk viewport desktop (1920px), tablet (768px), dan mobile (360–385px).
