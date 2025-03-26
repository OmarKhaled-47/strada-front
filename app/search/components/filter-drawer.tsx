"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FilterSidebar } from "./filter-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/app/search/contexts/SearchContext";

export function FilterDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useSearch();

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;

    // Count array filters
    if (filters.areas?.length) count += filters.areas.length;
    if (filters.developers?.length) count += filters.developers.length;
    if (filters.propertyTypes?.length) count += filters.propertyTypes.length;
    if (filters.bedrooms?.length) count += filters.bedrooms.length;
    if (filters.bathrooms?.length) count += filters.bathrooms.length;
    if (filters.finishing?.length) count += filters.finishing.length;

    // Count price range
    if (filters.minPrice || filters.maxPrice) count += 1;

    // Count area range
    if (filters.minArea || filters.maxArea) count += 1;

    // Count boolean filters
    if (filters.isNewLaunch) count += 1;
    if (filters.isTrendingProject) count += 1;
    if (filters.hasOffers) count += 1;
    if (filters.isSoldout) count += 1;
    if (filters.isReadyToMove) count += 1;
    if (filters.isRecommended) count += 1;

    return count;
  };

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-[#CBBBAC] hover:bg-[#F0F7FA] hover:border-[#05596B] transition-colors relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-[#05596B] hover:bg-[#05596B] absolute -top-2 -right-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
            <div className="h-full overflow-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#013344]">
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 bg-[#05596B]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </h2>
              </div>
              <div className="p-4">
                <FilterSidebar onFilterApplied={() => setIsOpen(false)} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block w-72 bg-white rounded-lg shadow-sm p-6 h-fit">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#013344]">
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-[#05596B]">{activeFilterCount}</Badge>
            )}
          </h2>
        </div>
        <FilterSidebar />
      </div>
    </>
  );
}
