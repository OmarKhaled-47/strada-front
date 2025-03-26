"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Paintbrush,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Property {
  id: number;
  name: string;
  slug: string;
  banner?: { url: string };
  startPrice?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareMeters?: number;
  finishing?: string;
  deliveryIn?: string;
  isRecommended?: boolean;
  isSoldout?: boolean;
}

interface Compound {
  name: string;
  slug: string;
  area?: {
    name?: string;
    slug?: string;
  };
  developer?: {
    name?: string;
    logo?: {
      url?: string;
    };
  };
}

interface PropertyCardSliderProps {
  properties: Property[];
  compound: Compound;
}

export function PropertyCardSlider({
  properties,
  compound,
}: PropertyCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Determine how many properties to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(1);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-8 text-[#05596B]/70">
        <p>No properties available for this compound.</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= properties.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, properties.length - visibleCount) : prev - 1
    );
  };

  const canGoNext = currentIndex + visibleCount < properties.length;
  const canGoPrev = currentIndex > 0;

  // Format price with commas
  const formatPrice = (price: number) => {
    if (!price) return "Prices To Be Announced";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = () => {
    if (!isSwiping || touchStartX === null) return;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping || touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const dragDistance = touchEndX - touchStartX;
    const dragThreshold = 50;

    if (dragDistance > dragThreshold && canGoPrev) {
      prevSlide();
    } else if (dragDistance < -dragThreshold && canGoNext) {
      nextSlide();
    }

    setIsSwiping(false);
    setTouchStartX(null);
  };

  return (
    <div className="space-y-6">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex-shrink-0 w-full"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="mx-2">
                <div className="overflow-hidden cursor-pointer border-0 shadow-md rounded-xl">
                  <div className="flex flex-col md:flex-row">
                    {/* Property Image */}
                    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full md:w-[45%] overflow-hidden">
                      {property.banner?.url ? (
                        <Image
                          src={property.banner.url || "/placeholder.svg"}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/20 to-[#05596B]/5 flex items-center justify-center">
                          <span className="text-[#05596B]">
                            No image available
                          </span>
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />

                      {/* Developer Logo */}
                      {compound.developer?.logo?.url && (
                        <div className="absolute top-3 left-3 z-10 size-10 sm:size-14 bg-white/90 p-1 sm:p-2 rounded-full border-2 border-white flex items-center justify-center">
                          <Image
                            src={
                              compound.developer.logo.url || "/placeholder.svg"
                            }
                            alt={compound.developer.name || "Developer"}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      )}

                      {/* Property Type Badge */}
                      {property.propertyType && (
                        <Badge className="absolute top-3 right-3 bg-white/90 text-[#013344] z-10 text-xs">
                          {property.propertyType}
                        </Badge>
                      )}

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="bg-white/90 text-[#013344] px-3 py-2 rounded-lg backdrop-blur-sm">
                          <p className="text-xs text-[#05596B]">
                            Starting Price
                          </p>
                          <p className="text-sm sm:text-lg font-bold text-[#013344]">
                            {property.startPrice
                              ? formatPrice(property.startPrice)
                              : "Prices To Be Announced"}
                          </p>
                        </div>
                      </div>

                      {/* Sold Out Badge */}
                      {property.isSoldout && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                          <Badge className="bg-red-500 text-white text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                            SOLD OUT
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 p-3 sm:p-5 relative">
                      <div className="space-y-3 sm:space-y-4">
                        {/* Property Name and Compound */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#013344] mb-1">
                            {property.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#05596B] flex items-center gap-1">
                            <span>{compound.name}</span>
                            <span className="text-[#05596B]/50">•</span>
                            <span>{compound.area?.name}</span>
                          </p>
                        </div>

                        {/* Property Specs */}
                        <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3">
                          {property.bedrooms && (
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#05596B]/10">
                                <Bed className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#05596B]" />
                              </div>
                              <span className="text-xs sm:text-sm text-[#05596B]">
                                {property.bedrooms}{" "}
                                {property.bedrooms === 1
                                  ? "Bedroom"
                                  : "Bedrooms"}
                              </span>
                            </div>
                          )}

                          {property.bathrooms && (
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#05596B]/10">
                                <Bath className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#05596B]" />
                              </div>
                              <span className="text-xs sm:text-sm text-[#05596B]">
                                {property.bathrooms}{" "}
                                {property.bathrooms === 1
                                  ? "Bathroom"
                                  : "Bathrooms"}
                              </span>
                            </div>
                          )}

                          {property.squareMeters && (
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#05596B]/10">
                                <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#05596B]" />
                              </div>
                              <span className="text-xs sm:text-sm text-[#05596B]">
                                {property.squareMeters} m²
                              </span>
                            </div>
                          )}

                          {property.deliveryIn && (
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#05596B]/10">
                                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#05596B]" />
                              </div>
                              <span className="text-xs sm:text-sm text-[#05596B]">
                                Delivery: {property.deliveryIn}
                              </span>
                            </div>
                          )}

                          {property.finishing && (
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-[#05596B]/10">
                                <Paintbrush className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#05596B]" />
                              </div>
                              <span className="text-xs sm:text-sm text-[#05596B]">
                                {property.finishing}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View Details Button */}
                        <Link
                          href={`/properties/${property.slug}`}
                          className="inline-flex w-full h-8 sm:h-10 items-center justify-center rounded-md bg-[#05596B] px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white shadow transition-colors hover:bg-[#05596B]/90"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={!canGoPrev}
          className={cn(
            "rounded-full border-[#05596B]/20 text-[#05596B]",
            !canGoPrev && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Previous property</span>
        </Button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {Array.from({
            length: Math.ceil(properties.length / visibleCount),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleCount)}
              className={`h-2 rounded-full transition-all ${
                index === Math.floor(currentIndex / visibleCount)
                  ? "w-6 bg-[#05596B]"
                  : "w-2 bg-[#05596B]/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={!canGoNext}
          className={cn(
            "rounded-full border-[#05596B]/20 text-[#05596B]",
            !canGoNext && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Next property</span>
        </Button>
      </div>
    </div>
  );
}
