"use client";

import { useState, useEffect } from "react";
import { SearchHeader } from "./components/search-header";
import { SearchResults } from "./components/search-results";
import { SearchProvider } from "@/app/search/contexts/SearchContext";
import { FilterDrawer } from "./components/filter-drawer";
import { ErrorBoundary } from "./components/error-boundary";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"compounds" | "properties">(
    "compounds"
  );

  // Get the view mode from URL on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");

      if (typeParam === "properties") {
        setViewMode("properties");
      } else if (typeParam === "compounds") {
        setViewMode("compounds");
      }
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SearchProvider>
        <div className="min-h-screen bg-card">
          <section className="relative h-[400px] bg-dark text-white">
            <Image
              src="/search-header.png"
              alt="Find Your Dream Property"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            <motion.div
              className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Dream{" "}
                {viewMode === "compounds" ? "Compound" : "Property"}
              </h1>
              <p className="text-xl">
                Explore luxury{" "}
                {viewMode === "compounds" ? "compounds" : "properties"} that
                suit your every need
              </p>
            </motion.div>
          </section>

          <div className="sticky top-20 z-30 ">
            <SearchHeader viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <FilterDrawer />
              <div className="flex-1">
                <SearchResults viewMode={viewMode} />
              </div>
            </div>
          </div>
        </div>
      </SearchProvider>
    </ErrorBoundary>
  );
}
