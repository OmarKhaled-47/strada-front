/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { AreaCard } from "../cards/area-card";
import { BaseSlider } from "../sliders/base-slider";
import GetHomeApi from "@/app/api/HomeApi";

interface TopAreasSliderProps {
  areas?: Array<any>;
  className?: string;
}

export function TopAreasSlider({ className }: TopAreasSliderProps) {
  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await GetHomeApi.getAreaHome();
        setAreaData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching top areas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <BaseSlider
      title="Top Areas"
      description="Explore Egypt's most desirable neighborhoods and find your perfect location"
      viewAllLink="/areas"
      viewAllText="View All Areas"
      loading={loading}
      totalItems={areaData.length}
      className={className}
      breakpoints={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      autoSlide={true}
    >
      {areaData.map((area) => (
        <AreaCard key={area.id} area={area} />
      ))}
    </BaseSlider>
  );
}
