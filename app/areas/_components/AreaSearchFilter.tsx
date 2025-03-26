/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight, MapPin } from "lucide-react";
import { SearchArea } from "./search-area";

interface AreaSearchFilterProps {
  areas: any[];
  onFilterChange: (filteredAreas: any[]) => void;
}

export function AreaSearchFilter({
  areas,
  onFilterChange,
}: AreaSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"popular" | "az" | "compounds">(
    "popular"
  );

  // Filter areas based on search query
  const filterAreas = (query: string) => {
    if (!query.trim()) {
      onFilterChange(areas);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = areas.filter(
      (area) =>
        area.name.toLowerCase().includes(lowercaseQuery) ||
        (area.description &&
          area.description.toLowerCase().includes(lowercaseQuery))
    );

    onFilterChange(filtered);
  };

  // Sort areas
  const sortAreas = (option: "popular" | "az" | "compounds") => {
    setSortOption(option);

    let sorted = [...areas];

    if (searchQuery) {
      // If there's a search query, filter first
      const lowercaseQuery = searchQuery.toLowerCase();
      sorted = sorted.filter(
        (area) =>
          area.name.toLowerCase().includes(lowercaseQuery) ||
          (area.description &&
            area.description.toLowerCase().includes(lowercaseQuery))
      );
    }

    switch (option) {
      case "az":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "compounds":
        sorted.sort((a, b) => b.compounds.count - a.compounds.count);
        break;
      case "popular":
      default:
        // Assuming the original order is by popularity
        if (!searchQuery) {
          sorted = [...areas];
        }
        break;
    }

    onFilterChange(sorted);
  };

  // Handle search
  const handleSearch = (query: string) => {
    filterAreas(query);
  };

  // Update filtered areas when sort option changes
  useEffect(() => {
    sortAreas(sortOption);
  }, [sortOption, searchQuery]);

  return (
    <div className="space-y-6">
      <SearchArea
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        areas={areas}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#013344] mb-2 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#05596B]" />
            {searchQuery ? "Search Results" : "All Destinations"}
          </h2>
          <p className="text-[#05596B]">
            {searchQuery ? (
              <>
                <span className="font-medium">
                  {
                    areas.filter(
                      (area) =>
                        area.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (area.description &&
                          area.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                    ).length
                  }
                </span>{" "}
                Results Found for{" "}
                <span className="font-medium">{searchQuery}</span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    onFilterChange(areas);
                  }}
                  className="ml-2 text-[#05596B] hover:text-[#013344] underline"
                >
                  Clear
                </button>
              </>
            ) : (
              <>{areas.length} Premium Locations Available</>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#05596B] text-[#05596B]">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex">
            <Button
              variant="outline"
              className={`border-[#05596B] ${
                sortOption === "popular"
                  ? "bg-[#05596B] text-white"
                  : "text-[#05596B]"
              }`}
              onClick={() => sortAreas("popular")}
            >
              Popular
            </Button>
            <Button
              variant="outline"
              className={`border-[#05596B] border-l-0 ${
                sortOption === "az"
                  ? "bg-[#05596B] text-white"
                  : "text-[#05596B]"
              }`}
              onClick={() => sortAreas("az")}
            >
              A-Z
            </Button>
            <Button
              variant="outline"
              className={`border-[#05596B] border-l-0 ${
                sortOption === "compounds"
                  ? "bg-[#05596B] text-white"
                  : "text-[#05596B]"
              }`}
              onClick={() => sortAreas("compounds")}
            >
              Compounds <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
