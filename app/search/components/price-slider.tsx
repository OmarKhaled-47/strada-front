
"use client";

import { useId } from "react";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@/app/search/contexts/SearchContext";

interface PriceSliderProps {
  onFilterApplied?: () => void;
}

export function PriceSlider({ onFilterApplied }: PriceSliderProps) {
  const id = useId();
  const { filters, updateFilters } = useSearch();

  // Define min and max values for the price range
  const minValue = 0;
  const maxValue = 50000000; // 50 million

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
  } = useSliderWithInput({
    minValue,
    maxValue,
    initialValue: [filters.minPrice || minValue, filters.maxPrice || maxValue],
    defaultValue: [minValue, maxValue],
  });

  const handleSliderValueChange = (values: number[]) => {
    handleSliderChange(values);
  };

  const applyPriceFilter = () => {
    updateFilters({
      minPrice: sliderValue[0] === minValue ? undefined : sliderValue[0],
      maxPrice: sliderValue[1] === maxValue ? undefined : sliderValue[1],
    });
    onFilterApplied?.();
  };

  const resetPriceFilter = () => {
    resetToDefault();
    updateFilters({
      minPrice: undefined,
      maxPrice: undefined,
    });
    onFilterApplied?.();
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-[#013344]">Price Range</Label>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-sm text-[#05596B] hover:text-[#05596B]/80"
          onClick={resetPriceFilter}
        >
          Reset
        </Button>
      </div>

      <div>
        <div className="px-2">
          <Slider
            value={sliderValue}
            onValueChange={handleSliderValueChange}
            onValueCommit={applyPriceFilter}
            min={minValue}
            max={maxValue}
            step={100000}
            className="mb-6"
          />
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            <div>{formatPrice(sliderValue[0])} EGP</div>
            <div>{formatPrice(sliderValue[1])} EGP</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 w-full">
          <Label htmlFor={`${id}-min`} className="text-sm text-[#013344]">
            Min Price
          </Label>
          <div className="relative">
            <Input
              id={`${id}-min`}
              className="peer w-full pl-12 h-10 bg-[#F8F9FA] border-[#E9E8E9] focus-visible:ring-[#05596B]"
              type="text"
              inputMode="numeric"
              value={inputValues[0]}
              onChange={(e) => handleInputChange(e, 0)}
              onBlur={() => {
                validateAndUpdateValue(inputValues[0], 0);
                applyPriceFilter();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[0], 0);
                  applyPriceFilter();
                }
              }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-sm text-muted-foreground peer-disabled:opacity-50 bg-[#F0F7FA] border-r h-full rounded-l-md">
              EGP
            </span>
          </div>
        </div>

        <div className="space-y-1 w-full">
          <Label htmlFor={`${id}-max`} className="text-sm text-[#013344]">
            Max Price
          </Label>
          <div className="relative">
            <Input
              id={`${id}-max`}
              className="peer w-full pl-12 h-10 bg-[#F8F9FA] border-[#E9E8E9] focus-visible:ring-[#05596B]"
              type="text"
              inputMode="numeric"
              value={inputValues[1]}
              onChange={(e) => handleInputChange(e, 1)}
              onBlur={() => {
                validateAndUpdateValue(inputValues[1], 1);
                applyPriceFilter();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[1], 1);
                  applyPriceFilter();
                }
              }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-sm text-muted-foreground peer-disabled:opacity-50 bg-[#F0F7FA] border-r h-full rounded-l-md">
              EGP
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={applyPriceFilter}
        className="w-full bg-[#05596B] hover:bg-[#05596B]/90 text-white"
      >
        Apply Filter
      </Button>
    </div>
  );
}
