"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, SwitchCamera } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearch } from "@/app/search/contexts/SearchContext";
import { EnhancedSearchBar } from "./enhanced-search-bar";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SearchHeaderProps {
  viewMode: "compounds" | "properties";
  onViewModeChange: (mode: "compounds" | "properties") => void;
}

export function SearchHeader({
  viewMode,
  onViewModeChange,
}: SearchHeaderProps) {
  const { filters, updateFilters } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
    >
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 ">
            <div className="relative flex-1">
              <EnhancedSearchBar />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-[#CBBBAC] text-[#013344] hover:bg-[#F0F7FA] hover:border-[#05596B] transition-colors flex-1 md:flex-none"
                onClick={() =>
                  onViewModeChange(
                    viewMode === "properties" ? "compounds" : "properties"
                  )
                }
              >
                <SwitchCamera className="mr-2 h-4 w-4" />
                {isMobile ? (
                  viewMode === "properties" ? (
                    "Compounds"
                  ) : (
                    "Properties"
                  )
                ) : (
                  <>
                    Switch to{" "}
                    {viewMode === "properties" ? "Compounds" : "Properties"}
                  </>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#CBBBAC] whitespace-nowrap hover:bg-[#F0F7FA] hover:border-[#05596B] transition-colors flex-1 md:flex-none"
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    {isMobile ? (
                      "Sort"
                    ) : (
                      <>
                        Sort By:{" "}
                        {filters.sort === "price-asc"
                          ? "Price: Low to High"
                          : filters.sort === "price-desc"
                            ? "Price: High to Low"
                            : filters.sort === "oldest"
                              ? "Oldest"
                              : "Newest"}
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => updateFilters({ sort: "price-asc" })}
                    className="cursor-pointer"
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateFilters({ sort: "price-desc" })}
                    className="cursor-pointer"
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateFilters({ sort: "newest" })}
                    className="cursor-pointer"
                  >
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateFilters({ sort: "oldest" })}
                    className="cursor-pointer"
                  >
                    Oldest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
