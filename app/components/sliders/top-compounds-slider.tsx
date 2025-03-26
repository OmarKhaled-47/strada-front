/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CompoundCard } from "../cards/compound-card";
import { BaseSlider } from "../sliders/base-slider";
import GetHomeApi from "@/app/api/HomeApi";

interface TopCompoundsSliderProps {
  compounds?: Array<any>;
  className?: string;
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A slider component that displays a list of top compounds.
 *
 * @param {Array<any>} [compounds=[]] - Optional array of compounds to display.
 * @param {string} [className] - Optional class name for the component.
 * @returns A JSX element representing the slider component.
 */
/******  202b67ea-6387-46ea-8a18-b6834f54c0d1  *******/ export function TopCompoundsSlider({
  className,
}: TopCompoundsSliderProps) {
  const [loading, setLoading] = useState(true);
  const [compoundData, setCompoundData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompounds = async () => {
      try {
        const response = await GetHomeApi.getCompoundHome();
        setCompoundData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching top compounds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompounds();
  }, []);
  return (
    <BaseSlider
      title="Top Compounds"
      description="Explore our selection of premium compounds from trusted developers"
      viewAllLink="/search"
      viewAllText="View All Compounds"
      loading={loading}
      totalItems={compoundData.length}
      className={className}
      breakpoints={{ sm: 1, md: 2, lg: 3 }}
      autoSlide={true}
    >
      {compoundData.map((compound) => (
        <CompoundCard key={compound.id} compound={compound} />
      ))}
    </BaseSlider>
  );
}
