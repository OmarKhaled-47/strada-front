/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Icons
import {
  MapPin,
  Building,
  Home,
  Calendar,
  Info,
  Sparkles,
  Phone,
  ArrowRight,
  Bath,
  Bed,
  Maximize2,
  Tag,
} from "lucide-react";

// Custom Components
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
import { HeroCarousel } from "@/app/compounds/_components/HeroCarousel";
import { MapDrawer } from "@/app/compounds/_components/MapDrawer";
import { AmenitiesList } from "@/app/compounds/_components/AmenitiesList";
import { CallButton } from "@/components/CallButton";
import { RequestMeetingForm } from "@/app/_components/RequestMeetingForm";
import ContactForm from "@/app/_components/Form";
import RichTextRenderer from "@/app/_components/RichTextRenderer";
import { SuggestedProperties } from "../_components/SuggestedProperties";
import { FloorPlanDrawer } from "../_components/FloorPlanDrawer";

// API
import GetPropertyApi from "@/app/api/PropertyApi";

export const metadata: Metadata = {
  title: "Property Listings | Homes, Apartments, and Commercial Properties",
  description:
    "Browse our extensive collection of properties for sale and rent. Find homes, apartments, and commercial properties in prime locations.",
  alternates: {
    canonical: "/properties",
  },
  openGraph: {
    title: "Property Listings | Homes, Apartments, and Commercial Properties",
    description:
      "Browse our extensive collection of properties for sale and rent. Find homes, apartments, and commercial properties in prime locations.",
    url: "/properties",
  },
};

async function getPropertyDetails(slug: string) {
  try {
    const response = await GetPropertyApi.getPropertyBySlug(slug);
    return response.data.data[0];
  } catch (error) {
    console.error("Failed to fetch property details:", error);
    return null;
  }
}

async function getSimilarProperties(
  areaSlug: string,
  currentPropertySlug: string
) {
  try {
    const response = await GetPropertyApi.getPropertiesByArea(areaSlug);

    return response.data.data.filter(
      (property: any) => property.slug !== currentPropertySlug
    );
  } catch (error) {
    console.error("Failed to fetch similar properties:", error);
    return [];
  }
}

export default async function PropertyDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const property = await getPropertyDetails(slug);

  if (!property) {
    notFound();
  }

  // Get the area slug from the compound
  const areaSlug = property.compound?.area?.slug;

  // Fetch similar properties in the same area
  const similarProperties = areaSlug
    ? await getSimilarProperties(areaSlug, slug)
    : [];

  // Prepare carousel slides
  const carouselSlides = [];

  // Add gallery images if they exist
  if (
    property.imageGallery &&
    Array.isArray(property.imageGallery) &&
    property.imageGallery.length > 0
  ) {
    property.imageGallery.forEach((image: { url: string }) => {
      if (image?.url) {
        carouselSlides.push({
          title: property.name,
          button: "View Details",
          src: image.url,
        });
      }
    });
  }

  // If no gallery images, add banner if it exists
  if (carouselSlides.length === 0 && property.banner?.url) {
    carouselSlides.push({
      title: property.name,
      button: "View Details",
      src: property.banner.url,
    });
  }

  // If no gallery images or banner, add placeholder
  if (carouselSlides.length === 0) {
    carouselSlides.push({
      title: property.name,
      button: "View Details",
      src: "/placeholder.svg?height=800&width=1600",
    });
  }

  // Format price with commas
  const formatPrice = (price: number) => {
    if (!price) return "Price on Request";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8]">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[65vh] relative">
          <HeroCarousel slides={carouselSlides} className="rounded-none" />
        </div>
      </section>

      {/* Quick Actions Bar - Mobile Only */}
      <div className="lg:hidden sticky top-16 z-50 bg-white shadow-md py-3 px-4 mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#05596B]/10 flex items-center justify-center">
              <Home className="h-4 w-4 text-[#05596B]" />
            </div>
            <div className="truncate">
              <h2 className="text-sm font-bold text-[#013344] truncate max-w-[150px]">
                {property.name}
              </h2>
              <p className="text-xs text-[#05596B] flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[120px]">
                  {property.compound?.area?.name || "Location not specified"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <CallButton
              phoneNumber="+0201123960001"
              variant="default"
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Property Info Section - Sticky on Desktop */}
      <div className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href={`/developers/${property.compound?.developer?.slug || ""}`}
                className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#05596B]/20 transition-transform duration-300 hover:scale-105 flex-shrink-0 bg-[#05596B]/5"
              >
                {property.compound?.developer?.logo?.url ? (
                  <Image
                    src={
                      property.compound.developer.logo.url || "/placeholder.svg"
                    }
                    alt={property.compound.developer.name || "Developer"}
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-[#05596B]" />
                  </div>
                )}
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#013344] flex items-center gap-2">
                  {property.name}
                  <Badge className="bg-[#05596B] text-white text-xs">
                    {property.propertyType || "Property"}
                  </Badge>
                  {property.isSoldout && (
                    <Badge className="bg-red-500 text-white text-xs">
                      Sold Out
                    </Badge>
                  )}
                  {property.isRecommended && (
                    <Badge className="bg-orange-500 text-white text-xs">
                      Recommended
                    </Badge>
                  )}
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#05596B]">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {property.compound?.area?.name || "Location not specified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-[#05596B]">Price</p>
                {property.startPrice ? (
                  <p className="text-lg font-bold text-[#013344]">
                    {formatPrice(property.startPrice)}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#013344]">
                    Price on Request
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <CallButton phoneNumber="+0201123960001" variant="default" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 pb-20">
        {/* Property Header - Mobile */}
        <div className="lg:hidden relative z-30">
          <Card className="overflow-hidden border-0 shadow-lg mb-4">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/developers/${property.compound?.developer?.slug || ""}`}
                      className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#05596B]/20 transition-transform duration-300 hover:scale-105 flex-shrink-0 bg-[#05596B]/5"
                    >
                      {property.compound?.developer?.logo?.url ? (
                        <Image
                          src={
                            property.compound.developer.logo.url ||
                            "/placeholder.svg"
                          }
                          alt={property.compound.developer.name || "Developer"}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Building className="h-6 w-6 text-[#05596B]" />
                        </div>
                      )}
                    </Link>
                    <div>
                      <h1 className="text-lg font-bold text-[#013344]">
                        {property.name}
                      </h1>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge className="bg-[#05596B] text-white text-xs">
                          {property.propertyType || "Property"}
                        </Badge>
                        {property.isSoldout && (
                          <Badge className="bg-red-500 text-white text-xs">
                            Sold Out
                          </Badge>
                        )}
                        {property.isRecommended && (
                          <Badge className="bg-orange-500 text-white text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#05596B]">Price</p>
                    {property.startPrice ? (
                      <p className="text-lg font-bold text-[#013344]">
                        {formatPrice(property.startPrice)}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-[#013344]">
                        Price on Request
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {property.floorPlanImage && (
                    <FloorPlanDrawer
                      floorPlanImage={property.floorPlanImage.url}
                      propertyName={property.name}
                    />
                  )}
                  {property.locationOnMap && (
                    <MapDrawer
                      locationOnMap={property.locationOnMap}
                      compoundName={property.name}
                      areaName={property.compound?.area?.name}
                    />
                  )}
                  <RequestMeetingForm />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breadcrumb */}
        <div className="my-5 bg-[#05596B] hover:bg-[#3f91ac] px-4 sm:px-6 py-1 rounded-md transition-colors duration-30">
          <BreadcrumbCustom
            items={[
              { title: "Home", href: "/" },
              { title: "Properties", href: "/properties" },
              {
                title: property.compound?.name || "Compound",
                href: `/compounds/${property.compound?.slug || ""}`,
              },
              { title: property.name },
            ]}
          />
        </div>

        {/* Quick Stats - Desktop */}
        <div className="hidden lg:flex mb-8 gap-4">
          {property.floorPlanImage && (
            <FloorPlanDrawer
              floorPlanImage={property.floorPlanImage.url}
              propertyName={property.name}
            />
          )}
          {property.locationOnMap && (
            <MapDrawer
              locationOnMap={property.locationOnMap}
              compoundName={property.name}
              areaName={property.compound?.area?.name}
            />
          )}
          <RequestMeetingForm />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <Card className="mb-6 border-0 shadow-sm">
                <ScrollArea className="w-full">
                  <TabsList className="w-full justify-start p-1">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center gap-2"
                    >
                      <Info className="h-4 w-4" />
                      <span>Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="amenities"
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Amenities</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="floor-plan"
                      className="flex items-center gap-2"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span>Floor Plan</span>
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </Card>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 mt-0">
                {/* Key Information */}
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      About {property.name}
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Bed className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Bedrooms</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.bedrooms || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Bath className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Bathrooms</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.bathrooms || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Maximize2 className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Area</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.squareMeters
                            ? `${property.squareMeters} m²`
                            : "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Tag className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Finishing</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.finishing || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Calendar className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Delivery</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.deliveryIn || "Contact for details"}
                        </p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Building className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Developer</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.compound?.developer?.name || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <MapPin className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Location</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.compound?.area?.name || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Home className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Type</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {property.propertyType || "Residential"}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-6 bg-[#05596B]/10" />

                    {/* Description */}
                    <div className="prose prose-sm sm:prose-base text-[#05596B] max-w-none">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#013344] mb-4">
                        About {property.name}
                      </h3>

                      <ScrollArea className="h-auto">
                        {property.description ? (
                          <div className="prose prose-lg text-[#05596B] max-w-none">
                            <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                              <RichTextRenderer
                                content={property.description}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-[#05596B]/70">
                            <p>No description available for this property.</p>
                          </div>
                        )}
                        <ScrollBar />
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                {/* Similar Properties Preview */}
                {similarProperties.length > 0 && (
                  <Card className="border-0 shadow-md overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <SuggestedProperties
                        properties={similarProperties}
                        title={`Similar Properties in ${property.compound?.area?.name || "This Area"}`}
                        subtitle="Discover more properties that match your interests"
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Amenities Tab */}
              <TabsContent value="amenities" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Amenities & Features
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {property.amenities && property.amenities.length > 0 ? (
                      <AmenitiesList amenities={property.amenities} />
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>
                          No amenities information available for this property.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Floor Plan Tab */}
              <TabsContent value="floor-plan" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <Maximize2 className="h-5 w-5" />
                      Floor Plan
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {property.floorPlanImage ? (
                      <div className="flex flex-col items-center">
                        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={
                              property.floorPlanImage.url || "/placeholder.svg"
                            }
                            alt={`Floor plan for ${property.name}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <FloorPlanDrawer
                          floorPlanImage={property.floorPlanImage.url}
                          propertyName={property.name}
                        />
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>Floor plan not available for this property.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">
              {/* Contact Form */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader className="bg-[#05596B] text-white p-4">
                  <h3 className="text-lg font-bold">
                    Interested in {property.name}?
                  </h3>
                  <p className="text-sm text-white/80">
                    Fill out the form below and we&apos;ll get back to you
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <ContactForm />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader className="p-4">
                  <h3 className="text-lg font-bold text-[#013344] flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#05596B]" />
                    <span>Schedule a Visit</span>
                  </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-[#05596B] mb-4">
                    Book a site visit to explore {property.name} in person.
                  </p>
                  <RequestMeetingForm />
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-br from-[#05596B] to-[#013344] text-white">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Need More Information?</span>
                  </h3>
                  <p className="text-sm mb-4">
                    Our experts are ready to assist you with any questions about{" "}
                    {property.name}.
                  </p>
                  <CallButton
                    phoneNumber="+0201123960001"
                    variant="default"
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Developer Info */}
              {property.compound?.developer && (
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="p-4">
                    <h3 className="text-lg font-bold text-[#013344] flex items-center gap-2">
                      <Building className="h-4 w-4 text-[#05596B]" />
                      <span>About the Developer</span>
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#05596B]/20 bg-[#05596B]/5">
                        {property.compound.developer?.logo?.url ? (
                          <Image
                            src={
                              property.compound.developer.logo.url ||
                              "/placeholder.svg"
                            }
                            alt={
                              property.compound.developer.name || "Developer"
                            }
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Building className="h-6 w-6 text-[#05596B]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[#013344]">
                          {property.compound.developer.name || "Developer"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/developers/${property.compound.developer.slug || ""}`}
                      className="text-[#05596B] text-sm flex items-center hover:underline"
                    >
                      View all properties by this developer
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Property Details Summary */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader className="p-4">
                  <h3 className="text-lg font-bold text-[#013344] flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#05596B]" />
                    <span>Property Summary</span>
                  </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Property Type:</span>
                      <span className="font-medium text-[#013344]">
                        {property.propertyType || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Bedrooms:</span>
                      <span className="font-medium text-[#013344]">
                        {property.bedrooms || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Bathrooms:</span>
                      <span className="font-medium text-[#013344]">
                        {property.bathrooms || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Area:</span>
                      <span className="font-medium text-[#013344]">
                        {property.squareMeters
                          ? `${property.squareMeters} m²`
                          : "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Finishing:</span>
                      <span className="font-medium text-[#013344]">
                        {property.finishing || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#05596B]">Delivery Date:</span>
                      <span className="font-medium text-[#013344]">
                        {property.deliveryIn || "N/A"}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
