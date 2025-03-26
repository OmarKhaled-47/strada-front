/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import GetNewLaunchesApi from "@/app/api/NewLaunchesApi";
import Link from "next/link";
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextRenderer from "@/app/_components/RichTextRenderer";
import ContactForm from "@/app/_components/Form";
import CompoundCard from "../areas/_components/CompoundCard";
import { TrendingCompoundSlider } from "../areas/_components/TrendingCompoundSlider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building,
  Phone,
  MapPin,
  Sparkles,
  Info,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Property Launches | Strada Properties",
  description:
    "Discover the latest property launches and new real estate developments. Be the first to explore newly released properties with Strada Properties.",
  alternates: {
    canonical: "/new-launches",
  },
  openGraph: {
    title: "New Property Launches | Strada Properties",
    description:
      "Discover the latest property launches and new real estate developments. Be the first to explore newly released properties with Strada Properties.",
    url: "/new-launches",
  },
};

async function getNewLaunches() {
  try {
    const response = await GetNewLaunchesApi.getNewLaunchesSection();
    const compounds = response.data.data;

    const offers = compounds
      .filter((compound: any) => compound.offer) // Ensure offer exists
      .flatMap(
        (compound: any) =>
          compound.offer.blocks
            ? compound.offer.blocks
                .filter((block: any) => block.isOriginalPlan === false) // Filter only non-original plans
                .map((block: any) => ({
                  ...block,
                  compound: compound.offer.compound,
                  developer: {
                    name: compound.offer.developer?.name,
                    logo: compound.offer.developer?.logo,
                  },
                }))
            : [] // Return empty array if no blocks
      );

    return { compounds, offers };
  } catch (error) {
    throw new Error("Failed to fetch new launches");
  }
}

async function getTrendingProjects() {
  try {
    const response = await GetNewLaunchesApi.getTrendingProject();
    const compounds = response.data.data;

    const offers = compounds
      .filter((compound: any) => compound.offer) // Ensure offer exists
      .flatMap(
        (compound: any) =>
          compound.offer.blocks
            ? compound.offer.blocks
                .filter((block: any) => block.isOriginalPlan === false) // Filter only non-original plans
                .map((block: any) => ({
                  ...block,
                  compound: compound.offer.compound,
                  developer: {
                    name: compound.offer.developer?.name,
                    logo: compound.offer.developer?.logo,
                  },
                }))
            : [] // Return empty array if no blocks
      );

    return { compounds, offers };
  } catch (error) {
    throw new Error("Failed to fetch trending projects");
  }
}

async function getPageContent() {
  try {
    const response = await GetNewLaunchesApi.getNewLaunches();
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch page content");
  }
}

export default async function NewLaunchesPage() {
  try {
    const [pageContent, newLaunchesData, trendingProjectsData] =
      await Promise.all([
        getPageContent(),
        getNewLaunches(),
        getTrendingProjects(),
      ]);

    const { blocks, description } = pageContent;
    const { compounds: newLaunches, offers: newLaunchesOffers } =
      newLaunchesData;
    const { compounds: trendingProjects, offers: trendingOffers } =
      trendingProjectsData;

    const locations = Array.from(
      new Set(newLaunches.map((compound: any) => compound.area?.name))
    ).filter(Boolean);

    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#013344] to-[#05596B] text-white pt-24 md:pt-32 pb-12 md:pb-16">
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          <div className="container px-4 mx-auto relative z-10">
            <div className="mb-4 md:mb-6">
              <BreadcrumbCustom
                items={[
                  { title: "Home", href: "/" },
                  { title: "All New Launches" },
                ]}
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
                  {(() => {
                    const words = blocks.heading.split(" ");
                    const lastWord = words.pop();
                    return (
                      <>
                        {words.join(" ")}{" "}
                        <span className="text-[#FFD700]">{lastWord}</span>
                      </>
                    );
                  })()}
                </h1>
                <p className="text-white/90 text-sm md:text-base mb-3 md:mb-4 max-w-2xl">
                  {blocks.subHeading}
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/90">
                  <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">
                      {newLaunches.length} New Launches
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">
                      {locations.length} Locations
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-0">
                <CallButton phoneNumber="+0201123960001" variant="default" />
                <WhatsAppButton
                  phoneNumber="+0201123960001"
                  message={"message"}
                  variant="default"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto py-8 md:py-12">
          {/* Trending Projects */}
          <Suspense
            fallback={
              <div className="h-48 md:h-64 bg-gray-100 animate-pulse rounded-xl"></div>
            }
          >
            {trendingProjects.length > 0 && (
              <section className="mb-8 md:mb-16">
                <div className="flex justify-between items-center mb-4 md:mb-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-1 md:mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                      Trending Projects
                    </h2>
                    <p className="text-sm md:text-base text-[#05596B] flex items-center gap-1">
                      <Building className="h-3 w-3 md:h-4 md:w-4" />
                      {trendingProjects.length} Premium Projects
                    </p>
                  </div>
                  <Link
                    href="/search"
                    className="text-[#05596B] hover:text-[#013344] transition-colors font-medium flex items-center gap-1 text-sm md:text-base"
                  >
                    View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
                </div>
                <TrendingCompoundSlider compounds={trendingProjects} />
              </section>
            )}
          </Suspense>

          {/* Tabs and Content */}
          <Tabs defaultValue="all" className="mb-8 md:mb-16">
            <TabsList className="mb-4 md:mb-8 bg-white p-1 rounded-full border border-gray-200 shadow-sm overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="all"
                className="rounded-full px-3 md:px-4 py-1 md:py-2 text-sm md:text-base data-[state=active]:bg-[#05596B] data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              {locations.map((location: any) => (
                <TabsTrigger
                  key={location}
                  value={location}
                  className="rounded-full px-3 md:px-4 py-1 md:py-2 text-sm md:text-base data-[state=active]:bg-[#05596B] data-[state=active]:text-white"
                >
                  {location}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all">
              <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-4 md:mb-8 flex items-center gap-2">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                All Launches
              </h2>
              <Suspense
                fallback={
                  <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-48 md:h-64 bg-gray-100 animate-pulse rounded-xl"
                      ></div>
                    ))}
                  </div>
                }
              >
                {newLaunches.length > 0 ? (
                  <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {newLaunches.map((compound: any) => (
                      <CompoundCard key={compound.id} compound={compound} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-16 bg-white rounded-xl shadow-md">
                    <div className="bg-[#F7F8F8] rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <Building className="h-8 md:h-10 w-8 md:w-10 text-[#05596B]" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#013344] mb-2 md:mb-3">
                      No New Launches Found
                    </h3>
                    <p className="text-sm md:text-base text-[#05596B] max-w-md mx-auto mb-4 md:mb-6">
                      We couldn&apos;t find any new launches at the moment.
                      Please check back later or explore our other properties.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#05596B] hover:bg-[#013344] text-sm md:text-base"
                    >
                      <Link href="/search">Explore All Properties</Link>
                    </Button>
                  </div>
                )}
              </Suspense>
            </TabsContent>

            {/* Location-specific Tabs */}
            {locations.map((location: any) => (
              <TabsContent key={location} value={location}>
                <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-4 md:mb-8 flex items-center gap-2">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                  Launching Soon in {location}
                </h2>
                <Suspense
                  fallback={
                    <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-48 md:h-64 bg-gray-100 animate-pulse rounded-xl"
                        ></div>
                      ))}
                    </div>
                  }
                >
                  {newLaunches.filter(
                    (compound: any) => compound.area?.name === location
                  ).length > 0 ? (
                    <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {newLaunches
                        .filter(
                          (compound: any) => compound.area?.name === location
                        )
                        .map((compound: any) => (
                          <CompoundCard key={compound.id} compound={compound} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-16 bg-white rounded-xl shadow-md">
                      <div className="bg-[#F7F8F8] rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6">
                        <MapPin className="h-8 md:h-10 w-8 md:w-10 text-[#05596B]" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#013344] mb-2 md:mb-3">
                        No New Launches in {location}
                      </h3>
                      <p className="text-sm md:text-base text-[#05596B] max-w-md mx-auto mb-4 md:mb-6">
                        We couldn&apos;t find any new launches in {location} at
                        the moment. Please check other locations or explore our
                        existing properties.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#05596B] hover:bg-[#013344] text-sm md:text-base"
                      >
                        <Link
                          href={`/areas/${location
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          Explore {location} Properties
                        </Link>
                      </Button>
                    </div>
                  )}
                </Suspense>
              </TabsContent>
            ))}
          </Tabs>

          {/* Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-w-8xl mx-auto mb-8 md:mb-16">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <h2 className="text-xl md:text-2xl font-bold text-[#013344] p-4 md:p-6 border-b flex items-center gap-2">
                About New Launches
              </h2>
              <ScrollArea className="h-[400px] md:h-[800px] p-4 md:p-6">
                <div className="pr-4 md:pr-6">
                  <div className="prose prose-sm md:prose-lg text-[#05596B] max-w-none">
                    <RichTextRenderer content={description} />
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 p-4 md:p-6    overflow-hidden">
                <div className="relative z-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F7F8F8]">
        <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <Building className="h-12 md:h-16 w-12 md:w-16 text-[#05596B] mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-3 md:mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-sm md:text-base text-[#05596B] mb-4 md:mb-6 max-w-md">
            We&apos;re having trouble loading new launches. Please try again
            later or explore our other properties.
          </p>
          <Button
            asChild
            size="sm"
            className="bg-[#05596B] hover:bg-[#013344] text-sm md:text-base"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }
}
