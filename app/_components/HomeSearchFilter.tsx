/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, X, MapPin, Home, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { EnhancedSearchBar } from "@/app/search/components/enhanced-search-bar";
import SearchApi from "@/app/api/SearchApi";
import { useSearch } from "@/app/search/contexts/SearchContext";
import { cn } from "@/lib/utils";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSliderWithInput } from "./SliderInput";

export function HomeSearchFilter() {
  const router = useRouter();
  const { updateFilters, setEntityType } = useSearch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State for active tab (compound or property)
  const [activeTab, setActiveTab] = useState<"compounds" | "properties">(
    "compounds"
  );

  // Dropdown states
  const [dropdownStates, setDropdownStates] = useState({
    location: false,
    propertyType: false,
    price: false,
    bedrooms: false,
  });

  // Filter states
  const [location, setLocation] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);

  // Price range using the custom hook
  const {
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
    resetToDefault,
  } = useSliderWithInput({
    minValue: 0,
    maxValue: 50000000,
    initialValue: [0, 50000000],
    defaultValue: [0, 50000000],
  });

  // Areas and property types options
  const [areas, setAreas] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Twinhouse",
    "Townhouse",
    "Duplex",
    "Penthouse",
    "Chalet",
    "Studio",
  ];

  const bedroomOptions = ["1", "2", "3", "4", "5+"];

  // Toggle dropdown state
  const toggleDropdown = useCallback((key: keyof typeof dropdownStates) => {
    setDropdownStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Load filter options on component mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        setLoading(true);
        const options = await SearchApi.getFilterOptions();
        setAreas(options.areas);
      } catch (err) {
        console.error("Failed to load filter options:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  // Handle property type selection
  const handlePropertyTypeChange = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handle location selection
  const handleLocationChange = (slug: string) => {
    setLocation((prev) =>
      prev.includes(slug) ? prev.filter((l) => l !== slug) : [...prev, slug]
    );
  };

  // Handle bedroom selection
  const handleBedroomChange = (option: string) => {
    setBedrooms((prev) =>
      prev.includes(option)
        ? prev.filter((b) => b !== option)
        : [...prev, option]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setLocation([]);
    setPropertyType([]);
    setBedrooms([]);
    resetToDefault();
  };

  // Handle search submission
  const handleSearch = () => {
    // Prepare filters based on selected values
    const searchFilters: Record<string, any> = {};

    // Add location filter if selected
    if (location.length > 0) {
      searchFilters.areas = location;
    }

    // Add property type filter if selected
    if (propertyType.length > 0) {
      searchFilters.propertyTypes = propertyType;
    }

    // Add bedroom filter if selected
    if (bedrooms.length > 0) {
      searchFilters.bedrooms = bedrooms.map((b) =>
        b === "5+" ? 5 : Number.parseInt(b)
      );
    }

    // Add price range filter
    if (sliderValue[0] > 0 || sliderValue[1] < 50000000) {
      searchFilters.minPrice = sliderValue[0];
      searchFilters.maxPrice = sliderValue[1];
    }

    // Update filters in context
    updateFilters(searchFilters);

    // Set the entity type based on active tab
    setEntityType(activeTab);

    // Build URL parameters for the search page
    const params = new URLSearchParams();

    // Set entity type - this is the key parameter that determines what type of results to show
    params.set("type", activeTab);

    // Add area filters
    location.forEach((loc) => params.append("area", loc));

    // Add property type filters
    if (activeTab === "properties") {
      propertyType.forEach((type) => params.append("propertyType", type));
    }

    // Add bedroom filters
    bedrooms.forEach((bed) => {
      const value = bed === "5+" ? "5" : bed;
      params.append("bedroom", value);
    });

    // Add price range
    if (sliderValue[0] > 0) {
      params.set("minPrice", sliderValue[0].toString());
    }
    if (sliderValue[1] < 50000000) {
      params.set("maxPrice", sliderValue[1].toString());
    }

    // Navigate to search page with filters
    router.push(`/search?${params.toString()}`);
  };

  // Get area name by slug
  const getAreaNameBySlug = (slug: string) => {
    const area = areas.find((area) => area.slug === slug);
    return area ? area.name : slug;
  };

  // Count active filters
  const activeFiltersCount =
    location.length +
    propertyType.length +
    bedrooms.length +
    (sliderValue[0] > 0 || sliderValue[1] < 50000000 ? 1 : 0);

  // Share filter state with mobile drawer
  const filterState = {
    propertyTypes: propertyType,
    bedrooms,
    location,
    handlePropertyTypeChange,
    handleBedroomChange,
    handleLocationChange,
    resetFilters,
    applyFilters: handleSearch,
    areas,
    loading,
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-lg  transition-all duration-300">
      <Tabs
        defaultValue="compounds"
        onValueChange={(value) =>
          setActiveTab(value as "compounds" | "properties")
        }
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 h-16 bg-transparent border-b">
          <TabsTrigger
            value="compounds"
            className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 rounded-none h-full text-gray-700 text-lg font-medium transition-all"
          >
            Compounds
          </TabsTrigger>
          <TabsTrigger
            value="properties"
            className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 rounded-none h-full text-gray-700 text-lg font-medium transition-all"
          >
            Properties
          </TabsTrigger>
        </TabsList>

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <EnhancedSearchBar />
            {/* <div className="flex-1">
            </div> */}
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="h-12 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>

          {/* Active filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {location.map((loc) => (
                <Badge
                  key={loc}
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {getAreaNameBySlug(loc)}
                  <button
                    onClick={() => handleLocationChange(loc)}
                    className="ml-1 hover:bg-orange-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {propertyType.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Home className="h-3 w-3" />
                  {type}
                  <button
                    onClick={() => handlePropertyTypeChange(type)}
                    className="ml-1 hover:bg-blue-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {bedrooms.map((bed) => (
                <Badge
                  key={bed}
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Bed className="h-3 w-3" />
                  {bed} {bed === "1" ? "Bedroom" : "Bedrooms"}
                  <button
                    onClick={() => handleBedroomChange(bed)}
                    className="ml-1 hover:bg-purple-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {(sliderValue[0] > 0 || sliderValue[1] < 50000000) && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  EGP {sliderValue[0].toLocaleString()} -{" "}
                  {sliderValue[1].toLocaleString()} EGP
                  <button
                    onClick={resetToDefault}
                    className="ml-1 hover:bg-green-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-gray-900 px-3 py-1 h-auto text-sm"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}

          {isMobile ? (
            <div className="flex items-center gap-2">
              <MobileFilterDrawer
                filterState={filterState}
                activeTab={activeTab}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Filter */}
              <Popover
                open={dropdownStates.location}
                onOpenChange={() => toggleDropdown("location")}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={dropdownStates.location}
                    className={cn(
                      "w-full justify-between h-12 font-normal border-gray-300 text-gray-700 hover:bg-gray-50 transition-all",
                      location.length > 0 &&
                        "border-orange-300 bg-orange-50 text-orange-700"
                    )}
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {location.length > 0
                        ? `${location.length} location${location.length > 1 ? "s" : ""}`
                        : "Location"}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[280px] p-0 shadow-lg border-gray-200"
                  align="start"
                >
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-gray-900">
                      Select Locations
                    </h3>
                  </div>
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                        Loading locations...
                      </div>
                    ) : (
                      areas.map((area) => (
                        <div
                          key={area.id}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <Checkbox
                            id={`area-${area.slug}`}
                            checked={location.includes(area.slug)}
                            onCheckedChange={() =>
                              handleLocationChange(area.slug)
                            }
                            className="h-4 w-4 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-sm"
                          />
                          <Label
                            htmlFor={`area-${area.slug}`}
                            className="flex-grow cursor-pointer text-gray-700"
                          >
                            {area.name}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                  {location.length > 0 && (
                    <div className="p-2 border-t flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLocation([])}
                        className="text-gray-600"
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => toggleDropdown("location")}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              {/* Price Range Filter */}
              <Popover
                open={dropdownStates.price}
                onOpenChange={() => toggleDropdown("price")}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={dropdownStates.price}
                    className={cn(
                      "w-full justify-between h-12 font-normal border-gray-300 text-gray-700 hover:bg-gray-50 transition-all",
                      (sliderValue[0] > 0 || sliderValue[1] < 50000000) &&
                        "border-green-300 bg-green-50 text-green-700"
                    )}
                  >
                    <div className="flex items-center gap-3 justify-center">
                      <p className="mr-2 h-4 w-4 text-gray-500">EGP</p>
                      Price Range
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[320px] p-0 shadow-lg border-gray-200"
                  align="center"
                >
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-gray-900">
                      Price Range (EGP)
                    </h3>
                  </div>
                  <div className="p-4 space-y-6">
                    <div className="px-2 py-4">
                      <Slider
                        value={sliderValue}
                        onValueChange={handleSliderChange}
                        min={0}
                        max={50000000}
                        step={100000}
                        className="mb-6"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>25M</span>
                        <span>50M</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm text-gray-600">
                          Min Price
                        </Label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={inputValues[0]}
                            onChange={(e) => handleInputChange(e, 0)}
                            onBlur={() =>
                              validateAndUpdateValue(inputValues[0], 0)
                            }
                            className="pl-14 h-10 "
                          />
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-sm text-muted-foreground bg-gray-100 border-r h-full rounded-l-md">
                            EGP
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm text-gray-600">
                          Max Price
                        </Label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={inputValues[1]}
                            onChange={(e) => handleInputChange(e, 1)}
                            onBlur={() =>
                              validateAndUpdateValue(inputValues[1], 1)
                            }
                            className="pl-14 h-10"
                          />
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-sm text-muted-foreground bg-gray-100 border-r h-full rounded-l-md">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetToDefault}
                      className="text-gray-600"
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleDropdown("price")}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              {/* Property Type Filter - Only show for Properties tab */}
              {activeTab === "properties" ? (
                <Popover
                  open={dropdownStates.propertyType}
                  onOpenChange={() => toggleDropdown("propertyType")}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={dropdownStates.propertyType}
                      className={cn(
                        "w-full justify-between h-12 font-normal border-gray-300 text-gray-700 hover:bg-gray-50 transition-all",
                        propertyType.length > 0 &&
                          "border-blue-300 bg-blue-50 text-blue-700"
                      )}
                    >
                      <div className="flex items-center">
                        <Home className="mr-2 h-4 w-4 text-gray-500" />
                        {propertyType.length > 0
                          ? `${propertyType.length} type${propertyType.length > 1 ? "s" : ""}`
                          : "Property Type"}
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[280px] p-0 shadow-lg border-gray-200"
                    align="start"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-medium text-gray-900">
                        Property Types
                      </h3>
                    </div>
                    <div className="p-2 max-h-[300px] overflow-y-auto">
                      {propertyTypes.map((type) => (
                        <div
                          key={type}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <Checkbox
                            id={`type-${type}`}
                            checked={propertyType.includes(type)}
                            onCheckedChange={() =>
                              handlePropertyTypeChange(type)
                            }
                            className="h-4 w-4 border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-sm"
                          />
                          <Label
                            htmlFor={`type-${type}`}
                            className="flex-grow cursor-pointer text-gray-700"
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {propertyType.length > 0 && (
                      <div className="p-2 border-t flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPropertyType([])}
                          className="text-gray-600"
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleDropdown("propertyType")}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="hidden md:block"></div>
              )}

              {/* Bedrooms Filter - Only show for Properties tab */}
              {activeTab === "properties" ? (
                <Popover
                  open={dropdownStates.bedrooms}
                  onOpenChange={() => toggleDropdown("bedrooms")}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={dropdownStates.bedrooms}
                      className={cn(
                        "w-full justify-between h-12 font-normal border-gray-300 text-gray-700 hover:bg-gray-50 transition-all",
                        bedrooms.length > 0 &&
                          "border-purple-300 bg-purple-50 text-purple-700"
                      )}
                    >
                      <div className="flex items-center">
                        <Bed className="mr-2 h-4 w-4 text-gray-500" />
                        {bedrooms.length > 0
                          ? `${bedrooms.length} bedroom${bedrooms.length > 1 ? "s" : ""}`
                          : "Bedrooms"}
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[280px] p-0 shadow-lg border-gray-200"
                    align="start"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-medium text-gray-900">Bedrooms</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {bedroomOptions.map((num) => (
                          <Button
                            key={`bedroom-${num}`}
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-full h-10 w-10 p-0 border-gray-300",
                              bedrooms.includes(num)
                                ? "bg-purple-500 text-white hover:bg-purple-600 border-purple-500"
                                : "hover:bg-purple-50 hover:text-purple-700"
                            )}
                            onClick={() => handleBedroomChange(num)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {bedrooms.length > 0 && (
                      <div className="p-2 border-t flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setBedrooms([])}
                          className="text-gray-600"
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleDropdown("bedrooms")}
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="hidden md:block"></div>
              )}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
