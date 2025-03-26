/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Gift,
  Copy,
  Info,
  Building2,
  Home,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  Sparkle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GetCompoundApi from "@/app/api/CompoundApi";
import { Button } from "@/components/ui/button";
import { CallButton } from "@/components/CallButton";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "@/app/_components/favorite-button";
import { toast } from "@/hooks/use-toast";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "@/app/api/axiosClient";

interface CompoundCardProps {
  compound: any;
  showActions?: boolean;
  className?: string;
  compact?: boolean;
}

export function CompoundCards({
  compound,
  showActions = true,
  className,
  compact = false,
}: CompoundCardProps) {
  const [developerLogo, setDeveloperLogo] = useState<string | null>(null);
  const [developerName, setDeveloperName] =
    useState<string>("Unknown Developer");
  const [, setIsHovered] = useState(false);
  const [showUnits, setShowUnits] = useState(false);
  const [, setOfferBlocks] = useState<any[]>([]);
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
          setOfferBlocks(compoundData.offer.blocks);

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

  const uniquePropertyTypes = [...new Set(propertyTypes)].slice(0, 3);
  const hasMoreTypes = propertyTypes.length > 3;

  // Calculate completion percentage (example logic)
  const completionPercentage =
    compound.completionPercentage || Math.floor(Math.random() * 100);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Create a URL with the compound slug
    const url = `${window.location.origin}/compounds/${compound.slug || compound.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Compound link copied to clipboard",
      duration: 3000,
    });
  };

  // Compact card layout for favorites page
  if (compact) {
    return (
      <Card
        className={cn(
          "overflow-hidden border-none shadow-md hover:shadow-lg  group bg-white rounded-xl",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative h-48 sm:w-[40%] sm:h-auto overflow-hidden">
            <Image
              src={bannerUrl || "/placeholder.svg"}
              alt={compound.name || "Compound"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:bg-gradient-to-r" />

            {/* Status Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {compound.isNewLaunch && (
                <Badge className="bg-[#E3A325] text-white font-medium px-2.5 py-1 rounded-md">
                  <Sparkle className="h-3.5 w-3.5 mr-1" fill="currentColor" />
                  New Launch
                </Badge>
              )}
              {compound.isTrendingProject && (
                <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1 rounded-md">
                  <TrendingUp
                    className="h-3.5 w-3.5 mr-1"
                    fill="currentColor"
                  />{" "}
                  Trending
                </Badge>
              )}
            </div>

            {/* Developer Logo */}
            <div className="absolute bottom-3 right-3">
              <Avatar className="border-2 border-white h-10 w-10 bg-white/90 shadow-md">
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

            {/* Mobile Title */}
            <div className="absolute bottom-3 left-3 right-16 sm:hidden">
              <div className="flex items-center gap-1.5 text-white/90">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">{areaName}</span>
              </div>
              <h3 className="font-bold text-lg text-white mt-1 line-clamp-1">
                {compound.name}
              </h3>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="p-4 sm:p-5 flex-1 flex flex-col">
            {/* Location & Title */}
            <div className="hidden sm:flex items-center gap-1.5 text-gray-500 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm">{areaName}</span>
            </div>

            <h3 className="hidden sm:block font-bold text-lg text-[#013344] mb-2">
              {compound.name}
            </h3>

            {/* Developer & Offer */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className="text-xs border-[#CBBBAC] text-[#013344] font-medium px-2 py-0.5"
              >
                By {developerName}
              </Badge>

              {/* Offer Badge */}
              {hasNonOriginalPlan && (
                <Badge className="bg-[#E3A325]/10 text-[#E3A325] font-medium">
                  <Gift className="h-3.5 w-3.5 mr-1" />
                  {compound.offer?.paymentType || "Special"} Offer
                </Badge>
              )}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Property Types */}
              {uniquePropertyTypes.length > 0 && (
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Property Types</h4>
                  <div className="flex flex-wrap gap-1">
                    {uniquePropertyTypes.map((type, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#F7F8F8] text-[#013344] text-xs"
                      >
                        {String(type)}
                      </Badge>
                    ))}
                    {hasMoreTypes && (
                      <Badge
                        variant="secondary"
                        className="bg-[#F7F8F8] text-[#05596B] text-xs"
                      >
                        +{propertyTypes.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Completion */}
              <div>
                <h4 className="text-xs text-gray-500 mb-1">Completion</h4>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#05596B]"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-[#013344]">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Available Units (Expandable) */}
            <AnimatePresence>
              {showUnits &&
                Array.isArray(compound.properties) &&
                compound.properties.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-3"
                  >
                    <Separator className="my-3" />
                    <h4 className="text-sm font-medium text-[#013344] mb-2">
                      Available Units
                    </h4>
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-2">
                      {compound.properties
                        .slice(0, 3)
                        .map((property: any, index: number) => (
                          <Link
                            href={`/properties/${property.slug || property.id}`}
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 text-xs sm:text-sm transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-1.5">
                              <Home className="h-3 w-3 text-[#05596B]" />
                              <span className="font-medium line-clamp-1">
                                {property.name}
                              </span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          </Link>
                        ))}
                      {compound.properties.length > 3 && (
                        <div className="text-center text-xs text-[#05596B] font-medium">
                          +{compound.properties.length - 3} more units
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Price */}
            <div className="mt-auto">
              {compound.startPrice ? (
                <p className="font-bold text-[#05596B] text-lg">
                  {compound.startPrice.toLocaleString()} EGP
                </p>
              ) : (
                <p className="text-sm text-gray-500">Price on request</p>
              )}
              {compound.offer?.paymentPercentage && (
                <p className="text-xs text-[#E3A325] font-medium">
                  {compound.offer.paymentPercentage}% Down Payment
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 border-[#05596B] text-[#05596B] hover:bg-[#05596B]/10"
              >
                <Link href={`/compounds/${compound.slug || compound.id}`}>
                  <Info className="h-3.5 w-3.5 mr-1" />
                  Details
                </Link>
              </Button>

              {Array.isArray(compound.properties) &&
                compound.properties.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#CBBBAC] text-[#013344]"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowUnits(!showUnits);
                    }}
                  >
                    <Building2 className="h-3.5 w-3.5 mr-1" />
                    {showUnits ? "Hide Units" : "Show Units"}
                  </Button>
                )}

              <div className="flex gap-2 w-full mt-2">
                <CallButton
                  phoneNumber="123456789"
                  className="flex-1"
                  variant="rounded"
                />
                <WhatsAppButton
                  phoneNumber="123456789"
                  className="flex-1"
                  message={`Hi, I'm interested in ${compound.name} in ${areaName}`}
                  variant="rounded"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Standard card layout
  return (
    <Card
      className={cn(
        "overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group bg-white rounded-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative h-48 sm:h-auto sm:w-[280px] md:w-[320px] overflow-hidden">
          <Image
            src={bannerUrl || "/placeholder.svg"}
            alt={compound.name}
            fill
            className="object-cover transition-transform duration-700"
          />

          {/* Action Buttons */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleCopyUrl}
            >
              <Copy className="h-4 w-4 text-gray-600" />
            </Button>

            <div className="h-8 w-8">
              <FavoriteButton
                id={compound.id}
                slug={compound.slug}
                type="compound"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 relative">
          {/* Developer Logo */}
          <div className="absolute top-4 right-4">
            <Avatar className="h-10 w-10 border border-gray-100 bg-white shadow-sm">
              {developerLogo ? (
                <AvatarImage
                  src={developerLogo}
                  className="object-contain p-1"
                />
              ) : (
                <AvatarFallback className="bg-[#05596B] text-white">
                  {developerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[#05596B] mb-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{areaName}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl text-[#013344] mb-3">
            {compound.name}
          </h3>

          {/* Property Types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {uniquePropertyTypes.slice(0, 3).map((type, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white text-[#013344] border-[#CBBBAC] font-normal"
              >
                {String(type)}
              </Badge>
            ))}
            {hasMoreTypes && (
              <Badge
                variant="outline"
                className="bg-white text-[#05596B] border-[#CBBBAC]"
              >
                +{propertyTypes.length - 3} More
              </Badge>
            )}
          </div>

          {/* Offer & Trending Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hasNonOriginalPlan && (
              <Badge className="bg-[#E3A325]/10 text-[#E3A325] font-medium border border-[#E3A325]/20">
                <Gift className="h-3.5 w-3.5 mr-1" />
                Offer Included
              </Badge>
            )}
            {compound.isTrendingProject && (
              <Badge className="bg-[#028180]/10 text-[#028180] font-medium border border-[#028180]/20">
                <TrendingUp className="h-3.5 w-3.5 mr-1" fill="currentColor" />
                Trending Now
              </Badge>
            )}
            {compound.isNewLaunch && (
              <Badge className="bg-[#E3A325]/10 text-[#E3A325] font-medium border border-[#E3A325]/20 ">
                <Sparkle className="h-3.5 w-3.5 mr-1" fill="currentColor" />
                New Launch
              </Badge>
            )}
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <p className="text-sm text-gray-500">Developer Start Price</p>
            <div className="flex items-baseline">
              <span className="text-sm text-gray-500 mr-1">EGP</span>
              <p className="text-xl font-bold text-[#05596B]">
                {compound.startPrice?.toLocaleString() || "Price on request"}
              </p>
            </div>
          </div>

          {/* WhatsApp Button */}
          {/* Actions */}
          {showActions && (
            <div className="flex flex-row justify-end items-center gap-3">
              <Button
                asChild
                className="w-auto bg-[#05596B] hover:bg-[#05596B]/90 text-white font-medium"
              >
                <Link href={`/compounds/${compound.slug || compound.id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View More
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <CallButton phoneNumber="123456789" variant="rounded" />
                <WhatsAppButton
                  phoneNumber="123456789"
                  message={`Hi, I'm interested in ${compound.name} in ${areaName}`}
                  variant="rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
