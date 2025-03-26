/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Trash2,
  ExternalLink,
  Gift,
  Building2,
  Sparkle,
  TrendingUp,
  Home,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import GetCompoundApi from "@/app/api/CompoundApi";
import axiosClient from "@/app/api/axiosClient";

interface CompoundCardProps {
  compound: any;
  onRemove: () => void;
}

export function CompoundCard({ compound, onRemove }: CompoundCardProps) {
  const [developerLogo, setDeveloperLogo] = useState<string | null>(null);
  const [developerName, setDeveloperName] =
    useState<string>("Unknown Developer");
  const [showMore, setShowMore] = useState(false);
  const [, setIsHovered] = useState(false);
  const [hasNonOriginalPlan, setHasNonOriginalPlan] = useState(false);

  useEffect(() => {
    if (!compound) return;

    const fetchDeveloperData = async () => {
      try {
        const response = await GetCompoundApi.getCompoundWithDeveloper(
          compound.slug
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

    const fetchOfferData = async () => {
      try {
        const response = await axiosClient.get(
          `/compounds?filters[id][$eq]=${compound.id}&populate[0]=offer.blocks`
        );
        const compoundData = response.data.data[0];

        if (
          compoundData?.offer?.blocks &&
          Array.isArray(compoundData.offer.blocks)
        ) {
          // Check if any block has isOriginalPlan=false
          const hasSpecialOffer = compoundData.offer.blocks.some(
            (block: any) => block.isOriginalPlan === false
          );
          setHasNonOriginalPlan(hasSpecialOffer);
        }
      } catch (error) {
        console.error("Failed to fetch offer data:", error);
      }
    };

    fetchDeveloperData();
    fetchOfferData();
  }, [compound]);

  if (!compound) return null;

  const bannerUrl =
    compound.banner?.url || "/placeholder.svg?height=300&width=400";
  const areaName = compound.area?.name || "Unknown Location";
  const propertyTypes = Array.isArray(compound.propertyTypes)
    ? compound.propertyTypes
    : Array.isArray(compound.properties)
      ? compound.properties
          .map((property: any) => property.propertyType)
          .filter(Boolean)
      : [];

  const uniquePropertyTypes = [...new Set(propertyTypes)];
  let propertyTypesDisplay = "";

  if (uniquePropertyTypes.length > 0) {
    const displayTypes = uniquePropertyTypes.slice(0, 3);
    propertyTypesDisplay = displayTypes.join(" | ");

    if (uniquePropertyTypes.length > 3) {
      propertyTypesDisplay += ` | +${uniquePropertyTypes.length - 3} More`;
    }
  }

  const compoundUrl = `/compounds/${compound.slug || compound.id}`;

  // Format delivery date
  const deliveryDate = compound.deliveryDate || "2025";

  return (
    <Card
      className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        {/* Image Section */}
        <div className="relative h-[220px] overflow-hidden">
          <Image
            src={bannerUrl || "/placeholder.svg"}
            alt={compound.name || "Compound"}
            fill
            className="object-cover transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {compound.isNewLaunch && (
              <Badge className="bg-[#E3A325] text-white font-medium px-2.5 py-1 rounded-md">
                <Sparkle className="h-3.5 w-3.5 mr-1" fill="currentColor" /> New
                Launch
              </Badge>
            )}
            {compound.isTrendingProject && (
              <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1 rounded-md">
                <TrendingUp className="h-3.5 w-3.5 mr-1" fill="currentColor" />{" "}
                Trending
              </Badge>
            )}
            {compound.isRecommended && (
              <Badge className="bg-[#05596B] text-white font-medium px-2.5 py-1 rounded-md">
                Recommended
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
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

          {/* Developer Logo */}
          <div className="absolute bottom-3 right-3">
            <Avatar className="border-2 border-white h-14 w-14 bg-white/90 shadow-md">
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

          {/* Title & Location */}
          <div className="absolute bottom-3 left-3 right-20">
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{areaName}</span>
            </div>
            <h3 className="font-bold text-xl text-white mt-1 line-clamp-1">
              {compound.name}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-5">
          {/* Developer & Property Types */}
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-xs border-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1"
            >
              By {developerName}
            </Badge>

            {hasNonOriginalPlan && (
              <Badge className="bg-[#E3A325]/20 text-[#E3A325] font-medium flex items-center gap-1">
                <Gift className="h-3.5 w-3.5" />
                Special Offer
              </Badge>
            )}
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {propertyTypesDisplay && (
              <div>
                <h4 className="text-xs text-gray-500 mb-1">Property Types</h4>
                <p className="text-sm font-medium text-[#013344]">
                  {propertyTypesDisplay}
                </p>
              </div>
            )}

            {Array.isArray(compound.properties) &&
              compound.properties.length > 0 && (
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">
                    Available Units
                  </h4>
                  <p className="text-sm font-medium text-[#013344]">
                    {compound.properties.length} Units
                  </p>
                </div>
              )}

            <div>
              <h4 className="text-xs text-gray-500 mb-1">Delivery</h4>
              <p className="text-sm font-medium text-[#013344]">
                {deliveryDate}
              </p>
            </div>
          </div>

          {/* Available Units (Expandable) */}
          {showMore &&
            Array.isArray(compound.properties) &&
            compound.properties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Separator className="my-4" />
                <h4 className="text-sm font-medium text-[#013344] mb-2">
                  Available Units
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {compound.properties
                    .slice(0, 5)
                    .map((property: any, index: number) => (
                      <Link
                        href={`/properties/${property.slug || property.id}`}
                        key={index}
                        className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-full bg-[#F7F8F8]">
                            <Home className="h-3.5 w-3.5 text-[#05596B]" />
                          </div>
                          <span className="font-medium">{property.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {property.startPrice && (
                            <span className="text-[#05596B] font-medium">
                              {property.startPrice.toLocaleString()} EGP
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  {compound.properties.length > 5 && (
                    <div className="text-center text-sm text-[#05596B] font-medium py-1">
                      +{compound.properties.length - 5} more units
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          <Separator className="my-4" />

          {/* Price Section */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Starting From</p>
              {compound.startPrice ? (
                <p className="font-bold text-[#05596B] text-xl">
                  {compound.startPrice.toLocaleString()} EGP
                </p>
              ) : (
                <p className="text-sm text-gray-500">Price on request</p>
              )}
              {compound.offer?.paymentPercentage && (
                <p className="text-xs text-[#E3A325] font-medium mt-1">
                  {compound.offer.paymentPercentage}% Down Payment
                </p>
              )}
            </div>

            {compound.monthlyPayment && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly</p>
                <p className="font-semibold text-[#013344]">
                  {compound.monthlyPayment.toLocaleString()} EGP
                </p>
              </div>
            )}
            {Array.isArray(compound.properties) &&
              compound.properties.length > 0 && (
                <Button
                  variant="outline"
                  className="border-[#CBBBAC] text-[#013344] hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMore(!showMore);
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {showMore ? "Hide" : "Units"}
                </Button>
              )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3 items-center justify-between">
            <Link
              href={compoundUrl}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#05596B] text-white rounded-lg hover:bg-[#05596B]/90 transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </Link>

            <div className="flex flex-col">
              <div className="flex gap-3">
                <CallButton
                  phoneNumber="+0201123960001"
                  className="rounded-lg bg-[#05596B]/10 text-[#05596B] hover:bg-[#05596B]/20 p-2.5"
                  variant="rounded"
                />
                <WhatsAppButton
                  phoneNumber="+0201123960001"
                  message={`Hi, I'm interested in ${compound.name} in ${areaName}`}
                  className="rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2.5"
                  variant="rounded"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
