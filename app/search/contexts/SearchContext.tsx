/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import SearchApi, {
  type EntityType,
  type SearchFilters,
} from "@/app/api/SearchApi";
// import { debounce } from "@/lib/debounce";
import { useRouter } from "next/navigation";

interface SearchContextType {
  // Search state
  entityType: EntityType;
  filters: SearchFilters;
  results: any[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  totalPages: number;
  query: string; // Add query to the context

  // Filter options
  areas: { id: string; name: string; slug: string }[];
  developers: { id: string; name: string; slug: string }[];
  propertyTypes: string[];
  finishingTypes: string[];

  // Actions
  setEntityType: (type: EntityType) => void;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  search: () => Promise<void>;
  setQuery: (query: string) => void; // Add setQuery to the context
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const propertyTypes = [
  "Apartment",
  "Villa",
  "Twinhouse",
  "Townhouse",
  "Duplex",
  "Penthouse",
  "Chalet",
  "Studio",
  "Cabin",
  "Clinic",
  "Office",
];

const finishingTypes = [
  "Not Finished",
  "Semi Finished",
  "Finished",
  "Furnished",
];

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [query, setQuery] = useState<string>(""); // Add query state
  const [entityType, setEntityType] = useState<EntityType>("compounds");
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    pageSize: 10,
    areas: [],
    developers: [],
    propertyTypes: [],
    bedrooms: [],
    bathrooms: [],
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Filter options
  const [areas, setAreas] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [developers, setDevelopers] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  // const [setShouldUpdateUrl] = useState<boolean>(false);

  // Initialize filters from URL params on first load only
  useEffect(() => {
    const type = searchParams.get("type") as EntityType;
    if (
      type &&
      ["compounds", "developers", "properties", "areas"].includes(type)
    ) {
      setEntityType(type);
    }

    const newFilters: SearchFilters = {
      query: searchParams.get("query") || undefined,
      page: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      sort: searchParams.get("sort") || undefined,
      areas: searchParams.getAll("area"),
      developers: searchParams.getAll("developer"),
      propertyTypes: searchParams.getAll("propertyType"),
      bedrooms: searchParams.getAll("bedroom").map(Number).filter(Boolean),
      bathrooms: searchParams.getAll("bathroom").map(Number).filter(Boolean),
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      minArea: searchParams.get("minArea")
        ? Number(searchParams.get("minArea"))
        : undefined,
      maxArea: searchParams.get("maxArea")
        ? Number(searchParams.get("maxArea"))
        : undefined,
      finishing: searchParams.getAll("finishing"),
      isNewLaunch:
        searchParams.get("isNewLaunch") === "true" ? true : undefined,
      isTrendingProject:
        searchParams.get("isTrendingProject") === "true" ? true : undefined,
      isRecommended:
        searchParams.get("isRecommended") === "true" ? true : undefined,
      hasOffers: searchParams.get("hasOffers") === "true" ? true : undefined,
      isSoldout: searchParams.get("isSoldout") === "true" ? true : undefined,
      isReadyToMove:
        searchParams.get("isReadyToMove") === "true" ? true : undefined,
    };

    setFilters(newFilters);
    setShouldSearch(true);
    // Only run this effect once on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await SearchApi.getFilterOptions();
        setAreas(options.areas);
        setDevelopers(options.developers);
      } catch (err) {
        console.error("Failed to load filter options:", err);
      }
    };

    loadFilterOptions();
  }, []);

  // Search function
  const search = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await SearchApi.search(entityType, filters);

      setResults(response.data);
      setTotalResults(response.meta.pagination.total);
      setTotalPages(response.meta.pagination.pageCount);

      // Enable URL updates after the first search
      // setShouldUpdateUrl(true);
    } catch (err: any) {
      setError(err.message || "Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, [entityType, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    // Reset to page 1 if changing filters other than page
    const shouldResetPage =
      newFilters.page === undefined && Object.keys(newFilters).length > 0;

    setFilters((prev) => ({
      ...prev,
      ...(shouldResetPage ? { page: 1 } : {}),
      ...newFilters,
    }));

    setShouldSearch(true);
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      query: undefined,
      page: 1,
      pageSize: 10,
      areas: [],
      developers: [],
      propertyTypes: [],
      bedrooms: [],
      bathrooms: [],
    });
    setQuery("");
    router.push("/search", { scroll: false });
    setShouldSearch(true);
  }, [router]);

  // Auto-search when filters or entity type changes
  useEffect(() => {
    if (shouldSearch) {
      search();
      setShouldSearch(false);
    }
  }, [shouldSearch, search]);

  // When entity type changes, trigger a search
  useEffect(() => {
    setShouldSearch(true);
  }, [entityType]);

  const value = useMemo(
    () => ({
      entityType,
      filters,
      results,
      loading,
      error,
      totalResults,
      totalPages,
      areas,
      developers,
      propertyTypes,
      finishingTypes,
      query,
      setQuery,
      setEntityType,
      updateFilters,
      resetFilters,
      search,
    }),
    [
      entityType,
      filters,
      results,
      loading,
      error,
      totalResults,
      totalPages,
      areas,
      developers,
      query,
      setEntityType,
      updateFilters,
      resetFilters,
      search,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
