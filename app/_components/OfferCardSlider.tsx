/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { OfferCard } from "./OfferCard";

interface OfferCardSliderProps {
  offers: any[];
  compound?: any;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function OfferCardSlider({
  offers,
  compound,
  autoplay = true,
  autoplayInterval = 5000,
}: OfferCardSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1023px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate item width and container width on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setContainerWidth(container.clientWidth);

        // Get the first item's width
        if (container.children.length > 0) {
          const firstItem = container.children[0] as HTMLElement;
          setItemWidth(firstItem.offsetWidth + 16); // 16px for margin-right
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && offers.length > 1) {
      const startAutoplay = () => {
        autoplayTimerRef.current = setInterval(() => {
          scrollToNext();
        }, autoplayInterval);
      };

      startAutoplay();

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }
  }, [autoplay, autoplayInterval, offers.length, activeIndex]);

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay && offers.length > 1) {
      pauseAutoplay();
      autoplayTimerRef.current = setInterval(() => {
        scrollToNext();
      }, autoplayInterval);
    }
  };

  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;

    const nextIndex = (activeIndex + 1) % offers.length;
    scrollToIndex(nextIndex);
  };

  const scrollToPrev = () => {
    if (!scrollContainerRef.current) return;

    const prevIndex = (activeIndex - 1 + offers.length) % offers.length;
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = index * itemWidth;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || itemWidth === 0) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    setScrollPosition(scrollLeft);

    // Calculate the active index based on scroll position
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const isScrolledToStart = scrollPosition <= 10;
  const isScrolledToEnd = scrollContainerRef.current
    ? scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth <=
      scrollPosition + 10
    : false;

  // Calculate visible items based on screen size
  const getVisibleItems = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return (
    <div
      className="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onTouchStart={pauseAutoplay}
      onTouchEnd={resumeAutoplay}
    >
      {/* Desktop Navigation Buttons */}
      {offers.length > getVisibleItems() && (
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToPrev}
            disabled={isScrolledToStart && !autoplay}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 shadow-md border-slate-200 hover:bg-white"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToNext}
            disabled={isScrolledToEnd && !autoplay}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 shadow-md border-slate-200 hover:bg-white"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <ScrollArea className="w-full pb-4" onScroll={handleScroll}>
        <div
          className="flex space-x-4 pb-4"
          ref={scrollContainerRef}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="min-w-[250px] xs:min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <OfferCard
                offer={{
                  ...offer,
                  compound: compound
                    ? {
                        name: compound.name,
                        slug: compound.slug,
                        banner: compound.banner,
                      }
                    : offer.compound,
                  developer: compound ? compound.developer : offer.developer,
                }}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Pagination Dots */}
      {offers.length > 1 && (
        <div className="flex justify-center mt-2 md:mt-4">
          <div className="flex space-x-1.5">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-4 md:w-6 bg-[#05596B]"
                    : "w-1.5 md:w-2 bg-[#05596B]/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
