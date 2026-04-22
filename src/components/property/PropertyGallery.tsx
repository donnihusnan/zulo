"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
        <Image
          src={images[activeIndex]}
          alt={`Property Image ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-500"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Zoom Button */}
        <div className="absolute bottom-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Indicator */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
              activeIndex === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
