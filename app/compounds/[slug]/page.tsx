/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  CreditCard,
  Phone,
  MapPinIcon as MapPinHouse,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  Banknote,
  Users,
} from "lucide-react";

// Custom Components
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
import { HeroCarousel } from "../_components/HeroCarousel";
import { MasterPlanDrawer } from "../_components/MasterPlanDrawer";
import { MapDrawer } from "../_components/MapDrawer";
import { OfferCardSlider } from "@/app/_components/OfferCardSlider";
import { PaymentPlanSlider } from "../_components/PaymentPlanSlider";
import { AmenitiesList } from "../_components/AmenitiesList";
import { PropertyCardSlider } from "../_components/PropertyCardSlider";
import { CallButton } from "@/components/CallButton";
import { RequestMeetingForm } from "@/app/_components/RequestMeetingForm";
import ContactForm from "@/app/_components/Form";
import RichTextRenderer from "@/app/_components/RichTextRenderer";

// API
import GetCompoundApi from "@/app/api/CompoundApi";

/**
 * Fetches basic compound details
 */
async function getCompoundDetails(slug: string) {
  try {
    const response = await GetCompoundApi.getCompoundApi(slug);
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }
    return response.data.data[0];
  } catch (error) {
    console.error("Failed to fetch compound details:", error);
    return null;
  }
}

/**
 * Fetches compound with properties
 */
async function getCompoundWithProperties(slug: string) {
  try {
    const response = await GetCompoundApi.getCompoundWithProperty(slug);
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }
    return response.data.data[0];
  } catch (error) {
    console.error("Failed to fetch compound properties:", error);
    return null;
  }
}

/**
 * Fetches compound with developer
 */
async function getCompoundWithDeveloper(slug: string) {
  try {
    const response = await GetCompoundApi.getCompoundWithDeveloper(slug);
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }
    return response.data.data[0];
  } catch (error) {
    console.error("Failed to fetch compound developer:", error);
    return null;
  }
}

/**
 * Fetches compound with offer
 */
async function getCompoundWithOffer(slug: string) {
  try {
    const response = await GetCompoundApi.getCompoundWithOffer(slug);
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }
    return response.data.data[0];
  } catch (error) {
    console.error("Failed to fetch compound offer:", error);
    return null;
  }
}

export default async function CompoundDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // Fetch all compound data in parallel for better performance
  const [
    compoundDetails,
    compoundWithProperties,
    compoundWithDeveloper,
    compoundWithOffer,
  ] = await Promise.all([
    getCompoundDetails(slug),
    getCompoundWithProperties(slug),
    getCompoundWithDeveloper(slug),
    getCompoundWithOffer(slug),
  ]);

  // If compound not found, return 404
  if (!compoundDetails) {
    notFound();
  }

  // Merge all data
  const compound = {
    ...compoundDetails,
    properties: compoundWithProperties?.properties || [],
    developer: compoundWithDeveloper?.developer || null,
    offer: compoundWithOffer?.offer || null,
  };

  // Prepare carousel slides
  const carouselSlides = [];

  // Add gallery images if they exist
  if (
    compound.imageGallery &&
    Array.isArray(compound.imageGallery) &&
    compound.imageGallery.length > 0
  ) {
    compound.imageGallery.forEach((image: { url: any }) => {
      if (image?.url) {
        carouselSlides.push({
          title: compound.name,
          button: "View Details",
          src: image.url,
        });
      }
    });
  }

  // If no gallery images, add banner if it exists
  if (carouselSlides.length === 0 && compound.banner?.url) {
    carouselSlides.push({
      title: compound.name,
      button: "View Details",
      src: compound.banner.url,
    });
  }

  // If no gallery images or banner, add placeholder
  if (carouselSlides.length === 0) {
    carouselSlides.push({
      title: compound.name,
      button: "View Details",
      src: "/placeholder.svg?height=800&width=1600",
    });
  }

  const paymentPlans: any[] = [];
  const specialOffers: any[] = [];

  if (compound.offer && compound.offer.blocks) {
    compound.offer.blocks.forEach((block: any) => {
      if (block.isOriginalPlan) {
        paymentPlans.push(block);
      } else {
        specialOffers.push(block);
      }
    });
  }

  // Format price with commas
  const formatPrice = (price: number) => {
    if (!price) return "Prices To Be Announced";
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
          <div className="flex items-center gap-5">
            <div className="w-8 h-8 rounded-full bg-[#05596B]/10 flex items-center justify-center">
              <div className="flex items-start justify-between ">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/developers/${compound.developer?.slug || ""}`}
                    className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#05596B]/20 transition-transform duration-300 hover:scale-105 flex-shrink-0 bg-[#05596B]/5"
                  >
                    {compound.developer?.logo?.url ? (
                      <Image
                        src={compound.developer.logo.url || "/placeholder.svg"}
                        alt={compound.developer.name || "Developer"}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-[#05596B]" />
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
            <div className="truncate">
              <h2 className="text-sm font-bold text-[#013344] truncate max-w-[150px]">
                {compound.name}
              </h2>
              <p className="text-xs text-[#05596B] flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[120px]">
                  {compound.area?.name || "Location not specified"}
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

      {/* Compound Info Section - Sticky on Desktop */}
      <div className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href={`/developers/${compound.developer?.slug || ""}`}
                className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#05596B]/20 transition-transform duration-300 hover:scale-105 flex-shrink-0 bg-[#05596B]/5"
              >
                {compound.developer?.logo?.url ? (
                  <Image
                    src={compound.developer.logo.url || "/placeholder.svg"}
                    alt={compound.developer.name || "Developer"}
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
                  {compound.name}
                  <Badge className="bg-[#05596B] text-white text-xs">
                    Compound
                  </Badge>
                  {compound.isNewLaunch && (
                    <Badge className="bg-red-500 text-white text-xs">
                      New Launch
                    </Badge>
                  )}
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#05596B]">
                  <MapPin className="h-3 w-3" />
                  <span>{compound.area?.name || "Location not specified"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-[#05596B]">Starting Price</p>
                {compound.startPrice ? (
                  <p className="text-lg font-bold text-[#013344]">
                    {formatPrice(compound.startPrice)}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#013344]">
                    Prices To Be Announced
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
        {/* Compound Header - Mobile */}
        <div className="lg:hidden relative z-30">
          <Card className="overflow-hidden border-0 shadow-lg mb-4">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge className="bg-[#05596B] text-white text-xs">
                        Compound
                      </Badge>
                      {compound.isNewLaunch && (
                        <Badge className="bg-red-500 text-white text-xs">
                          New Launch
                        </Badge>
                      )}
                      {compound.isTrendingProject && (
                        <Badge className="bg-orange-500 text-white text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#05596B]">Starting Price</p>
                    {compound.startPrice ? (
                      <p className="text-lg font-bold text-[#013344]">
                        {formatPrice(compound.startPrice)}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-[#013344]">
                        Prices To Be Announced
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {compound.masterPlanImage && (
                    <MasterPlanDrawer
                      masterPlanImage={
                        compound.masterPlanImage[0]?.url ||
                        compound.masterPlanImage[0]?.url
                      }
                      compoundName={compound.name}
                    />
                  )}
                  {compound.locationOnMap && (
                    <MapDrawer
                      locationOnMap={compound.locationOnMap}
                      compoundName={compound.name}
                      areaName={compound.area?.name}
                    />
                  )}
                  <RequestMeetingForm />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breadcrumb */}
        <div className="my-5 bg-[#05596B] hover:bg-[#3f91ac] px-4 sm:px-6 py-1 rounded-md transition-colors duration-300">
          <BreadcrumbCustom
            items={[
              { title: "Home", href: "/" },
              ...(compound.isNewLaunch || compound.isTrendingProject
                ? [
                    {
                      title: "New Launches",
                      href: "/new-launches",
                    },
                  ]
                : [
                    { title: "Destinations", href: "/areas" },
                    {
                      title: compound.area?.name || "Area",
                      href: `/areas/${compound.area?.slug || ""}`,
                    },
                  ]),
              { title: compound.name },
            ]}
          />
        </div>

        {/* Quick Stats - Desktop */}
        <div className="hidden lg:flex mb-8 gap-4">
          {compound.masterPlanImage && (
            <MasterPlanDrawer
              masterPlanImage={
                compound.masterPlanImage[0]?.url ||
                compound.masterPlanImage[0]?.url
              }
              compoundName={compound.name}
            />
          )}
          {compound.locationOnMap && (
            <MapDrawer
              locationOnMap={compound.locationOnMap}
              compoundName={compound.name}
              areaName={compound.area?.name}
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
                      value="payment-plans"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Payment Plans</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="offers"
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Special Offers</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="amenities"
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Amenities</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="properties"
                      className="flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      <span>Properties</span>
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
                      About {compound.name}
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Building className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Developer</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {compound.developer?.name || "N/A"}
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
                          {compound.area?.name || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Home className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Properties</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {compound.properties?.length || "0"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <MapPinHouse className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Type</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {compound.type || "Residential"}
                        </p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Calendar className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Delivery</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {compound.deliveryIn || "Contact for details"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Banknote className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Down Payment</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {paymentPlans[0]?.paymentPercentage
                            ? `${paymentPlans[0].paymentPercentage}%`
                            : "Contact for details"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Clock className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Payment Plan</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {paymentPlans[0]?.paymentDuration
                            ? `${paymentPlans[0].paymentDuration} Years`
                            : "Contact for details"}
                        </p>
                      </div>
                      <div className="bg-[#F7F8F8] p-3 rounded-lg hover:bg-[#05596B]/10 transition-colors flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#05596B]/20">
                            <Users className="h-4 w-4 text-[#05596B]" />
                          </div>
                          <p className="text-sm text-[#05596B]">Status</p>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[#013344]">
                          {compound.isNewLaunch
                            ? "New Launch"
                            : compound.isTrendingProject
                              ? "Trending"
                              : "Available"}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-6 bg-[#05596B]/10" />

                    {/* Description */}
                    <div className="prose prose-sm sm:prose-base text-[#05596B] max-w-none">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#013344] mb-4">
                        About {compound.name}
                      </h3>

                      <ScrollArea className="h-auto">
                        {compound.description ? (
                          <div className="prose prose-lg text-[#05596B] max-w-none">
                            <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                              <RichTextRenderer
                                content={compound.description}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-[#05596B]/70">
                            <p>No description available for this compound.</p>
                          </div>
                        )}
                        <ScrollBar />
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Properties Preview */}
                {compound.properties && compound.properties.length > 0 && (
                  <Card className="border-0 shadow-md overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6 flex flex-row justify-between items-center">
                      <h2 className="text-xl font-bold text-[#013344] flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Featured Properties
                      </h2>
                      <Link
                        href={`/search?compound=${compound.slug}`}
                        className="text-[#05596B] text-sm flex items-center hover:underline"
                      >
                        View all
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <PropertyCardSlider
                        properties={compound.properties.slice(0, 5)}
                        compound={compound}
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Payment Plans Tab */}
              <TabsContent value="payment-plans" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Plans
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {paymentPlans.length > 0 ? (
                      <PaymentPlanSlider
                        plans={paymentPlans}
                        compound={compound}
                      />
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>No payment plans available at the moment.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Special Offers Tab */}
              <TabsContent value="offers" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Special Offers
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {specialOffers.length > 0 ? (
                      <OfferCardSlider
                        offers={specialOffers}
                        compound={compound}
                      />
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>No special offers available at the moment.</p>
                        <p className="mt-2 text-sm">
                          Check back later or contact our sales team for
                          exclusive deals.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Amenities Tab */}
              <TabsContent value="amenities" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Amenities & Features
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {compound.amenities && compound.amenities.length > 0 ? (
                      <AmenitiesList amenities={compound.amenities} />
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>
                          No amenities information available for this compound.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Properties Tab */}
              <TabsContent value="properties" className="mt-0">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#05596B]/10 to-transparent p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#013344] flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Available Properties
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {compound.properties && compound.properties.length > 0 ? (
                      <div className="space-y-6">
                        <PropertyCardSlider
                          properties={compound.properties}
                          compound={compound}
                        />
                        <div className="text-center mt-6">
                          <Button asChild>
                            <Link href={`/search?compound=${compound.slug}`}>
                              View all properties
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#05596B]/70">
                        <p>No properties available for this compound.</p>
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
                    Interested in {compound.name}?
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
                    Book a site visit to explore {compound.name} in person.
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
                    {compound.name}.
                  </p>
                  <CallButton
                    phoneNumber="+0201123960001"
                    variant="default"
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Developer Info */}
              {compound.developer && (
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
                        {compound.developer?.logo?.url ? (
                          <Image
                            src={
                              compound.developer.logo.url || "/placeholder.svg"
                            }
                            alt={compound.developer.name || "Developer"}
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
                          {compound.developer.name || "Developer"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/developers/${compound.developer.slug || ""}`}
                      className="text-[#05596B] text-sm flex items-center hover:underline"
                    >
                      View all properties by this developer
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
