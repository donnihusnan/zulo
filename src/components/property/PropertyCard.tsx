import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    slug: string;
    price: number;
    city: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    propertyType: string;
    status: string;
    image: string;
    featured?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden">

        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <Badge className="bg-primary text-white">Unggulan</Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {property.propertyType}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary text-primary-foreground font-bold border-none">
            {property.status === "available" ? "DIJUAL" : property.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" />
          <span>{property.city}, Indonesia</span>
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="line-clamp-1 text-lg font-bold hover:text-primary"
        >
          {property.title}
        </Link>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <div className="flex justify-between border-y py-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Kamar</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} K. Mandi</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Square className="h-4 w-4" />
            <span>{property.landSize} m²</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-2">
        <div className="text-xl font-extrabold text-primary">
          Rp {property.price.toLocaleString("id-ID")}
        </div>
        <Button size="sm" asChild>
          <Link href={`/properties/${property.slug}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
