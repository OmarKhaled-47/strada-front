"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  deliveryIn?: string;
  finishing?: string;
  compound?: {
    name?: string;
    slug?: string;
    area?: {
      name?: string;
    };
  };
  isRecommended?: boolean;
  isSoldout?: boolean;
}

interface SuggestedPropertiesProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
}

export function SuggestedProperties({
  properties,
  title = "Similar Properties",
  subtitle = "You might also be interested in these properties",
}: SuggestedPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [, setHoveredIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [, setIsMobile] = useState(false);

  // Determine how many properties to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setIsMobile(false);
      } else {
        setVisibleCount(2);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!properties || properties.length === 0) {
    return null;
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index * visibleCount);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#013344] tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-[#05596B]/80">{subtitle}</p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={cn(
                "rounded-full border-[#05596B]/20 text-[#05596B] hover:bg-[#05596B]/10 hover:text-[#05596B] transition-all duration-300",
                !canGoPrev && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={!canGoNext}
              className={cn(
                "rounded-full border-[#05596B]/20 text-[#05596B] hover:bg-[#05596B]/10 hover:text-[#05596B] transition-all duration-300",
                !canGoNext && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={sliderRef}
            className="flex"
            initial={false}
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visibleCount}%` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block h-full"
                >
                  <motion.div
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg h-full flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={
                          property.banner?.url ||
                          "/placeholder.svg?height=400&width=600" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {property.isRecommended && (
                          <Badge className="bg-orange-500 text-white border-none font-medium">
                            Recommended
                          </Badge>
                        )}
                        {property.isSoldout && (
                          <Badge className="bg-red-500 text-white border-none font-medium">
                            Sold Out
                          </Badge>
                        )}
                      </div>

                      {/* Delivery Date Badge */}
                      {property.deliveryIn && (
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-[#05596B] flex items-center gap-1.5 shadow-sm">
                          <Calendar className="h-3 w-3" />
                          <span>Delivery: {property.deliveryIn}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-auto">
                        <h3 className="font-bold text-[#013344] line-clamp-1 group-hover:text-[#05596B] transition-colors">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-[#05596B] mt-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {property.compound?.area?.name ||
                              "Location not specified"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          {property.startPrice ? (
                            <p className="font-bold text-[#013344]">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "EGP",
                                maximumFractionDigits: 0,
                              }).format(property.startPrice)}
                            </p>
                          ) : (
                            <p className="text-sm text-[#013344]">
                              Price on request
                            </p>
                          )}
                        </div>
                        <Badge className="bg-[#05596B] hover:bg-[#05596B]/90 text-white text-xs border-none">
                          {property.propertyType || "Property"}
                        </Badge>
                      </div>

                      {/* Property Features */}
                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-[#05596B] border-t border-[#05596B]/10 pt-4">
                        {property.bedrooms && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 justify-center bg-[#F7F8F8] rounded-md py-1.5 px-2 hover:bg-[#05596B]/5 transition-colors">
                                <Bed className="h-3 w-3 flex-shrink-0" />
                                <span>{property.bedrooms}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {property.bedrooms} Bedroom
                                {property.bedrooms !== 1 ? "s" : ""}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {property.bathrooms && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 justify-center bg-[#F7F8F8] rounded-md py-1.5 px-2 hover:bg-[#05596B]/5 transition-colors">
                                <Bath className="h-3 w-3 flex-shrink-0" />
                                <span>{property.bathrooms}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {property.bathrooms} Bathroom
                                {property.bathrooms !== 1 ? "s" : ""}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {property.squareMeters && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 justify-center bg-[#F7F8F8] rounded-md py-1.5 px-2 hover:bg-[#05596B]/5 transition-colors">
                                <Maximize2 className="h-3 w-3 flex-shrink-0" />
                                <span>{property.squareMeters}m²</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{property.squareMeters} square meters</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      {/* Finishing Type */}
                      {property.finishing && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#05596B]">
                          <Tag className="h-3 w-3 flex-shrink-0" />
                          <span>
                            Finishing:{" "}
                            <span className="font-medium">
                              {property.finishing}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({
            length: Math.ceil(properties.length / visibleCount),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full ${
                index === Math.floor(currentIndex / visibleCount)
                  ? "w-8 bg-[#05596B]"
                  : "w-2 bg-[#05596B]/30 hover:bg-[#05596B]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
