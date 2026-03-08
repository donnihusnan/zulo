# House Selling Platform — Full Technical Specification

## 1. Project Overview

A scalable **house selling platform** consisting of:

1. **Public Website**
   - Browse property listings
   - View property details
   - Search and filter houses
   - Submit inquiries

2. **Admin CMS**
   - Manage property listings
   - Upload property images
   - Manage inquiries
   - Manage agents
   - Update website content

The system must be:

- scalable
- modular
- SEO optimized
- production ready
- developer friendly

---

# 2. Core Technology Stack

## Frontend

Framework

- Next.js 15 (App Router)

Language

- TypeScript

Styling

- TailwindCSS

UI Components

- shadCN UI

State / Server Data

- TanStack Query

Tables

- TanStack Table

Forms

- React Hook Form

Validation

- Zod

Icons

- Lucide Icons

---

# 3. Backend Architecture

We use **Next.js Fullstack Architecture**

Frontend + Backend in same repository.

API implemented via:

```
Next.js Route Handlers
```

Advantages

- simpler deployment
- shared types
- less infrastructure
- good scalability

---

# 4. Infrastructure

Hosting

Frontend + API

- Vercel

Database

- PostgreSQL

Recommended providers

- Supabase
- Neon
- AWS RDS

ORM

- Prisma

File Storage

- AWS S3
- Cloudflare R2 (recommended)

Caching

- Upstash Redis

Authentication

- NextAuth (Auth.js)

Image optimization

- Next Image

---

# 5. Core System Features

## Public Website

Pages

Home Page

```
/
```

Features

- hero banner
- featured properties
- search box
- latest listings

---

Property Listing Page

```
/properties
```

Features

- pagination
- filters
- sorting

Filters

- city
- price range
- bedrooms
- bathrooms
- property type

---

Property Detail Page

```
/properties/[slug]
```

Information displayed

- title
- gallery
- price
- description
- house specs
- location
- agent contact
- inquiry form

---

Inquiry Form

User can send:

- name
- email
- phone
- message

Inquiry stored in database.

---

# 6. Admin CMS

Admin path

```
/admin
```

Protected by authentication.

Admin sections

Dashboard

```
/admin/dashboard
```

Properties

```
/admin/properties
```

Agents

```
/admin/agents
```

Inquiries

```
/admin/inquiries
```

Media

```
/admin/media
```

---

# 7. Database Schema

## Prisma ORM

Prisma used as ORM.

Database: PostgreSQL.

---

## Prisma Schema

model AdminUser {
id String @id @default(cuid())
name String
email String @unique
password String
role String @default("admin")
createdAt DateTime @default(now())
}

---

model Agent {
id String @id @default(cuid())
name String
phone String
email String?
photo String?
bio String?
createdAt DateTime @default(now())

properties Property[]
}

---

model Property {
id String @id @default(cuid())
title String
slug String @unique
description String
price Float
city String
address String
bedrooms Int
bathrooms Int
landSize Float
buildingSize Float
propertyType String
status String @default("available")
featured Boolean @default(false)

agentId String?
agent Agent? @relation(fields: [agentId], references: [id])

images PropertyImage[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

---

model PropertyImage {
id String @id @default(cuid())
propertyId String
imageUrl String
order Int

property Property @relation(fields: [propertyId], references: [id])
}

---

model Inquiry {
id String @id @default(cuid())
propertyId String?
name String
email String
phone String
message String
status String @default("new")

property Property? @relation(fields: [propertyId], references: [id])

createdAt DateTime @default(now())
}

---

# 8. API Design

Base route

```
/api
```

---

## Properties

GET properties

```
GET /api/properties
```

Query parameters

```
page
limit
city
minPrice
maxPrice
bedrooms
bathrooms
propertyType
```

---

Get property detail

```
GET /api/properties/[slug]
```

---

Create property

```
POST /api/admin/properties
```

---

Update property

```
PUT /api/admin/properties/[id]
```

---

Delete property

```
DELETE /api/admin/properties/[id]
```

---

## Inquiry

Create inquiry

```
POST /api/inquiries
```

---

Get inquiries (admin)

```
GET /api/admin/inquiries
```

---

Update inquiry status

```
PATCH /api/admin/inquiries/[id]
```

---

# 9. File Upload System

Upload flow

```
client
   ↓
API route
   ↓
upload to R2 / S3
   ↓
return public URL
   ↓
save URL in database
```

Benefits

- scalable
- CDN optimized
- cheap storage

---

# 10. Folder Structure

/src

app

```
(app router)
```

public routes

```
/(page)
/properties
/properties/[slug]
```

admin routes

```
/admin/dashboard
/admin/properties
/admin/agents
/admin/inquiries
```

---

components

```
ui (shadcn)
property
admin
forms
layout
```

---

features

```
properties
agents
inquiries
auth
```

---

services

```
property.service.ts
agent.service.ts
inquiry.service.ts
upload.service.ts
```

---

lib

```
prisma.ts
auth.ts
s3.ts
utils.ts
query-client.ts
```

---

types

```
property.types.ts
agent.types.ts
inquiry.types.ts
```

---

validators

```
property.schema.ts
inquiry.schema.ts
auth.schema.ts
```

---

hooks

```
useProperties.ts
useProperty.ts
useCreateProperty.ts
useInquiries.ts
```

---

# 11. TanStack Query Usage

All server data fetched with TanStack Query.

Example

Properties list

```
useQuery({
  queryKey: ['properties', filters],
  queryFn: fetchProperties
})
```

Mutation example

```
useMutation({
  mutationFn: createProperty
})
```

---

# 12. Admin Tables

Admin tables implemented with:

```
TanStack Table
```

---

Properties Table Columns

```
title
price
city
status
featured
createdAt
actions
```

---

Inquiry Table Columns

```
name
property
email
phone
status
createdAt
actions
```

---

# 13. Validation

All API inputs validated using

```
Zod
```

Example property schema

```
title
description
price
city
bedrooms
bathrooms
```

---

# 14. Authentication

Admin authentication via

```
NextAuth
```

Strategy

```
Credentials Provider
```

Session storage

```
JWT
```

Admin routes protected via middleware.

---

# 15. SEO Strategy

SEO critical for real estate sites.

Implement

- dynamic metadata
- sitemap.xml
- robots.txt
- OpenGraph tags
- JSON-LD structured data

---

# 16. Performance Strategy

Use

Server Components

Static generation where possible

Property pages

```
ISR (revalidate)
```

Image optimization

```
next/image
```

Caching

```
Redis
```

---

# 17. Future Features

Potential expansion

Agents marketplace

User accounts

Favorites system

Mortgage calculator

Property comparison

Map search (Google Maps)

Property booking schedule

---

# 18. Development Phases

Phase 1

Core MVP

- property listing
- property detail
- admin CRUD property
- inquiry system

---

Phase 2

CMS improvement

- agent management
- media library
- inquiry dashboard

---

Phase 3

Advanced features

- search optimization
- favorites
- analytics
- SEO upgrades

---

# 19. Coding Standards

Strict TypeScript.

Rules

- no business logic inside components
- services handle API calls
- components remain UI only
- reusable hooks
- proper typing for all models
- clean folder architecture

---

# 20. Testing

Recommended stack

Vitest

React Testing Library

Test

- services
- API routes
- critical components

---

# 21. Deployment

Deployment pipeline

GitHub

↓

Vercel CI/CD

Build steps

```
install
typecheck
build
deploy
```

---

# 22. Environment Variables

Example

DATABASE_URL

NEXTAUTH_SECRET

NEXTAUTH_URL

S3_BUCKET

S3_REGION

S3_ACCESS_KEY

S3_SECRET_KEY

REDIS_URL

---

# 23. Development Rules for Agents

Agents must follow these rules

1. Strict TypeScript
2. Use TanStack Query for server data
3. Use TanStack Table for admin tables
4. Use Zod for API validation
5. Never access DB directly from UI
6. Business logic must live in services
7. Keep components reusable
8. Follow folder structure
9. Use Prisma for all database access
10. Ensure scalability in design

---
