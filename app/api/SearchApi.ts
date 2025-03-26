/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from "./axiosClient";
import qs from "qs";

export type EntityType = "compounds" | "developers" | "properties" | "areas";

export interface SearchFilters {
  // Common filters
  query?: string;
  page?: number;
  pageSize?: number;
  sort?: string;

  // Area filters
  areas?: string[];

  // Compound filters
  compounds?: string[];

  // Developer filters
  developers?: string[];

  // Property filters
  propertyTypes?: string[];
  bedrooms?: number[];
  bathrooms?: number[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  finishing?: string[];

  // Compound filters
  isNewLaunch?: boolean;
  isTrendingProject?: boolean;

  // Special filters
  isRecommended?: boolean;
  hasOffers?: boolean;
  isSoldout?: boolean;
  isReadyToMove?: boolean;
}

export interface SearchResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

const SearchApi = {
  /**
   * Search across all entity types
   */
  search: async <T>(
    entityType: EntityType,
    filters: SearchFilters
  ): Promise<SearchResponse<T>> => {
    try {
      const queryParams = buildSearchQuery(entityType, filters);
      const response = await axiosClient.get(`/${entityType}?${queryParams}`);

      return {
        data: response.data.data || [],
        meta: response.data.meta || {
          pagination: {
            page: 1,
            pageCount: 1,
            pageSize: filters.pageSize || 10,
            total: 0,
          },
        },
      };
    } catch (error) {
      console.error(`Error searching ${entityType}:`, error);
      return {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageCount: 1,
            pageSize: filters.pageSize || 10,
            total: 0,
          },
        },
      };
    }
  },
  /**
   * Get filter options (for populating filter dropdowns)
   */
  getFilterOptions: async () => {
    try {
      const [areasResponse, developersResponse] = await Promise.all([
        axiosClient.get(
          "/areas?fields[0]=name&fields[1]=slug&pagination[pageSize]=100"
        ),
        axiosClient.get(
          "/developers?fields[0]=name&fields[1]=slug&pagination[pageSize]=100"
        ),
      ]);

      return {
        areas: areasResponse.data.data.map((area: any) => ({
          id: area.id,
          name: area.name || "",
          slug: area.slug || "",
        })),
        developers: developersResponse.data.data.map((developer: any) => ({
          id: developer.id,
          name: developer.name || "",
          slug: developer.slug || "",
        })),
      };
    } catch (error) {
      console.error("Error fetching filter options:", error);
      return { areas: [], developers: [] };
    }
  },
};

/**
 * Build search query string based on entity type and filters
 */
function buildSearchQuery(
  entityType: EntityType,
  filters: SearchFilters
): string {
  const queryObj: any = {
    pagination: {
      page: filters.page || 1,
      pageSize: filters.pageSize || 10,
    },
    populate: "*",
  };

  // Add filters
  const filterObj: any = {};

  // Text search across multiple fields
  if (filters.query && filters.query.trim() !== "") {
    filterObj.$or = getSearchFieldsForEntityType(entityType, filters.query);
  }

  // Area filters
  if (filters.areas && filters.areas.length > 0) {
    if (entityType === "properties") {
      filterObj.compound = {
        area: {
          slug: { $in: filters.areas },
        },
      };
    } else if (entityType === "compounds") {
      filterObj.area = {
        slug: { $in: filters.areas },
      };
    } else if (entityType === "developers") {
      filterObj.areas = {
        slug: { $in: filters.areas },
      };
    }
  }

  // Developer filters
  if (filters.developers && filters.developers.length > 0) {
    if (entityType === "properties") {
      filterObj.compound = {
        ...(filterObj.compound || {}),
        developer: {
          slug: { $in: filters.developers },
        },
      };
    } else if (entityType === "compounds") {
      filterObj.developer = {
        slug: { $in: filters.developers },
      };
    }
  }

  // Property type filters
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    if (entityType === "properties") {
      filterObj.propertyType = { $in: filters.propertyTypes };
    } else if (entityType === "compounds") {
      // For compounds, we need to check if they have properties of these types
      filterObj.properties = {
        ...(filterObj.properties || {}),
        propertyType: { $in: filters.propertyTypes },
      };
    }
  }

  // Bedroom filters
  if (filters.bedrooms && filters.bedrooms.length > 0) {
    if (entityType === "properties") {
      filterObj.bedrooms = { $in: filters.bedrooms };
    }
  }

  // Bathroom filters
  if (filters.bathrooms && filters.bathrooms.length > 0) {
    if (entityType === "properties") {
      filterObj.bathrooms = { $in: filters.bathrooms };
    }
  }

  // Price range filters
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const priceFilter: any = {};

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      priceFilter.$gte = filters.minPrice;
    }

    if (filters.maxPrice !== undefined) {
      priceFilter.$lte = filters.maxPrice;
    }

    if (Object.keys(priceFilter).length > 0) {
      if (entityType === "properties" || entityType === "compounds") {
        filterObj.startPrice = priceFilter;
      }
    }
  }

  // Area size filters
  if (filters.minArea !== undefined || filters.maxArea !== undefined) {
    if (entityType === "properties") {
      const areaFilter: any = {};

      if (filters.minArea !== undefined && filters.minArea > 0) {
        areaFilter.$gte = filters.minArea;
      }

      if (filters.maxArea !== undefined) {
        areaFilter.$lte = filters.maxArea;
      }

      if (Object.keys(areaFilter).length > 0) {
        filterObj.squareMeters = areaFilter;
      }
    }
  }

  // Finishing filters
  if (filters.finishing && filters.finishing.length > 0) {
    if (entityType === "properties") {
      filterObj.finishing = { $in: filters.finishing };
    }
  }

  // Special filters
  if (filters.isNewLaunch !== undefined) {
    if (entityType === "compounds") {
      filterObj.isNewLaunch = filters.isNewLaunch;
    }
  }

  if (filters.isTrendingProject !== undefined) {
    if (entityType === "compounds") {
      filterObj.isTrendingProject = filters.isTrendingProject;
    }
  }

  if (filters.isRecommended !== undefined) {
    if (
      entityType === "properties" ||
      entityType === "compounds" ||
      entityType === "areas"
    ) {
      filterObj.isRecommended = filters.isRecommended;
    }
  }

  if (filters.isSoldout !== undefined) {
    if (entityType === "properties") {
      filterObj.isSoldout = filters.isSoldout;
    }
  }

  if (filters.isReadyToMove !== undefined) {
    if (entityType === "properties") {
      filterObj.IsReadyToMove = filters.isReadyToMove;
    }
  }

  // Has offers filter
  if (filters.hasOffers !== undefined && filters.hasOffers) {
    if (entityType === "compounds") {
      filterObj.offer = {
        $null: false,
      };
    }
  }

  // Add filters to query object if there are any
  if (Object.keys(filterObj).length > 0) {
    queryObj.filters = filterObj;
  }

  // Sort options
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        queryObj.sort = ["startPrice:asc"];
        break;
      case "price-desc":
        queryObj.sort = ["startPrice:desc"];
        break;
      case "newest":
        queryObj.sort = ["createdAt:desc"];
        break;
      case "oldest":
        queryObj.sort = ["createdAt:asc"];
        break;
      default:
        queryObj.sort = ["createdAt:desc"]; // Default sort
    }
  } else {
    queryObj.sort = ["createdAt:desc"]; // Default sort
  }

  return qs.stringify(queryObj, { encodeValuesOnly: true });
}

/**
 * Get search fields for each entity type
 */
function getSearchFieldsForEntityType(
  entityType: EntityType,
  query: string
): any[] {
  const searchFields: any[] = [];

  switch (entityType) {
    case "properties":
      searchFields.push(
        { name: { $containsi: query } },
        { description: { $containsi: query } },
        { "compound.name": { $containsi: query } },
        { "compound.area.name": { $containsi: query } },
        { "compound.developer.name": { $containsi: query } }
      );
      break;
    case "compounds":
      searchFields.push(
        { name: { $containsi: query } },
        { description: { $containsi: query } },
        { "area.name": { $containsi: query } },
        { "developer.name": { $containsi: query } }
      );
      break;
    case "developers":
      searchFields.push(
        { name: { $containsi: query } },
        { description: { $containsi: query } }
      );
      break;
    case "areas":
      searchFields.push(
        { name: { $containsi: query } },
        { description: { $containsi: query } }
      );
      break;
  }

  return searchFields;
}

export default SearchApi;
