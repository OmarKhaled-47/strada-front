/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, MapPin, Building, Home } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/search/contexts/SearchContext";
import Image from "next/image";
import axiosClient from "@/app/api/axiosClient";
import qs from "qs";

interface SearchResult {
  id: string;
  type: "area" | "compound" | "property" | "developer";
  name: string;
  slug: string;
  image?: string;
  description?: string;
  location?: string;
}

export function EnhancedSearchBar() {
  const {
    updateFilters,
    setEntityType,
    query, // Get query from context
    setQuery, // Get setQuery from context
  } = useSearch();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  // Handle outside clicks to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        // Fetch areas, compounds, properties, and developers in parallel
        const [
          areasResponse,
          compoundsResponse,
          propertiesResponse,
          developersResponse,
        ] = await Promise.all([
          fetchAreas(debouncedQuery),
          fetchCompounds(debouncedQuery),
          fetchProperties(debouncedQuery),
          fetchDevelopers(debouncedQuery),
        ]);

        // Combine and format results
        const combinedResults: SearchResult[] = [
          ...areasResponse.map((area: any) => ({
            id: area.id,
            type: "area" as const,
            name: area.name,
            slug: area.slug,
            image: area.banner?.url,
            location: area.location || "Egypt",
          })),
          ...compoundsResponse.map((compound: any) => ({
            id: compound.id,
            type: "compound" as const,
            name: compound.name,
            slug: compound.slug,
            image: compound.banner?.url,
            location: compound.area?.name || "Unknown Location",
          })),
          ...propertiesResponse.map((property: any) => ({
            id: property.id,
            type: "property" as const,
            name: property.name,
            slug: property.slug,
            image: property.banner?.url,
            location: property.compound?.area?.name || "Unknown Location",
          })),
          ...developersResponse.map((developer: any) => ({
            id: developer.id,
            type: "developer" as const,
            name: developer.name,
            slug: developer.slug,
            image: developer.logo?.url,
            description: developer.description || "Real Estate Developer",
          })),
        ];

        // Limit to 10 results total
        setResults(combinedResults.slice(0, 10));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    updateFilters({ query });
    setIsFocused(false);

    // Navigate to search page with the query
    router.push(`/search?type=compounds&query=${encodeURIComponent(query)}`);
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    setQuery(result.name); // Update query in context
    setIsFocused(false);

    // Navigate based on result type
    switch (result.type) {
      case "area":
        setEntityType("areas");
        updateFilters({ areas: [result.slug], query: "" });
        router.push(`/areas/${result.slug}`);
        break;
      case "compound":
        setEntityType("compounds");
        updateFilters({ query: result.name });
        router.push(`/compounds/${result.slug}`);
        break;
      case "property":
        setEntityType("properties");
        updateFilters({ query: result.name });
        router.push(`/properties/${result.slug}`);
        break;
      case "developer":
        setEntityType("developers");
        updateFilters({ developers: [result.slug], query: "" });
        router.push(`/developers/${result.slug}`);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        // Fetch areas, compounds, properties, and developers in parallel
        const [
          areasResponse,
          compoundsResponse,
          propertiesResponse,
          developersResponse,
        ] = await Promise.all([
          fetchAreas(debouncedQuery),
          fetchCompounds(debouncedQuery),
          fetchProperties(debouncedQuery),
          fetchDevelopers(debouncedQuery),
        ]);

        // Combine and format results
        const combinedResults: SearchResult[] = [
          ...areasResponse.map(
            (area: {
              id: any;
              name: any;
              slug: any;
              banner: { url: any };
              location: any;
            }) => ({
              id: area.id,
              type: "area" as const,
              name: area.name,
              slug: area.slug,
              image: area.banner?.url,
              location: area.location || "Egypt",
            })
          ),
          ...compoundsResponse.map(
            (compound: {
              id: any;
              name: any;
              slug: any;
              banner: { url: any };
              area: { name: any };
            }) => ({
              id: compound.id,
              type: "compound" as const,
              name: compound.name,
              slug: compound.slug,
              image: compound.banner?.url,
              location: compound.area?.name || "Unknown Location",
            })
          ),
          ...propertiesResponse.map(
            (property: {
              id: any;
              name: any;
              slug: any;
              banner: { url: any };
              compound: { area: { name: any } };
            }) => ({
              id: property.id,
              type: "property" as const,
              name: property.name,
              slug: property.slug,
              image: property.banner?.url,
              location: property.compound?.area?.name || "Unknown Location",
            })
          ),
          ...developersResponse.map(
            (developer: {
              id: string;
              name: string;
              slug: string;
              logo: { url: string };
              description: [];
            }) => ({
              id: developer.id,
              type: "developer" as const,
              name: developer.name,
              slug: developer.slug,
              image: developer.logo?.url,
              description: developer.description || "Real Estate Developer",
            })
          ),
        ];

        // Limit to 10 results total
        setResults(combinedResults.slice(0, 10));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Fetch areas from API
  const fetchAreas = async (query: string) => {
    const queryParams = qs.stringify(
      {
        filters: {
          name: {
            $containsi: query,
          },
        },
        populate: ["banner"],
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await axiosClient.get(`/areas?${queryParams}`);
    return response.data.data || [];
  };

  // Fetch compounds from API
  const fetchCompounds = async (query: string) => {
    const queryParams = qs.stringify(
      {
        filters: {
          name: {
            $containsi: query,
          },
        },
        populate: ["banner", "area"],
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await axiosClient.get(`/compounds?${queryParams}`);
    return response.data.data || [];
  };

  // Fetch properties from API
  const fetchProperties = async (query: string) => {
    const queryParams = qs.stringify(
      {
        filters: {
          name: {
            $containsi: query,
          },
        },
        populate: ["banner", "compound.area"],
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await axiosClient.get(`/properties?${queryParams}`);
    return response.data.data || [];
  };

  // Fetch developers from API
  const fetchDevelopers = async (query: string) => {
    const queryParams = qs.stringify(
      {
        filters: {
          name: {
            $containsi: query,
          },
        },
        populate: ["logo"],
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await axiosClient.get(`/developers?${queryParams}`);
    return response.data.data || [];
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "area":
        return <MapPin className="h-4 w-4 text-[#05596B]" />;
      case "compound":
        return <Building className="h-4 w-4 text-[#028180]" />;
      case "property":
        return <Home className="h-4 w-4 text-[#E3A325]" />;
      case "developer":
        return <Building className="h-4 w-4 text-[#CBBBAC]" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search properties, compounds, developers, or areas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-5 pr-10 py-2 h-12 border-[#CBBBAC] focus:border-[#05596B]"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <Button
          type="submit"
          size="sm"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>

      <AnimatePresence>
        {isFocused && (results.length > 0 || isLoading) && (
          <motion.div
            ref={resultsRef}
            className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-[#CBBBAC]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <div className="p-4 text-center text-sm text-gray-500">
                Loading results...
              </div>
            ) : (
              <ul className="max-h-60 overflow-auto py-2">
                {results.map((result) => (
                  <motion.li
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-[#F7F8F8] flex items-center gap-3"
                      onClick={() => handleResultClick(result)}
                    >
                      {result.image ? (
                        <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              result.image ||
                              "/placeholder.svg?height=50&width=50" ||
                              "/placeholder.svg"
                            }
                            alt={result.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-[#F7F8F8] flex items-center justify-center flex-shrink-0">
                          {getIconForType(result.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#013344] truncate">
                            {result.name}
                          </span>
                          <span className="text-xs px-1.5 py-0.5 bg-[#F7F8F8] text-[#013344] rounded capitalize">
                            {result.type}
                          </span>
                        </div>
                        {result.location && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{result.location}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
