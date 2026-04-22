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
  createdAt: string;
  updatedAt?: string;
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
