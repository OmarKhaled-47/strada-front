/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SliderNavigation } from "../ui/slider-navigation";
import { SectionHeader } from "../ui/section-header";

interface BaseSliderProps {
  children: ReactNode;
  title: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  loading?: boolean;
  totalItems: number;
  className?: string;
  itemClassName?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function BaseSlider({
  children,
  title,
  description,
  viewAllLink,
  viewAllText,
  loading = false,
  totalItems,
  className,
  itemClassName,
  autoSlide = false,
  autoSlideInterval = 3000,
  breakpoints = { sm: 1, md: 2, lg: 3, xl: 4 },
}: BaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(breakpoints.lg || 3);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(autoSlide);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(breakpoints.sm || 1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(breakpoints.sm || 1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(breakpoints.md || 2);
      } else if (window.innerWidth < 1280) {
        setVisibleItems(breakpoints.lg || 3);
      } else {
        setVisibleItems(breakpoints.xl || breakpoints.lg || 3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  // Auto slide functionality
  const startAutoSlideTimer = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }

    if (autoSlideEnabled && totalItems > visibleItems) {
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= totalItems - visibleItems ? 0 : prevIndex + 1
        );
      }, autoSlideInterval);
    }
  };

  useEffect(() => {
    startAutoSlideTimer();
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [
    currentIndex,
    autoSlideEnabled,
    totalItems,
    visibleItems,
    autoSlideInterval,
  ]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalItems - visibleItems ? 0 : prevIndex + 1
    );
    startAutoSlideTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, totalItems - visibleItems) : prevIndex - 1
    );
    startAutoSlideTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoSlideTimer();
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#05596B]"></div>
      </div>
    );
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <SectionHeader
        title={title}
        description={description}
        viewAllLink={viewAllLink}
        viewAllText={viewAllText}
      />

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setAutoSlideEnabled(false)}
        onMouseLeave={() => setAutoSlideEnabled(autoSlide)}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div
                key={index}
                className={cn("px-2", itemClassName)}
                style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}
              >
                {child}
              </div>
            ))
          ) : (
            <div
              className={cn("px-2", itemClassName)}
              style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {totalItems > visibleItems && (
        <SliderNavigation
          currentIndex={currentIndex}
          totalItems={totalItems}
          visibleItems={visibleItems}
          onPrevious={prevSlide}
          onNext={nextSlide}
          onGoToSlide={goToSlide}
        />
      )}
    </div>
  );
}
