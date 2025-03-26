"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

interface Area {
  id: string;
  name: string;
  slug: string;
}

interface AreaSliderProps {
  areas: Area[];
}

export function AreaSlider({ areas }: AreaSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 300;
    const newScrollLeft =
      direction === "left"
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update buttons after scroll animation completes
    setTimeout(checkScrollability, 300);
  };

  return (
    <div className="w-full relative">
      <div
        className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        ref={sliderRef}
        onScroll={checkScrollability}
      >
        <div className="flex gap-3 min-w-max px-1">
          {areas.map((area) => (
            <Link
              href={`/areas/${area.slug}`}
              key={area.id}
              className="transition-transform hover:scale-105"
            >
              <Badge
                variant="outline"
                className="bg-white border-[#05596B] text-[#05596B] hover:bg-[#05596B] hover:text-white px-4 py-2 text-sm font-medium shadow-sm"
              >
                {area.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {canScrollLeft && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md hover:bg-gray-100 z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-md hover:bg-gray-100 z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Gradient fade effect */}
      {canScrollLeft && (
        <div className="absolute top-0 left-0 h-full w-16 pointer-events-none z-[1]">
          <div className="bg-gradient-to-r from-white to-transparent w-full h-full"></div>
        </div>
      )}

      {canScrollRight && (
        <div className="absolute top-0 right-0 h-full w-16 pointer-events-none z-[1]">
          <div className="bg-gradient-to-l from-white to-transparent w-full h-full"></div>
        </div>
      )}
    </div>
  );
}
