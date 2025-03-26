/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearch } from "@/app/search/contexts/SearchContext";
import { PriceSlider } from "./price-slider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  onFilterApplied?: () => void;
}

export function FilterSidebar({ onFilterApplied }: FilterSidebarProps) {
  const {
    entityType,
    filters,
    updateFilters,
    resetFilters,
    areas,
    developers,
    propertyTypes,
    finishingTypes,
  } = useSearch();

  // Local state for area range slider
  const [areaRange, setAreaRange] = useState<[number, number]>([
    filters.minArea || 0,
    filters.maxArea || 1000,
  ]);

  // Search states
  const [areaSearch, setAreaSearch] = useState("");
  const [developerSearch, setDeveloperSearch] = useState("");
  const [propertyTypeSearch, setPropertyTypeSearch] = useState("");

  // Update local state when filters change
  useEffect(() => {
    setAreaRange([filters.minArea || 0, filters.maxArea || 1000]);
  }, [filters.minArea, filters.maxArea]);

  // Handle area range change
  const handleAreaRangeChange = (values: number[]) => {
    setAreaRange([values[0], values[1]]);
  };

  // Apply area range after slider interaction ends
  const handleAreaRangeChangeEnd = () => {
    updateFilters({
      minArea: areaRange[0],
      maxArea: areaRange[1] === 1000 ? undefined : areaRange[1],
    });
    onFilterApplied?.();
  };

  // Wrapper for updateFilters that also calls onFilterApplied
  const handleUpdateFilters = (newFilters: any) => {
    updateFilters(newFilters);
    onFilterApplied?.();
  };

  // Wrapper for resetFilters that also calls onFilterApplied
  const handleResetFilters = () => {
    resetFilters();
    onFilterApplied?.();
  };

  // Filter areas by search
  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(areaSearch.toLowerCase())
  );

  // Filter developers by search
  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(developerSearch.toLowerCase())
  );

  // Filter property types by search
  const filteredPropertyTypes = propertyTypes.filter((type) =>
    type.toLowerCase().includes(propertyTypeSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Areas Filter */}
      <Accordion type="multiple" defaultValue={["areas"]} className="space-y-4">
        <AccordionItem value="areas" className="border-b border-[#E9E8E9]">
          <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
            <div className="flex items-center gap-2">
              <span>Areas</span>
              {filters.areas && filters.areas.length > 0 && (
                <Badge className="bg-[#05596B] text-xs">
                  {filters.areas.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between mb-3 ">
              <div className="relative w-full">
                <Input
                  placeholder="Search areas..."
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                  className="pl-8 text-sm h-9 bg-[#F8F9FA] border-[#E9E8E9] focus-visible:ring-[#05596B]"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {areaSearch && (
                  <button
                    onClick={() => setAreaSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>
              {filters.areas && filters.areas.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 text-sm text-[#05596B] hover:text-[#05596B]/80 whitespace-nowrap"
                  onClick={() => handleUpdateFilters({ areas: [] })}
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mt-3">
              {filteredAreas.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-2">
                  No areas found
                </p>
              ) : (
                filteredAreas.map((area) => (
                  <div
                    key={area.id}
                    className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1"
                  >
                    <Checkbox
                      id={`area-${area.slug}`}
                      checked={filters.areas?.includes(area.slug)}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          areas: checked
                            ? [...(filters.areas || []), area.slug]
                            : (filters.areas || []).filter(
                                (a) => a !== area.slug
                              ),
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor={`area-${area.slug}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      {area.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Developers Filter */}
        <AccordionItem value="developers" className="border-b border-[#E9E8E9]">
          <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
            <div className="flex items-center gap-2">
              <span>Developers</span>
              {filters.developers && filters.developers.length > 0 && (
                <Badge className="bg-[#05596B] text-xs">
                  {filters.developers.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between mb-3">
              <div className="relative w-full">
                <Input
                  placeholder="Search developers..."
                  value={developerSearch}
                  onChange={(e) => setDeveloperSearch(e.target.value)}
                  className="pl-8 text-sm h-9 bg-[#F8F9FA] border-[#E9E8E9] focus-visible:ring-[#05596B]"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {developerSearch && (
                  <button
                    onClick={() => setDeveloperSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>
              {filters.developers && filters.developers.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 text-sm text-[#05596B] hover:text-[#05596B]/80 whitespace-nowrap"
                  onClick={() => handleUpdateFilters({ developers: [] })}
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mt-3">
              {filteredDevelopers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-2">
                  No developers found
                </p>
              ) : (
                filteredDevelopers.map((developer) => (
                  <div
                    key={developer.id}
                    className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1"
                  >
                    <Checkbox
                      id={`developer-${developer.slug}`}
                      checked={filters.developers?.includes(developer.slug)}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          developers: checked
                            ? [...(filters.developers || []), developer.slug]
                            : (filters.developers || []).filter(
                                (d) => d !== developer.slug
                              ),
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor={`developer-${developer.slug}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      {developer.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Property Type Filter - Only show for properties */}
        {entityType === "properties" && (
          <AccordionItem
            value="propertyTypes"
            className="border-b border-[#E9E8E9]"
          >
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Property Types</span>
                {filters.propertyTypes && filters.propertyTypes.length > 0 && (
                  <Badge className="bg-[#05596B] text-xs">
                    {filters.propertyTypes.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-3">
                <div className="relative w-full">
                  <Input
                    placeholder="Search property types..."
                    value={propertyTypeSearch}
                    onChange={(e) => setPropertyTypeSearch(e.target.value)}
                    className="pl-8 text-sm h-9 bg-[#F8F9FA] border-[#E9E8E9] focus-visible:ring-[#05596B]"
                  />
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {propertyTypeSearch && (
                    <button
                      onClick={() => setPropertyTypeSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>
                  )}
                </div>
                {filters.propertyTypes && filters.propertyTypes.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2 text-sm text-[#05596B] hover:text-[#05596B]/80 whitespace-nowrap"
                    onClick={() => handleUpdateFilters({ propertyTypes: [] })}
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mt-3">
                {filteredPropertyTypes.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2">
                    No property types found
                  </p>
                ) : (
                  filteredPropertyTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1"
                    >
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.propertyTypes?.includes(type)}
                        onCheckedChange={(checked) => {
                          handleUpdateFilters({
                            propertyTypes: checked
                              ? [...(filters.propertyTypes || []), type]
                              : (filters.propertyTypes || []).filter(
                                  (t) => t !== type
                                ),
                          });
                        }}
                        className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                      >
                        {type}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Bedrooms Filter - Only show for properties */}
        {entityType === "properties" && (
          <AccordionItem value="bedrooms" className="border-b border-[#E9E8E9]">
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Bedrooms</span>
                {filters.bedrooms && filters.bedrooms.length > 0 && (
                  <Badge className="bg-[#05596B] text-xs">
                    {filters.bedrooms.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-3">
                {filters.bedrooms && filters.bedrooms.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-sm text-[#05596B] hover:text-[#05596B]/80"
                    onClick={() => handleUpdateFilters({ bedrooms: [] })}
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={
                      filters.bedrooms?.includes(num) ? "default" : "outline"
                    }
                    size="sm"
                    className={
                      filters.bedrooms?.includes(num)
                        ? "h-9 px-4 bg-[#05596B] hover:bg-[#05596B]/90 text-white"
                        : "h-9 px-4 border-[#CBBBAC] hover:bg-[#F0F7FA] hover:border-[#05596B]"
                    }
                    onClick={() => {
                      handleUpdateFilters({
                        bedrooms: filters.bedrooms?.includes(num)
                          ? (filters.bedrooms || []).filter((b) => b !== num)
                          : [...(filters.bedrooms || []), num],
                      });
                    }}
                  >
                    {num}
                    {num === 5 ? "+" : ""}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Bathrooms Filter - Only show for properties */}
        {entityType === "properties" && (
          <AccordionItem
            value="bathrooms"
            className="border-b border-[#E9E8E9]"
          >
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Bathrooms</span>
                {filters.bathrooms && filters.bathrooms.length > 0 && (
                  <Badge className="bg-[#05596B] text-xs">
                    {filters.bathrooms.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-3">
                {filters.bathrooms && filters.bathrooms.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-sm text-[#05596B] hover:text-[#05596B]/80"
                    onClick={() => handleUpdateFilters({ bathrooms: [] })}
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={
                      filters.bathrooms?.includes(num) ? "default" : "outline"
                    }
                    size="sm"
                    className={
                      filters.bathrooms?.includes(num)
                        ? "h-9 px-4 bg-[#05596B] hover:bg-[#05596B]/90 text-white"
                        : "h-9 px-4 border-[#CBBBAC] hover:bg-[#F0F7FA] hover:border-[#05596B]"
                    }
                    onClick={() => {
                      handleUpdateFilters({
                        bathrooms: filters.bathrooms?.includes(num)
                          ? (filters.bathrooms || []).filter((b) => b !== num)
                          : [...(filters.bathrooms || []), num],
                      });
                    }}
                  >
                    {num}
                    {num === 5 ? "+" : ""}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Range Filter - Only show for properties and compounds */}
        {(entityType === "properties" || entityType === "compounds") && (
          <AccordionItem
            value="priceRange"
            className="border-b border-[#E9E8E9]"
          >
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Price Range</span>
                {(filters.minPrice || filters.maxPrice) && (
                  <Badge className="bg-[#05596B] text-xs">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PriceSlider onFilterApplied={onFilterApplied} />
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Area Range Filter - Only show for properties */}
        {entityType === "properties" && (
          <AccordionItem
            value="areaRange"
            className="border-b border-[#E9E8E9]"
          >
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Area Size</span>
                {(filters.minArea || filters.maxArea) && (
                  <Badge className="bg-[#05596B] text-xs">1</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-sm text-[#05596B] hover:text-[#05596B]/80"
                  onClick={() => {
                    setAreaRange([0, 1000]);
                    handleUpdateFilters({
                      minArea: undefined,
                      maxArea: undefined,
                    });
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className="px-2">
                <Slider
                  value={areaRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={handleAreaRangeChange}
                  onValueCommit={handleAreaRangeChangeEnd}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>{areaRange[0]} m²</div>
                  <div>
                    {areaRange[1] === 1000 ? "1000+ m²" : `${areaRange[1]} m²`}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        {entityType === "properties" && (
          <AccordionItem
            value="finishing"
            className="border-b border-[#E9E8E9]"
          >
            <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
              <div className="flex items-center gap-2">
                <span>Finishing</span>
                {filters.finishing && filters.finishing.length > 0 && (
                  <Badge className="bg-[#05596B] text-xs">
                    {filters.finishing.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-3">
                {filters.finishing && filters.finishing.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-sm text-[#05596B] hover:text-[#05596B]/80"
                    onClick={() => handleUpdateFilters({ finishing: [] })}
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {finishingTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1"
                  >
                    <Checkbox
                      id={`finishing-${type}`}
                      checked={filters.finishing?.includes(type)}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          finishing: checked
                            ? [...(filters.finishing || []), type]
                            : (filters.finishing || []).filter(
                                (f) => f !== type
                              ),
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor={`finishing-${type}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Special Filters */}
        <AccordionItem
          value="specialFilters"
          className="border-b border-[#E9E8E9]"
        >
          <AccordionTrigger className="font-semibold text-[#013344] hover:text-[#05596B] py-3">
            <div className="flex items-center gap-2">
              <span>Special Filters</span>
              {(filters.isNewLaunch ||
                filters.isTrendingProject ||
                filters.hasOffers ||
                filters.isSoldout ||
                filters.isReadyToMove ||
                filters.isRecommended) && (
                <Badge className="bg-[#05596B] text-xs">
                  {
                    [
                      filters.isNewLaunch,
                      filters.isTrendingProject,
                      filters.hasOffers,
                      filters.isSoldout,
                      filters.isReadyToMove,
                      filters.isRecommended,
                    ].filter(Boolean).length
                  }
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {entityType === "compounds" && (
                <>
                  <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                    <Checkbox
                      id="isNewLaunch"
                      checked={filters.isNewLaunch === true}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          isNewLaunch: checked ? true : undefined,
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor="isNewLaunch"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      New Launches Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                    <Checkbox
                      id="isTrendingProject"
                      checked={filters.isTrendingProject === true}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          isTrendingProject: checked ? true : undefined,
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor="isTrendingProject"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      Trending Projects Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                    <Checkbox
                      id="hasOffers"
                      checked={filters.hasOffers === true}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          hasOffers: checked ? true : undefined,
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor="hasOffers"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      With Special Offers
                    </Label>
                  </div>
                </>
              )}
              {entityType === "properties" && (
                <>
                  <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                    <Checkbox
                      id="isSoldout"
                      checked={filters.isSoldout === true}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          isSoldout: checked ? true : undefined,
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor="isSoldout"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      Include Sold Out
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                    <Checkbox
                      id="isReadyToMove"
                      checked={filters.isReadyToMove === true}
                      onCheckedChange={(checked) => {
                        handleUpdateFilters({
                          isReadyToMove: checked ? true : undefined,
                        });
                      }}
                      className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                    />
                    <Label
                      htmlFor="isReadyToMove"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      Ready to Move Only
                    </Label>
                  </div>
                </>
              )}
              <div className="flex items-center space-x-2 py-1 hover:bg-[#F8F9FA] rounded px-1">
                <Checkbox
                  id="isRecommended"
                  checked={filters.isRecommended === true}
                  onCheckedChange={(checked) => {
                    handleUpdateFilters({
                      isRecommended: checked ? true : undefined,
                    });
                  }}
                  className="text-[#05596B] border-[#CBBBAC] data-[state=checked]:bg-[#05596B] data-[state=checked]:border-[#05596B]"
                />
                <Label
                  htmlFor="isRecommended"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  Recommended Only
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        onClick={handleResetFilters}
        variant="outline"
        className="w-full border-[#05596B] text-[#05596B] hover:bg-[#F0F7FA] mt-6 flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reset All Filters
      </Button>
    </div>
  );
}
