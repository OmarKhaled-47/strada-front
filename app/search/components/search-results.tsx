"use client";

import { useSearch } from "@/app/search/contexts/SearchContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CompoundCards } from "./compound-card";
import { PropertyCards } from "./property-card";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SearchResultsProps {
  viewMode: "compounds" | "properties";
}

export function SearchResults({ viewMode }: SearchResultsProps) {
  const {
    entityType,
    filters,
    results,
    loading,
    error,
    totalResults,
    totalPages,
    updateFilters,
    resetFilters,
    setEntityType,
  } = useSearch();

  const [errorState, setErrorState] = useState<string | null>(error);
  const isMobile = useMediaQuery("(max-width: 640px)");
  // const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  // Set entity type based on view mode
  useEffect(() => {
    if (viewMode === "compounds" && entityType !== "compounds") {
      setEntityType("compounds");
    } else if (viewMode === "properties" && entityType !== "properties") {
      setEntityType("properties");
    }
  }, [viewMode, entityType, setEntityType]);

  // Update error state when error changes
  useEffect(() => {
    setErrorState(error);
  }, [error]);

  // Loading state
  if (loading && filters.page === 1) {
    return (
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Loading results...
          </h1>
        </div>

        {viewMode === "properties" && (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: isMobile ? 3 : 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <Skeleton className="h-40 sm:h-52 w-full" />
                <div className="p-4 sm:p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 sm:h-6 w-3/4" />
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                    <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                  </div>
                  <Skeleton className="h-5 sm:h-6 w-1/3" />
                  <Skeleton className="h-8 sm:h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "compounds" && (
          <div className="space-y-4 sm:space-y-6">
            {Array.from({ length: isMobile ? 2 : 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="h-48 sm:h-64 md:w-[40%]" />
                  <div className="p-4 sm:p-5 flex-1 space-y-3 sm:space-y-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-5 sm:h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                      <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-6 sm:h-8 w-20 sm:w-24" />
                      <Skeleton className="h-6 sm:h-8 w-20 sm:w-24" />
                    </div>
                    <Skeleton className="h-8 sm:h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (errorState) {
    return (
      <div className="flex-1 py-8 sm:py-10 text-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md mx-auto">
          <h3 className="text-lg font-medium text-[#013344] mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">{errorState}</p>
          <Button
            onClick={() => {
              setErrorState(null);
              updateFilters({ page: 1 });
            }}
            className="bg-[#05596B] hover:bg-[#05596B]/90 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (results.length === 0) {
    return (
      <div className="flex-1 py-8 sm:py-10 text-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md mx-auto">
          <h3 className="text-lg font-medium text-[#013344] mb-2">
            No results found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search query.
          </p>
          <Button
            onClick={resetFilters}
            className="bg-[#05596B] hover:bg-[#05596B]/90 text-white"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
      <div className="space-y-4 sm:space-y-6 pr-2 sm:pr-4">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#013344]">
            {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
            <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {/* Properties Results */}
          {viewMode === "properties" && (
            <motion.div
              key="properties"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {results.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCards property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Compounds Results */}
          {viewMode === "compounds" && (
            <motion.div
              key="compounds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {results.map((compound) => (
                <motion.div
                  key={compound.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompoundCards compound={compound} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-6 pb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                disabled={filters.page === 1}
                onClick={() =>
                  updateFilters({ page: Math.max(1, (filters.page || 1) - 1) })
                }
                className="border-[#CBBBAC]"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show first page, last page, current page, and pages around current
                const shouldShow =
                  p === 1 ||
                  p === totalPages ||
                  (p >= (filters.page || 1) - 1 &&
                    p <= (filters.page || 1) + 1);

                // Show ellipsis for gaps
                if (!shouldShow) {
                  // Only show ellipsis at the start of a gap
                  if (p === 2 || p === totalPages - 1) {
                    return (
                      <span
                        key={`ellipsis-${p}`}
                        className="px-2 text-[#05596B] flex items-center"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Button
                    key={p}
                    variant={p === filters.page ? "default" : "outline"}
                    onClick={() => updateFilters({ page: p })}
                    className={
                      p === filters.page
                        ? "bg-[#05596B] hover:bg-[#05596B]/90 text-white"
                        : "border-[#CBBBAC]"
                    }
                  >
                    {p}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                disabled={filters.page === totalPages}
                onClick={() =>
                  updateFilters({
                    page: Math.min(totalPages, (filters.page || 1) + 1),
                  })
                }
                className="border-[#CBBBAC]"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
