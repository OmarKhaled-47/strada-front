"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/app/favorites/contexts/FavoritesContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  id: string;
  slug?: string;
  type: "property" | "compound";
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export function FavoriteButton({
  id,
  slug,
  type,
  className,
  size = "md",
  variant = "default",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);

  const isFav = isFavorite(id, type);

  const sizeClasses = {
    sm: "p-1.5 rounded-full",
    md: "p-2 rounded-full",
    lg: "p-2.5 rounded-full",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const variantClasses = {
    default: isFav
      ? "bg-white/90 text-red-500 hover:bg-white"
      : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white",
    outline: isFav
      ? "border border-red-500 text-red-500 hover:bg-red-50"
      : "border border-gray-300 text-gray-400 hover:text-red-500 hover:border-red-500",
    ghost: isFav
      ? "text-red-500 hover:bg-red-50"
      : "text-gray-400 hover:text-red-500 hover:bg-gray-50",
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite({
          id,
          slug,
          type,
          compoundSlug: undefined,
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={isFav ? `Remove from favorites` : `Add to favorites`}
    >
      <Heart
        className={iconSizes[size]}
        fill={isFav || isHovered ? "currentColor" : "none"}
      />
    </button>
  );
}
