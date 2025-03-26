"use client";

import Image from "next/image";
import {
  Bed,
  Bath,
  SquareIcon,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    slug: string;
    banner?: {
      url: string;
    };
    propertyType?: string;
    startPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    squareMeters?: number;
    deliveryIn?: string;
    isSoldout?: boolean;
    compound?: {
      name: string;
      slug: string;
      area?: {
        name: string;
      };
      developer?: {
        name: string;
        logo?: {
          url: string;
        };
      };
    };
  };
  className?: string;
  onClick?: () => void;
}

export function PropertyCard({
  property,
  className,
  onClick,
}: PropertyCardProps) {
  // Format price with commas
  const formatPrice = (price?: number) => {
    if (!price) return "Prices To Be Announced";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      className={cn(
        "h-full border-0 shadow-lg overflow-hidden rounded-2xl group cursor-pointer",
        className
      )}
      onClick={
        onClick ||
        (() => (window.location.href = `/properties/${property.slug}`))
      }
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {property.banner?.url ? (
          <Image
            src={property.banner.url || "/placeholder.svg"}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/20 to-[#05596B]/5 flex items-center justify-center">
            <span className="text-[#05596B]">No image available</span>
          </div>
        )}

        {/* Property Type Badge */}
        {property.propertyType && (
          <Badge className="absolute top-3 right-3 bg-white/90 text-[#013344] z-10 font-medium">
            {property.propertyType}
          </Badge>
        )}

        {/* Developer Logo */}
        {property.compound?.developer?.logo?.url && (
          <Avatar className="absolute top-3 left-3 z-10 size-10 sm:size-12 bg-white/90 p-1 sm:p-1.5 rounded-full border-2 border-white shadow-md">
            <AvatarImage
              src={property.compound.developer.logo.url || "/placeholder.svg"}
              alt={property.compound.developer.name || "Developer"}
              className="object-contain"
            />
          </Avatar>
        )}

        {/* Sold Out Badge */}
        {property.isSoldout && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
              SOLD OUT
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Property Name and Location */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#013344] mb-1 line-clamp-1 group-hover:text-[#05596B] transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center text-[#05596B] text-xs sm:text-sm">
            <MapPin className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.compound?.name}
              {property.compound?.area?.name && (
                <>
                  <span className="text-[#05596B]/50 mx-1">•</span>
                  {property.compound.area.name}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-[#05596B]/5 px-3 py-2 rounded-lg">
          <p className="text-xs text-[#05596B]">Starting Price</p>
          <p className="text-sm sm:text-base font-bold text-[#013344]">
            {formatPrice(property.startPrice)}
          </p>
        </div>

        {/* Property Specs */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-1">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-full bg-[#05596B]/10">
                <Bed className="h-3 w-3 text-[#05596B]" />
              </div>
              <span className="text-xs text-[#05596B]">
                {property.bedrooms}{" "}
                {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
              </span>
            </div>
          )}

          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-full bg-[#05596B]/10">
                <Bath className="h-3 w-3 text-[#05596B]" />
              </div>
              <span className="text-xs text-[#05596B]">
                {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
              </span>
            </div>
          )}

          {property.squareMeters && (
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-full bg-[#05596B]/10">
                <SquareIcon className="h-3 w-3 text-[#05596B]" />
              </div>
              <span className="text-xs text-[#05596B]">
                {property.squareMeters} m²
              </span>
            </div>
          )}

          {property.deliveryIn && (
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-full bg-[#05596B]/10">
                <Calendar className="h-3 w-3 text-[#05596B]" />
              </div>
              <span className="text-xs text-[#05596B]">
                {property.deliveryIn}
              </span>
            </div>
          )}
        </div>

        <div className="pt-1 sm:pt-2 flex items-center text-[#05596B] font-medium">
          <span>View Details</span>
          <div className="ml-2 size-6 rounded-full bg-[#05596B]/10 flex items-center justify-center group-hover:bg-[#05596B] group-hover:text-white transition-colors">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
