/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Copy,
  Info,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CallButton } from "@/components/CallButton";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "@/app/_components/favorite-button";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GetCompoundApi from "@/app/api/CompoundApi";
import { WhatsAppButton } from "@/components/WhatsAppBtn";

interface PropertyCardProps {
  property: any;
  showActions?: boolean;
  className?: string;
  compact?: boolean;
}

export function PropertyCards({
  property,
  showActions = true,
  className,
  compact = false,
}: PropertyCardProps) {
  const [developerLogo, setDeveloperLogo] = useState<string | null>(null);
  const [developerName, setDeveloperName] =
    useState<string>("Unknown Developer");

  useEffect(() => {
    if (!property || !property.compound?.slug) return;

    const fetchDeveloperData = async () => {
      try {
        if (property.compound?.developer) {
          setDeveloperLogo(property.compound.developer.logo?.url || null);
          setDeveloperName(
            property.compound.developer.name || "Unknown Developer"
          );
          return;
        }

        const response = await GetCompoundApi.getCompoundWithDeveloper(
          property.compound.slug
        );
        const developerData = response.data.data[0]?.developer;

        if (developerData) {
          setDeveloperLogo(developerData.logo?.url || null);
          setDeveloperName(developerData.name || "Unknown Developer");
        }
      } catch (error) {
        console.error("Failed to fetch developer data:", error);
      }
    };

    fetchDeveloperData();
  }, [property]);

  if (!property) return null;

  const bannerUrl =
    property.banner?.url || "/placeholder.svg?height=240&width=400";
  const areaName = property.compound?.name || "Unknown Location";
  const propertyType = property.propertyType || "Property";

  const handleCopyUrl = () => {
    // Create a URL with the property slug
    const url = `${window.location.origin}/properties/${property.slug || property.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Property link copied to clipboard",
      duration: 3000,
    });
  };

  // Compact card layout for favorites page
  if (compact) {
    return (
      <div
        className={cn(
          "bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col group",
          className
        )}
      >
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={bannerUrl || "/placeholder.svg"}
            alt={property.name || "Property"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.isRecommended && (
              <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1 rounded-md">
                Recommended
              </Badge>
            )}
            {property.isSoldout && (
              <Badge className="bg-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1 rounded-md">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Developer Logo */}
          <div className="absolute bottom-3 right-3">
            <Avatar className="h-8 w-8 border-2 border-white bg-white/90">
              {developerLogo ? (
                <AvatarImage
                  src={developerLogo}
                  alt={developerName}
                  className="object-contain p-1"
                />
              ) : (
                <AvatarFallback className="bg-[#05596B] text-white">
                  {developerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Location & Title */}
          <div className="absolute bottom-3 left-3 right-12">
            <div className="flex items-center gap-1.5 text-white">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{areaName}</span>
            </div>
            <h3 className="font-bold text-lg text-white mt-1 line-clamp-1">
              {property.name}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Property Type & Developer */}
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="text-xs border-[#CBBBAC] text-[#013344] font-medium px-2 py-0.5"
            >
              {propertyType}
            </Badge>
            <span className="text-xs text-gray-500">By {developerName}</span>
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5 text-xs">
                <Bed className="h-3.5 w-3.5 text-[#05596B]" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5 text-xs">
                <Bath className="h-3.5 w-3.5 text-[#05596B]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.squareMeters && (
              <div className="flex items-center gap-1.5 text-xs">
                <Maximize2 className="h-3.5 w-3.5 text-[#05596B]" />
                <span>{property.squareMeters} m²</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto">
            {property.startPrice ? (
              <p className="font-bold text-[#05596B] text-lg">
                {property.startPrice.toLocaleString()} EGP
              </p>
            ) : (
              <p className="text-sm text-gray-500">Price on request</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-[#05596B] text-[#05596B] hover:bg-[#05596B]/10"
            >
              <Link href={`/properties/${property.slug || property.id}`}>
                <Info className="h-3.5 w-3.5 mr-1" />
                Details
              </Link>
            </Button>
            <CallButton
              phoneNumber="123456789"
              className="flex-1"
              variant="rounded"
            />
            <WhatsAppButton
              phoneNumber="123456789"
              message={`Hi, I'm interested in this ${propertyType} in ${areaName}`}
              className="flex-1"
              variant="default"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col group",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={bannerUrl || "/placeholder.svg"}
          alt={property.name || "Property"}
          fill
          className="object-cover  transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.isRecommended && (
            <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1 rounded-md">
              Recommended
            </Badge>
          )}
          {property.isSoldout && (
            <Badge className="bg-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1 rounded-md">
              Sold Out
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 bg-white/90 hover:bg-white"
            onClick={handleCopyUrl}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <div className="h-8">
            <FavoriteButton
              id={property.id}
              slug={property.slug}
              type="property"
            />
          </div>
        </div>
        {/* Developer Logo */}
        <div className="absolute bottom-3 right-3">
          <Avatar className="h-8 w-8 border-2 border-white bg-white/90">
            {developerLogo ? (
              <AvatarImage
                src={developerLogo}
                alt={developerName}
                className="object-contain p-1"
              />
            ) : (
              <AvatarFallback className="bg-[#05596B] text-white">
                {developerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Location & Title */}
        <div className="absolute bottom-3 left-3 right-12">
          <div className="flex items-center gap-1.5 text-white">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{areaName}</span>
          </div>
          <h3 className="font-bold text-lg text-white mt-1 line-clamp-1">
            {property.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Property Type & Developer */}
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="text-xs border-[#CBBBAC] text-[#013344] font-medium px-2 py-0.5"
          >
            {propertyType}
          </Badge>
          <span className="text-xs text-gray-500">By {developerName}</span>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5 text-xs">
              <Bed className="h-3.5 w-3.5 text-[#05596B]" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5 text-xs">
              <Bath className="h-3.5 w-3.5 text-[#05596B]" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.squareMeters && (
            <div className="flex items-center gap-1.5 text-xs">
              <Maximize2 className="h-3.5 w-3.5 text-[#05596B]" />
              <span>{property.squareMeters} m²</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto">
          {property.startPrice ? (
            <p className="font-bold text-[#05596B] text-lg">
              {property.startPrice.toLocaleString()} EGP
            </p>
          ) : (
            <p className="text-sm text-gray-500">Price on request</p>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 mt-3 justify-between">
            <div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-auto mt-2 text-[#05596B] border-[#05596B]/30 hover:bg-[#05596B]/5 hover:text-[#013344] flex items-center justify-center  "
              >
                <Link href={`/properties/${property.slug || property.id}`}>
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 mr-1" />
                </Link>
              </Button>
            </div>
            <div className="space-x-2">
              <CallButton phoneNumber="123456789" variant="rounded" />
              <WhatsAppButton
                phoneNumber="123456789"
                message={`Hi, I'm interested in this ${propertyType} in ${areaName}`}
                variant="rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
