/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { debounce } from "@/lib/debounce";
import Link from "next/link";
import Image from "next/image";

interface SearchAreaProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  areas: any[];
}

export function SearchArea({
  onSearch,
  searchQuery,
  setSearchQuery,
  areas,
}: SearchAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when search query changes
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = areas
      .filter(
        (area) =>
          area.name.toLowerCase().includes(lowercaseQuery) ||
          (area.description &&
            area.description.toLowerCase().includes(lowercaseQuery))
      )
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filtered);
  }, [searchQuery, areas]);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (area: any) => {
    setSearchQuery(area.name);
    setSuggestions([]);
    setIsFocused(false);
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-sm p-1 rounded-lg flex flex-col sm:flex-row gap-2 max-w-xl"
      >
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Search destinations..."
            className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/70 h-12 focus-visible:ring-white/30"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="bg-white text-[#013344] hover:bg-white/90 h-12 px-6"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-w-xl"
        >
          <ul className="py-1">
            {suggestions.map((area) => (
              <li key={area.id}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(area)}
                >
                  <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3">
                    <Image
                      src={
                        area.banner?.url ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={area.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-[#013344]">
                      {area.name}
                    </div>
                    {area.compounds && (
                      <div className="text-xs text-gray-500">
                        {area.compounds.count} Compounds
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 px-4 py-2">
              <button
                onClick={() => {
                  onSearch(searchQuery);
                  setIsFocused(false);
                }}
                className="text-sm text-[#05596B] hover:text-[#013344] flex items-center w-full"
              >
                <Search className="h-3 w-3 mr-1" />
                `Search for {searchQuery}`
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
