/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewLaunchCard } from "../cards/new-launch-card";
import { BaseSlider } from "../sliders/base-slider";
import GetHomeApi from "@/app/api/HomeApi";

interface NewLaunchesSliderProps {
  launches?: Array<any>;
  className?: string;
}

export function NewLaunchesSlider({ className }: NewLaunchesSliderProps) {
  const [loading, setLoading] = useState(true);
  const [newLaunches, setNewLaunches] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchNewLaunches = async () => {
      try {
        const response = await GetHomeApi.getNewLaunchesSection();
        setNewLaunches(response.data.data || []);
      } catch (error) {
        console.error("Error fetching new launches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewLaunches();
  }, []);
  const handleCardClick = (slug: string) => {
    router.push(`/compounds/${slug}`);
  };

  return (
    <BaseSlider
      title="New Launches"
      description="Discover the latest property launches across Egypt"
      viewAllLink="/new-launches"
      viewAllText="View All Launches"
      loading={loading}
      totalItems={newLaunches.length}
      className={className}
      breakpoints={{ sm: 1, md: 1, lg: 1 }}
      autoSlide={true}
      autoSlideInterval={7000}
    >
      {newLaunches.map((launch) => (
        <NewLaunchCard
          key={launch.id}
          compound={launch}
          onClick={() => handleCardClick(launch.slug)}
        />
      ))}
    </BaseSlider>
  );
}
