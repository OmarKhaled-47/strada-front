/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Trash2, Bed, Bath, Maximize2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import GetCompoundApi from "@/app/api/CompoundApi";

interface PropertyCardProps {
  property: any;
  onRemove: () => void;
}

export function PropertyCard({ property, onRemove }: PropertyCardProps) {
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
  const propertyUrl = `/properties/${property.slug || property.id}`;

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
      <Link href={propertyUrl} className="flex-1 flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={bannerUrl || "/placeholder.svg"}
            alt={property.name || "Property"}
            fill
            className="object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.isRecommended && (
              <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1">
                Recommended
              </Badge>
            )}
            {property.isSoldout && (
              <Badge className="bg-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1">
                Sold Out
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }}
              className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
              aria-label="Remove from favorites"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 text-white">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{areaName}</span>
            </div>
            <h3 className="font-bold text-lg text-white mt-1 line-clamp-1">
              {property.name}
            </h3>
          </div>

          {developerLogo && (
            <div className="absolute bottom-3 right-3">
              <Avatar className="h-10 w-10 border-2 border-white bg-white">
                <AvatarImage
                  src={developerLogo}
                  className="object-contain p-1"
                />
                <AvatarFallback className="bg-[#05596B] text-white">
                  {developerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="text-xs border-[#CBBBAC] text-[#013344] font-medium"
            >
              {propertyType}
            </Badge>
            <span className="text-xs text-gray-500">By {developerName}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
            {property.bedrooms && (
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-full bg-[#F7F8F8]">
                  <Bed className="h-3.5 w-3.5 text-[#05596B]" />
                </div>
                <span>
                  <span className="font-medium">{property.bedrooms}</span> Beds
                </span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-full bg-[#F7F8F8]">
                  <Bath className="h-3.5 w-3.5 text-[#05596B]" />
                </div>
                <span>
                  <span className="font-medium">{property.bathrooms}</span>{" "}
                  Baths
                </span>
              </div>
            )}
            {property.squareMeters && (
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-full bg-[#F7F8F8]">
                  <Maximize2 className="h-3.5 w-3.5 text-[#05596B]" />
                </div>
                <span>
                  <span className="font-medium">{property.squareMeters}</span>{" "}
                  m²
                </span>
              </div>
            )}
            {property.deliveryIn && (
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-full bg-[#F7F8F8]">
                  <Calendar className="h-3.5 w-3.5 text-[#05596B]" />
                </div>
                <span>{property.deliveryIn}</span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            {property.startPrice ? (
              <p className="font-bold text-[#05596B] text-lg">
                {property.startPrice.toLocaleString()} EGP
              </p>
            ) : (
              <p className="text-sm text-gray-500">Price on request</p>
            )}
          </div>
        </CardContent>
      </Link>

      <div className="flex justify-end gap-2 p-4 pt-0">
        <CallButton
          phoneNumber="+0201123960001"
          className="rounded-lg bg-[#05596B]/10 text-[#05596B] hover:bg-[#05596B]/20 p-2.5"
          variant="rounded"
        />
        <WhatsAppButton
          phoneNumber="+0201123960001"
          message={`Hi, I'm interested in this ${propertyType} in ${areaName}`}
          className="rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2.5"
          variant="rounded"
        />
      </div>
    </Card>
  );
}
