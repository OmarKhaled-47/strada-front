/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GetHomeApi from "../api/HomeApi";
import { SearchProvider } from "../search/contexts/SearchContext";
import { HomeSearchFilter } from "./HomeSearchFilter";

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Extract the base URL without query parameters
  const baseUrl = src.split("?")[0];
  // Append the width and quality parameters
  return `${baseUrl}?w=${width}&q=${quality || 75}`;
};

export function HeroSection() {
  const [heroData, setHeroData] = useState<{
    heading: string;
    subHeading: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    getHeroSection_();
  }, []);

  const getHeroSection_ = () => {
    GetHomeApi.getHeroSection()
      .then((res: any) => {
        const heroBlock = res.data.data?.blocks.find(
          (block: any) => block.__component === "layout.hero-section"
        );

        if (heroBlock) {
          setHeroData({
            heading: heroBlock.heading,
            subHeading: heroBlock.subHeading,
            imageUrl: heroBlock?.image?.url, // Use the full-size image URL
          });
        }
      })
      .catch((error: any) => {
        console.error("Error fetching hero section data:", error);
      });
  };

  if (!heroData) {
    return (
      <div className="min-h-[600px] md:min-h-[800px] flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <SearchProvider>
      <section className="relative min-h-[700px] md:min-h-[850px] overflow-hidden">
        {heroData.imageUrl && (
          <Image
            loader={imageLoader}
            src={heroData.imageUrl || "/placeholder.svg"}
            alt="Luxury real estate"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#013344]/70 via-[#013344]/50 to-[#013344]/30" />

        <div className="container relative z-10 mx-auto px-4 pt-32 md:pt-48">
          <motion.div
            className="max-w-4xl mx-auto text-center text-black space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {heroData.heading}
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              {heroData.subHeading}
            </p>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <HomeSearchFilter />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SearchProvider>
  );
}
