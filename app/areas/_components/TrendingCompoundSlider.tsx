"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import TrendingCompound from "./TrendingCompound";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Compound {
  id: number;
  name: string;
  slug: string;
  banner?: {
    url: string;
  };
}

interface TrendingCompoundSliderProps {
  compounds: Compound[];
  options?: EmblaOptionsType;
}

export function TrendingCompoundSlider({
  compounds,
  options,
}: TrendingCompoundSliderProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1023px)");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: isMobile ? 1 : isTablet ? 2 : 3,
      ...options,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!compounds.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex -ml-4">
          {compounds.map((compound) => (
            <div
              key={compound.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <TrendingCompound compound={compound} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm",
            prevBtnDisabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm",
            nextBtnDisabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1 md:gap-2 mt-4">
        {compounds.slice(0, Math.min(compounds.length, 10)).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 md:h-2 rounded-full transition-all",
              index === selectedIndex % compounds.length
                ? "bg-primary w-3 md:w-4"
                : "bg-primary/20 w-1.5 md:w-2 hover:bg-primary/40"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
