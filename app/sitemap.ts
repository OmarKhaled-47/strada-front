/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from "next";

// Fetch areas from Strapi
async function getAreas() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/areas?populate=*`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching areas for sitemap:", error);
    return [];
  }
}

// Fetch compounds from Strapi
async function getCompounds() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/compounds?populate=*`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching compounds for sitemap:", error);
    return [];
  }
}

// Fetch properties from Strapi
async function getProperties() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/properties?populate=*`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching properties for sitemap:", error);
    return [];
  }
}

// Fetch developers from Strapi
async function getDevelopers() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/developers?populate=*`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching developers for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://strada-properties.com";

  // Get dynamic data
  const [areas, compounds, properties, developers] = await Promise.all([
    getAreas(),
    getCompounds(),
    getProperties(),
    getDevelopers(),
  ]);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/new-launches`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Area pages
  const areaPages = areas.map((area: any) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified: new Date(area.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    // Optional: Add images for Google Image Sitemap
    images: area.images?.data?.map((image: any) => ({
      url: image.url,
      title: area.name,
    })),
  }));

  // Compound pages
  const compoundPages = compounds.map((compound: any) => ({
    url: `${baseUrl}/compounds/${compound.slug}`,
    lastModified: new Date(compound.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    // Optional: Add images for Google Image Sitemap
    images: compound.images?.data?.map((image: any) => ({
      url: image.url,
      title: compound.name,
    })),
  }));

  // Property pages
  const propertyPages = properties.map((property: any) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    // Optional: Add images for Google Image Sitemap
    images: property.images?.data?.map((image: any) => ({
      url: image.url,
      title: property.title,
    })),
  }));

  // Developer pages
  const developerPages = developers.map((developer: any) => ({
    url: `${baseUrl}/developers/${developer.slug}`,
    lastModified: new Date(developer.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    // Optional: Add images for Google Image Sitemap
    images: developer.logo?.data
      ? [
          {
            url: developer.logo.data.url,
            title: developer.name,
          },
        ]
      : [],
  }));

  return [
    ...staticPages,
    ...areaPages,
    ...compoundPages,
    ...propertyPages,
    ...developerPages,
  ];
}
