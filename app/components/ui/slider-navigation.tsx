"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SliderNavigationProps {
  currentIndex: number
  totalItems: number
  visibleItems: number
  onPrevious: () => void
  onNext: () => void
  onGoToSlide?: (index: number) => void
  className?: string
}

export function SliderNavigation({
  currentIndex,
  totalItems,
  visibleItems,
  onPrevious,
  onNext,
  onGoToSlide,
  className,
}: SliderNavigationProps) {
  const canGoNext = currentIndex + visibleItems < totalItems
  const canGoPrev = currentIndex > 0
  const totalPages = Math.ceil(totalItems / visibleItems)

  return (
    <div className={cn("flex justify-center gap-4 mt-4 sm:mt-6", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrev}
        className={cn(
          "rounded-full border-[#05596B]/20 text-[#05596B] shadow-sm hover:bg-[#05596B]/5 hover:text-[#05596B] hover:border-[#05596B]/30",
          !canGoPrev && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Pagination dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide?.(index * visibleItems)}
            className={`h-2 rounded-full transition-all ${
              Math.floor(currentIndex / visibleItems) === index ? "w-6 bg-[#05596B]" : "w-2 bg-[#05596B]/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "rounded-full border-[#05596B]/20 text-[#05596B] shadow-sm hover:bg-[#05596B]/5 hover:text-[#05596B] hover:border-[#05596B]/30",
          !canGoNext && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  )
}

