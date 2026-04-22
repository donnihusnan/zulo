export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  buildingSize: number;
  propertyType: string;
  status: string;
  featured: boolean;
  image: string;
  images?: PropertyImage[];
  paymentSchema?: string | null;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  order: number;
}

export interface Inquiry {
  id: string;
  propertyId: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface PropertyInput {
  title: string;
  slug: string;
  description: string;
  price: string | number;
  city: string;
  address: string;
  bedrooms: string | number;
  bathrooms: string | number;
  landSize: string | number;
  buildingSize?: string | number;
  propertyType: string;
  status?: string;
  featured?: boolean;
  paymentSchema?: string | null;
  images?: string[];
}
