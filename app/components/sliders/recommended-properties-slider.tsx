/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyCard } from "../cards/property-card";
import { BaseSlider } from "../sliders/base-slider";
import GetHomeApi from "@/app/api/HomeApi";

interface RecommendedPropertiesSliderProps {
  properties?: Array<any>;
  className?: string;
}

export function RecommendedPropertiesSlider({
  className,
}: RecommendedPropertiesSliderProps) {
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await GetHomeApi.getPropertyHome();
        setPropertyData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching recommended properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleCardClick = (slug: string) => {
    router.push(`/properties/${slug}`);
  };

  return (
    <BaseSlider
      title="Recommended Properties"
      description="Discover our handpicked selection of premium properties across Egypt"
      viewAllLink="/properties"
      viewAllText="View All Properties"
      loading={loading}
      totalItems={propertyData.length}
      className={className}
      breakpoints={{ sm: 1, md: 2, lg: 3 }}
      autoSlide={true}
    >
      {propertyData.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={() => handleCardClick(property.slug)}
        />
      ))}
    </BaseSlider>
  );
}
