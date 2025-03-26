/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PaymentPlanCard } from "./PaymentPlanCard";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PaymentPlanSliderProps {
  plans: any[];
  compound: any;
}

export function PaymentPlanSlider({ plans, compound }: PaymentPlanSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = isMobile ? 250 : 350;
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    updateScrollPosition();
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = isMobile ? 250 : 350;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    updateScrollPosition();
  };

  const updateScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    setScrollPosition(container.scrollLeft);
  };

  const isScrolledToStart = scrollPosition <= 0;
  const isScrolledToEnd = scrollContainerRef.current
    ? scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth <=
      scrollPosition + 5
    : false;

  return (
    <div className="relative">
      {/* Desktop Navigation Buttons */}
      <div className="hidden sm:block">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          disabled={isScrolledToStart}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border-slate-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollRight}
          disabled={isScrolledToEnd}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border-slate-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="w-full pb-4" onScroll={updateScrollPosition}>
        <div className="flex space-x-4 pb-4" ref={scrollContainerRef}>
          {plans.map((plan, index) => (
            <PaymentPlanCard
              key={index}
              offers={plan}
              compound={compound}
              isActive={index === 0}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Mobile Pagination Dots */}
      <div className="flex justify-center mt-4 sm:hidden">
        <div className="flex space-x-2">
          {plans.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === Math.floor(scrollPosition / 250)
                  ? "w-6 bg-[#05596B]"
                  : "w-2 bg-[#05596B]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
