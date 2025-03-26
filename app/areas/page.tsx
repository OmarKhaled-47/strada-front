/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import AreaCard from "./_components/AreaCard";
import { useState, useEffect } from "react";
import { MapPin, Search, Building, ChevronRight, X } from "lucide-react";
import GetAreaApi from "../api/AreaApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/debounce";

export default function AreasPage() {
  const [areas, setAreas] = useState<any[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"popular" | "az" | "compounds">(
    "popular"
  );

  // Fetch areas on component mount
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const response = await GetAreaApi.getAreaCard();
        const areasData = response.data.data;
        setAreas(areasData);
        setFilteredAreas(areasData);
      } catch (error) {
        console.error("Failed to fetch areas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  // Filter areas based on search query
  const filterAreas = (query: string) => {
    if (!query.trim()) {
      setFilteredAreas(areas);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = areas.filter(
      (area) =>
        area.name.toLowerCase().includes(lowercaseQuery) ||
        (area.description &&
          area.description.toLowerCase().includes(lowercaseQuery))
    );

    setFilteredAreas(filtered);
  };

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    filterAreas(value);
  }, 300);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredAreas(areas);
  };

  // Sort areas
  const sortAreas = (option: "popular" | "az" | "compounds") => {
    setSortOption(option);

    let sorted = [...filteredAreas];

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
        sorted = searchQuery ? [...filteredAreas] : [...areas];
        break;
    }

    setFilteredAreas(sorted);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F8F8] to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#013344] to-[#05596B] text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Discover Your Perfect Destination
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Explore premium residential areas with exclusive compounds and
              modern amenities tailored to your lifestyle.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/70 h-12 focus-visible:ring-white/30"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    {areas.length}
                    <p className="text-sm text-white/80">Destinations</p>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    {areas.reduce(
                      (acc: number, area: any) => acc + area.compounds.count,
                      0
                    )}
                    <p className="text-sm text-white/80">Compounds</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto">
        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#013344] mb-2 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#05596B]" />
              {searchQuery ? "Search Results" : "All Destinations"}
            </h2>
            <p className="text-[#05596B]">
              {filteredAreas.length}{" "}
              {searchQuery ? "Results Found" : "Premium Locations Available"}
              {searchQuery && (
                <span className="ml-2 text-sm">
                  for <span className="font-medium">{searchQuery}</span>
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-[#05596B] hover:text-[#013344] underline"
                  >
                    Clear
                  </button>
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-3">
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
                className={`border-[#05596B]  ${
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
                className={`border-[#05596B]  ${
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

        {/* Areas Grid */}
        {isLoading ? (
          <AreasLoading />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAreas.map((area: any) => (
                <Link
                  href={`/areas/${area.slug}`}
                  key={area.id}
                  className="transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <AreaCard area={area} />
                </Link>
              ))}
            </div>

            {filteredAreas.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <div className="bg-[#F7F8F8] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-10 w-10 text-[#05596B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#013344] mb-3">
                  No Destinations Found
                </h3>
                <p className="text-[#05596B] max-w-md mx-auto mb-6">
                  We couldn&apos;t find any areas matching &quot;{searchQuery}
                  &quot;. Please try adjusting your search parameters.
                </p>
                <Button
                  className="bg-[#05596B] hover:bg-[#013344]"
                  onClick={clearSearch}
                >
                  View All Destinations
                </Button>
              </div>
            )}
          </>
        )}

        {/* Featured Section */}
        {filteredAreas.length > 0 && (
          <div className="mt-16 bg-white rounded-xl p-8 shadow-md border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6F7F6] rounded-bl-full opacity-20"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#013344] mb-2">
                    Why Choose Our Destinations?
                  </h2>
                  <p className="text-[#05596B] max-w-2xl">
                    Our carefully selected locations offer the perfect balance
                    of luxury, convenience, and community living.
                  </p>
                </div>
                <Button asChild className="bg-[#05596B] hover:bg-[#013344]">
                  <Link href="/contact">Contact an Agent</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-[#F7F8F8] p-6 rounded-lg">
                  <div className="bg-[#E6F7F6] p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-[#05596B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#013344] mb-2">
                    Prime Locations
                  </h3>
                  <p className="text-[#05596B]">
                    Strategically located areas with easy access to essential
                    amenities and services.
                  </p>
                </div>

                <div className="bg-[#F7F8F8] p-6 rounded-lg">
                  <div className="bg-[#E6F7F6] p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-[#05596B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#013344] mb-2">
                    Quality Developments
                  </h3>
                  <p className="text-[#05596B]">
                    Premium compounds built by reputable developers with
                    attention to detail.
                  </p>
                </div>

                <div className="bg-[#F7F8F8] p-6 rounded-lg">
                  <div className="bg-[#E6F7F6] p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-[#05596B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#013344] mb-2">
                    Investment Value
                  </h3>
                  <p className="text-[#05596B]">
                    Areas with high growth potential and strong return on
                    investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function AreasLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="group relative">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
