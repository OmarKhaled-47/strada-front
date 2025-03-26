"use client";

import type React from "react";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, MapPin, Home, Bed } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  propertyTypes: string[];
  bedrooms: string[];
  location: string[];
  sliderValue: [number, number];
  inputValues: [string, string];
  areas: { id: string; name: string; slug: string }[];
  loading: boolean;
  handlePropertyTypeChange: (type: string) => void;
  handleBedroomChange: (option: string) => void;
  handleLocationChange: (slug: string) => void;
  handleSliderChange: (values: number[]) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  validateAndUpdateValue: (value: string, index: number) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

interface MobileFilterDrawerProps {
  filterState: FilterState;
  activeTab: "compounds" | "properties";
}

export function MobileFilterDrawer({
  filterState,
  activeTab,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);

  // Count active filters
  const activeFiltersCount =
    filterState.location.length +
    filterState.propertyTypes.length +
    filterState.bedrooms.length +
    (filterState.sliderValue[0] > 0 || filterState.sliderValue[1] < 50000000
      ? 1
      : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 border-orange-200 text-orange-700 hover:bg-orange-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-orange-500 hover:bg-orange-600">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
        <SheetHeader>
          <SheetTitle className="text-center text-xl">Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 overflow-y-auto h-[calc(100%-120px)] pb-20">
          {/* Location Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-orange-500" />
              Location
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {filterState.loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  Loading locations...
                </div>
              ) : (
                filterState.areas.map((area) => (
                  <div
                    key={area.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Checkbox
                      id={`mobile-area-${area.slug}`}
                      checked={filterState.location.includes(area.slug)}
                      onCheckedChange={() =>
                        filterState.handleLocationChange(area.slug)
                      }
                      className="h-4 w-4 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-sm"
                    />
                    <Label
                      htmlFor={`mobile-area-${area.slug}`}
                      className="flex-grow cursor-pointer text-gray-700"
                    >
                      {area.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Property Type Filter - Only show for Properties tab */}
          {activeTab === "properties" && (
            <>
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Home className="h-4 w-4 mr-2 text-blue-500" />
                  Property Type
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Apartment",
                    "Villa",
                    "Twinhouse",
                    "Townhouse",
                    "Duplex",
                    "Penthouse",
                    "Chalet",
                    "Studio",
                  ].map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Checkbox
                        id={`mobile-type-${type}`}
                        checked={filterState.propertyTypes.includes(type)}
                        onCheckedChange={() =>
                          filterState.handlePropertyTypeChange(type)
                        }
                        className="h-4 w-4 border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-sm"
                      />
                      <Label
                        htmlFor={`mobile-type-${type}`}
                        className="flex-grow cursor-pointer text-gray-700 text-sm"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Bedrooms Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Bed className="h-4 w-4 mr-2 text-purple-500" />
                  Bedrooms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <Button
                      key={`mobile-bedroom-${num}`}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-full h-10 w-10 p-0 border-gray-300",
                        filterState.bedrooms.includes(num)
                          ? "bg-purple-500 text-white hover:bg-purple-600 border-purple-500"
                          : "hover:bg-purple-50 hover:text-purple-700"
                      )}
                      onClick={() => filterState.handleBedroomChange(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />
            </>
          )}

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              Price Range (EGP)
            </h3>
            <div className="px-2 py-4">
              <Slider
                value={filterState.sliderValue}
                onValueChange={filterState.handleSliderChange}
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

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <Label className="text-sm text-gray-600">Min Price</Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={filterState.inputValues[0]}
                    onChange={(e) => filterState.handleInputChange(e, 0)}
                    onBlur={() =>
                      filterState.validateAndUpdateValue(
                        filterState.inputValues[0],
                        0
                      )
                    }
                    className="pl-14 h-10"
                  />
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-sm text-muted-foreground bg-gray-100 border-r h-full rounded-l-md">
                    EGP
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm text-gray-600">Max Price</Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={filterState.inputValues[1]}
                    onChange={(e) => filterState.handleInputChange(e, 1)}
                    onBlur={() =>
                      filterState.validateAndUpdateValue(
                        filterState.inputValues[1],
                        1
                      )
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
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              filterState.resetFilters();
              setOpen(false);
            }}
          >
            Reset
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => {
              filterState.applyFilters();
              setOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
