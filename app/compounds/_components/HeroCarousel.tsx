"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Slide {
  title: string;
  button: string;
  src: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  className?: string;
  showArrows?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function HeroCarousel({
  slides,
  className,
  showArrows = true,
  showIndicators = true,
  autoPlay = true,
  interval = 5000,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToNext = useCallback(() => {
    if (isAnimating || slides.length <= 1) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide, isAnimating, slides.length]);

  const goToPrevious = useCallback(() => {
    if (isAnimating || slides.length <= 1) return;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide, isAnimating, slides.length]);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || isPaused) return;

    const autoPlayInterval = setInterval(goToNext, interval);
    return () => clearInterval(autoPlayInterval);
  }, [autoPlay, goToNext, interval, isPaused, slides.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const dragDistance = touchEndX.current - touchStartX.current;
    const dragThreshold = 50;

    if (dragDistance > dragThreshold) {
      goToPrevious();
    } else if (dragDistance < -dragThreshold) {
      goToNext();
    }

    // Reset touch values
    touchStartX.current = null;
    touchEndX.current = null;

    // Resume autoplay after a short delay
    setTimeout(() => setIsPaused(false), 1000);
  };

  if (!slides || slides.length === 0) {
    return (
      <div
        className={cn(
          "relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-200",
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].src || "/placeholder.svg"}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent opacity-70" />

            {/* Slide Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-20 left-0 right-0 text-center px-4 md:px-8 z-10"
            >
              {/* Content is hidden but structure remains for future use */}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Always visible on mobile */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20",
              "bg-white/90 hover:bg-white text-[#05596B] rounded-full",
              "p-2 sm:p-3 shadow-lg transform hover:scale-110 transition-all",
              isMobile
                ? "opacity-70"
                : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20",
              "bg-white/90 hover:bg-white text-[#05596B] rounded-full",
              "p-2 sm:p-3 shadow-lg transform hover:scale-110 transition-all",
              isMobile
                ? "opacity-70"
                : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center">
          <div className="flex space-x-1 sm:space-x-2 bg-black/20 px-2 sm:px-4 py-1 sm:py-2 rounded-full backdrop-blur-sm">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={cn(
                  "transition-all duration-300",
                  currentIndex === index
                    ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white rounded-full"
                    : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80 rounded-full"
                )}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
