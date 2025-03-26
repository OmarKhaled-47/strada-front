"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CallButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "rounded" | "floating";
  showText?: boolean;
}

export function CallButton({
  phoneNumber,
  className,
  variant = "default",
}: CallButtonProps) {
  const [, setIsHovered] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleCall}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#05596B] p-4 text-white shadow-lg transition-all hover:bg-[#05596B]/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#05596B] focus:ring-offset-2",
          "group hover:pr-8",
          className
        )}
      >
        <Phone className="h-6 w-6 transition-transform group-hover:scale-110" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-xs">
          Call Now
        </span>
      </button>
    );
  }

  if (variant === "rounded") {
    return (
      <Button
        variant="default"
        className={cn(
          "relative h-12 w-12 rounded-full bg-gradient-to-r from-[#05596B] to-[#028180] p-0 text-white shadow-lg transition-all hover:from-[#028180] hover:to-[#05596B] hover:shadow-xl",
          className
        )}
        onClick={handleCall}
      >
        <Phone className="h-5 w-5 transition-transform hover:scale-110" />
        <span className="sr-only">Call {phoneNumber}</span>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      className={cn(
        "group relative overflow-hidden",
        variant === "default" && "bg-[#05596B] hover:bg-[#028180] text-white",
        variant === "outline" &&
          "border-[#05596B] text-[#05596B] hover:bg-[#05596B]/10",
        variant === "secondary" &&
          "bg-[#F7F8F8] text-[#05596B] hover:bg-[#F7F8F8]/80",
        className
      )}
      onClick={handleCall}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center gap-2 w-full transition-transform duration-300">
        <Phone className="h-4 w-4" />
        <span>Call Now</span>
      </div>
    </Button>
  );
}
