"use client";

import { useState, useEffect } from "react";
import {
  Search,
  type LucideIcon,
  Flower2,
  Home,
  Bike,
  Accessibility,
  Timer,
  PocketIcon as Pool,
  Landmark,
  Dumbbell,
  Building2,
  Store,
  Heart,
  GraduationCap,
  ParkingCircle,
  Hotel,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AmenitiesListProps {
  amenities: string[];
}

interface AmenityItemProps {
  icon: LucideIcon;
  name: string;
  description: string;
  index: number;
}

// Enhanced amenity mapping with descriptions
const amenityDetails: Record<
  string,
  { icon: LucideIcon; description: string }
> = {
  Garden: {
    icon: Flower2,
    description: "Beautiful landscaped gardens",
  },
  "Has roof": {
    icon: Home,
    description: "Rooftop facilities available",
  },
  "bicycles lanes": {
    icon: Bike,
    description: "Dedicated cycling paths",
  },
  "Disability support": {
    icon: Accessibility,
    description: "Accessible facilities",
  },
  "Jogging trail": {
    icon: Timer,
    description: "Dedicated running tracks",
  },
  "Outdoor pools": {
    icon: Pool,
    description: "Swimming pools",
  },
  Mosque: {
    icon: Landmark,
    description: "Prayer facilities",
  },
  "Sports Clubs": {
    icon: Dumbbell,
    description: "Sports and fitness facilities",
  },
  "Business Hub": {
    icon: Building2,
    description: "Business center and facilities",
  },
  "Commercial strip": {
    icon: Store,
    description: "Shopping and retail area",
  },
  "Medical center": {
    icon: Heart,
    description: "Healthcare facilities",
  },
  Schools: {
    icon: GraduationCap,
    description: "Educational institutions",
  },
  "Underground parking": {
    icon: ParkingCircle,
    description: "Secure parking facilities",
  },
  Clubhouse: {
    icon: Hotel,
    description: "Community gathering space",
  },
};

function AmenityItem({
  icon: Icon,
  name,
  description,
  index,
}: AmenityItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
    >
      <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-[#05596B]/10 mt-2">
            <Icon className="h-5 w-5 text-[#05596B]" />
          </div>
          <div>
            <h3 className="font-medium text-[#013344] group-hover:text-[#05596B] transition-colors duration-300 text-sm">
              {name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Available
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState(amenities);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAmenities(amenities);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = amenities.filter((amenity) =>
        amenity.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAmenities(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, amenities]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto mb-6">
        <Input
          type="text"
          placeholder="Search amenities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-10 rounded-full border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isSearching ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#05596B]"></div>
        </div>
      ) : (
        <>
          {/* Mobile Slider View */}
          {isMobile && (
            <ScrollArea className="w-full pb-4">
              <div className="flex gap-3 pb-4">
                <AnimatePresence>
                  {filteredAmenities.map((amenity, index) => {
                    const details = amenityDetails[amenity] || {
                      icon: Building2,
                      description: "Facility available",
                    };

                    return (
                      <div
                        key={amenity}
                        className="min-w-[150px] max-w-[200px]"
                      >
                        <AmenityItem
                          icon={details.icon}
                          name={amenity}
                          description={details.description}
                          index={index}
                        />
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

          {/* Desktop Grid View */}
          {!isMobile && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <AnimatePresence>
                {filteredAmenities.map((amenity, index) => {
                  const details = amenityDetails[amenity] || {
                    icon: Building2,
                    description: "Facility available",
                  };

                  return (
                    <AmenityItem
                      key={amenity}
                      icon={details.icon}
                      name={amenity}
                      description={details.description}
                      index={index}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

      {!isSearching && filteredAmenities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500">
            No amenities found matching &quot;{searchQuery}&quot;
          </p>
        </motion.div>
      )}
    </div>
  );
}
