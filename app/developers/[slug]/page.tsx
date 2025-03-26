/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
import CompoundCard from "@/app/areas/_components/CompoundCard";
import ContactForm from "@/app/_components/Form";
import RichTextRenderer from "@/app/_components/RichTextRenderer";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { NewLaunchesCardSlider } from "@/app/areas/_components/NewLauncherCardSlider";
import { AreaSlider } from "../_component/AreaSlider";
import {
  MapPin,
  Building,
  Tag,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Phone,
  Award,
  TrendingUp,
  ChevronRight,
  Gift,
} from "lucide-react";
import { ErrorBoundary } from "../_component/ErrorBoundary";
import GetDeveloperApi from "@/app/api/DeveloperApi";
import { TrendingCompoundSlider } from "@/app/areas/_components/TrendingCompoundSlider";
import { CompoundCardSlider } from "@/app/areas/_components/CompoundCardSlider";
import { OfferCardSlider } from "@/app/_components/OfferCardSlider";

interface Developer {
  offers: any;
  id: number;
  name: string;
  slug: string;
  description: any;
  logo?: {
    url: string;
  };
  compounds?: Compound[];
  areas?: Area[];
}

interface Offer {
  id: string;
  blocks: OfferBlock[];
  compound: {
    name: string;
    slug: string;
    banner?: {
      url: string;
    };
  };
  developer?: {
    name: string;
    logo?: {
      url: string;
    };
  };
}

interface OfferBlock {
  id: string;
  isOriginalPlan: boolean;
  paymentDuration?: number;
  paymentPercentage?: number;
  paymentType?: string;
}

interface Compound {
  isTrendingProject: boolean;
  id: number;
  name: string;
  slug: string;
  isNewLaunch: boolean;
  banner?: {
    url: string;
  };
  offer?: {
    blocks: OfferBlock[];
    compound: {
      name: string;
      slug: string;
      banner?: {
        url: string;
      };
    };
  };
  properties: [];
}

interface Area {
  id: string;
  name: string;
  slug: string;
}

async function getDeveloperDetails(slug: string): Promise<Developer> {
  const response = await GetDeveloperApi.getDeveloperBySlug(slug);
  if (!response.data.data?.length) throw new Error("Developer not found");
  return response.data.data[0];
}

export default async function DeveloperDetailsPage(props: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await props.params;
  const searchParamsData = await props.searchParams;
  const page = Number(searchParamsData?.page) || 1;
  const pageSize = 3; // Same as in area page

  try {
    const developer = await getDeveloperDetails(slug);

    if (!developer) notFound();

    // Get paginated compounds (regular compounds only)
    const paginatedResponse = await GetDeveloperApi.getPaginatedCompounds(
      page,
      pageSize,
      developer.id
    );

    const paginatedCompounds = paginatedResponse.data.data;
    const pagination = paginatedResponse.data.meta.pagination;

    // Get trending compounds (separate query)
    const trendingResponse = await GetDeveloperApi.getTrendingCompounds(
      developer.id
    );
    const trendingCompounds = trendingResponse.data.data || [];

    // Get new launch compounds (separate query)
    const newLaunchesResponse = await GetDeveloperApi.getNewLaunchCompounds(
      developer.id
    );
    const newLaunches = newLaunchesResponse.data.data || [];

    return (
      <ErrorBoundary>
        <main className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8]">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-[#013344] to-[#05596B] text-white pt-24 md:pt-32 pb-12 md:pb-16">
            <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
            <div className="container px-4 mx-auto relative z-10">
              <div className="mb-4 md:mb-6">
                <BreadcrumbCustom
                  items={[
                    { title: "Home", href: "/" },
                    { title: "Developers", href: "/developers" },
                    { title: developer.name },
                  ]}
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-white shadow-lg border-4 border-white">
                  <Image
                    src={developer.logo?.url || "/placeholder-logo.svg"}
                    alt={developer.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 96px, 128px"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
                    {developer.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/90 mb-3 md:mb-4">
                    <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                      <Building className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="font-medium">
                        {developer.compounds?.length || 0} Compounds
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="font-medium">
                        {developer.areas?.length || 0} Destinations
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                      <Award className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="font-medium">Premium Developer</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <Button
                      asChild
                      size="sm"
                      className="bg-white text-[#013344] hover:bg-white/90 transition-colors text-sm md:text-base"
                    >
                      <Link href="#contact-form">
                        <Phone className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                        Contact Developer
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-white text-white hover:bg-white/10 text-sm md:text-base"
                    >
                      <Link href="#compounds">
                        <Building className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                        View Compounds
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container px-4 mx-auto py-8 md:py-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
                <div className="bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
                  <Sparkles className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-[#013344]">
                    New Launches
                  </h3>
                  <p className="text-xs md:text-base text-[#05596B]">
                    {developer.compounds?.filter(
                      (c) => c.isNewLaunch || c.isTrendingProject
                    ).length || 0}{" "}
                    Compounds
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
                <div className="bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
                  <Gift className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-[#013344]">
                    Special Offers
                  </h3>
                  <p className="text-xs md:text-base text-[#05596B]">
                    {developer.compounds
                      ?.flatMap((compound) => compound.offer?.blocks || [])
                      .filter((block) => !block.isOriginalPlan).length ||
                      0}{" "}
                    Active Offers
                  </p>
                </div>
              </div>
            </div>

            {/* Areas */}
            <ErrorBoundary
              fallback={
                <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mb-8 md:mb-12">
                  Unable to load areas
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="h-48 md:h-64 bg-white rounded-xl shadow-md animate-pulse mb-8 md:mb-12"></div>
                }
              >
                {developer.areas && developer.areas.length > 0 && (
                  <div className="mb-8 md:mb-12 bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#E6F7F6] rounded-bl-full opacity-30"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-4 md:mb-6 flex items-center gap-2">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                      Destinations
                    </h2>
                    <AreaSlider areas={developer.areas} />
                  </div>
                )}
              </Suspense>
            </ErrorBoundary>

            {/* Special Offers */}
            <ErrorBoundary
              fallback={
                <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mb-8 md:mb-12">
                  Unable to load offers
                </div>
              }
            >
              <Suspense fallback={<OffersSkeleton />}>
                <OffersSection developer={developer} />
              </Suspense>
            </ErrorBoundary>

            {/* Trending Projects - Not affected by pagination */}
            {trendingCompounds.length > 0 && (
              <section className="mb-8 md:mb-16">
                <div className="flex justify-between items-center mb-4 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                    Trending Compounds
                  </h2>
                  <Link
                    href="/new-launches"
                    className="text-[#05596B] hover:text-[#013344] flex items-center gap-1 font-medium text-sm md:text-base"
                  >
                    View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
                </div>
                <TrendingCompoundSlider compounds={trendingCompounds} />
              </section>
            )}

            {/* New Launch Compounds - Not affected by pagination */}
            <ErrorBoundary
              fallback={
                <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mb-8 md:mb-12">
                  Unable to load new launches
                </div>
              }
            >
              <Suspense fallback={<NewLaunchesSkeleton />}>
                {newLaunches.length > 0 && (
                  <section className="mb-8 md:mb-16">
                    <div className="flex justify-between items-center mb-4 md:mb-8">
                      <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
                        <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                        New Launches
                      </h2>
                      <Link
                        href="/new-launches"
                        className="text-[#05596B] hover:text-[#013344] flex items-center gap-1 font-medium text-sm md:text-base"
                      >
                        View All{" "}
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                      </Link>
                    </div>
                    <NewLaunchesCardSlider compounds={newLaunches} />
                  </section>
                )}
              </Suspense>
            </ErrorBoundary>

            {/* Regular Compounds with Pagination */}
            <ErrorBoundary
              fallback={
                <div className="p-4 md:p-6 bg-white rounded-xl shadow-md mb-8 md:mb-12">
                  Unable to load compounds
                </div>
              }
            >
              <Suspense fallback={<CompoundsSkeleton />}>
                <section
                  id="compounds"
                  className="mb-8 md:mb-12 bg-white rounded-xl p-4 md:p-8 shadow-md border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#E6F7F6] rounded-bl-full opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-1 md:mb-2 flex items-center gap-2">
                          Available Compounds
                        </h2>
                        <p className="text-sm md:text-base text-[#05596B] flex items-center gap-1">
                          <Tag className="h-3 w-3 md:h-4 md:w-4" />
                          {pagination.total} Premium Compound
                          {pagination.total !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <Link
                        href="/search"
                        className="text-[#05596B] hover:text-[#013344] transition-colors font-medium mt-2 md:mt-0 flex items-center gap-1 text-sm md:text-base"
                      >
                        Browse All Compounds{" "}
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                      </Link>
                    </div>
                    <div className="md:hidden">
                      <CompoundCardSlider compounds={paginatedCompounds} />
                    </div>
                    {/* Paginated compounds grid */}
                    <div className="hidden md:grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {" "}
                      {paginatedCompounds.map((compound: any) => (
                        <CompoundCard key={compound.id} compound={compound} />
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {pagination.pageCount > 1 && (
                      <div
                        className="hidden md:flex flex-wrap justify-center items-center gap-2 mt-8 md:mt-12 mb-8 md:mb-16"
                        id="pagination-controls"
                      >
                        {page > 1 && (
                          <Link
                            href={`/developers/${slug}?page=${
                              page - 1
                            }#compounds`}
                            className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
                            scroll={false}
                          >
                            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                          </Link>
                        )}

                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: pagination.pageCount },
                            (_, i) => i + 1
                          ).map((pageNum) => {
                            // Show first page, last page, current page, and pages around current
                            const shouldShow =
                              pageNum === 1 ||
                              pageNum === pagination.pageCount ||
                              (pageNum >= page - 1 && pageNum <= page + 1);

                            // Show ellipsis for gaps
                            if (!shouldShow) {
                              // Only show ellipsis at the start of a gap
                              if (
                                pageNum === 2 ||
                                pageNum === pagination.pageCount - 1
                              ) {
                                return (
                                  <span
                                    key={`ellipsis-${pageNum}`}
                                    className="px-1 md:px-2 text-[#05596B] text-sm md:text-base"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              return null;
                            }

                            return (
                              <Link
                                key={pageNum}
                                href={`/developers/${slug}?page=${pageNum}#compounds`}
                                scroll={false}
                                className={`min-w-[32px] md:min-w-[40px] h-8 md:h-10 flex items-center justify-center rounded-md transition-colors text-sm md:text-base ${
                                  pageNum === page
                                    ? "bg-[#05596B] text-white font-bold shadow-md"
                                    : "bg-white text-[#013344] border border-[#013344]/20 hover:bg-[#E6F7F6]"
                                }`}
                              >
                                {pageNum}
                              </Link>
                            );
                          })}
                        </div>

                        {page < pagination.pageCount && (
                          <Link
                            href={`/developers/${slug}?page=${
                              page + 1
                            }#compounds`}
                            className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
                            scroll={false}
                          >
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              </Suspense>
            </ErrorBoundary>

            {/* About and Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <h2 className="text-xl md:text-2xl font-bold text-[#013344] p-4 md:p-6 border-b flex items-center gap-2">
                  About {developer.name}
                </h2>
                <ScrollArea className="h-[400px] md:h-[800px] p-4 md:p-6">
                  <div className="pr-4 md:pr-6">
                    <div className="prose prose-sm md:prose-lg text-[#05596B] max-w-none">
                      {developer.description ? (
                        <RichTextRenderer content={developer.description} />
                      ) : (
                        <p className="text-base md:text-xl text-gray-500">
                          No information available about this developer.
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-1" id="contact-form">
                <div className="sticky top-20 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="relative z-10">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    );
  } catch (error) {
    notFound();
  }
}

// developer/[slug]/page.tsx
async function OffersSection({ developer }: { developer: Developer }) {
  // Get offers from all compounds
  const offers =
    developer.compounds?.flatMap(
      (compound) =>
        compound.offer?.blocks
          ?.filter((block) => !block.isOriginalPlan)
          ?.map((block) => ({
            ...block,
            compound: {
              name: compound.name,
              slug: compound.slug,
              banner: compound.banner,
            },
            developer: {
              name: developer.name,
              logo: developer.logo,
            },
          })) || []
    ) || [];

  if (offers.length === 0) return null;

  return (
    <section className="mb-8 md:mb-16">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
          <Gift className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
          Special Offers
        </h2>
      </div>
      {/* <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer: any, index: any) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div> */}
      <OfferCardSlider offers={offers} />
    </section>
  );
}

// Skeleton loaders
function OffersSkeleton() {
  return (
    <section className="mb-8 md:mb-12">
      <div className="h-8 w-64 bg-gray-200 rounded-md mb-4 md:mb-6 animate-pulse"></div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-48 md:h-64 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </section>
  );
}

function NewLaunchesSkeleton() {
  return (
    <section className="mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="h-48 md:h-64 bg-gray-200 rounded-lg animate-pulse"></div>
    </section>
  );
}

function CompoundsSkeleton() {
  return (
    <section className="mb-8 md:mb-12 bg-white rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 md:h-64 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </section>
  );
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Suspense } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   MapPin,
//   Building,
//   Tag,
//   Sparkles,
//   TrendingUp,
//   ChevronRight,
//   Info,
//   Phone,
//   Gift,
// } from "lucide-react";
// import GetAreaApi from "@/app/api/AreaApi";
// import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";
// import CompoundCard from "../_components/CompoundCard";
// import { TrendingCompoundSlider } from "../_components/TrendingCompoundSlider";
// import { NewLaunchesCardSlider } from "../_components/NewLauncherCardSlider";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import RichTextRenderer from "@/app/_components/RichTextRenderer";
// import ContactForm from "@/app/_components/Form";
// import { Button } from "@/components/ui/button";
// import { OfferCardSlider } from "@/app/_components/OfferCardSlider";
// import { CompoundCardSlider } from "../_components/CompoundCardSlider";
// async function getAreaDetails(slug: string) {
//   try {
//     const response = await GetAreaApi.getAreaBySlug(slug);
//     return response.data.data[0];
//   } catch (error) {
//     return notFound();
//   }
// }

// async function getPaginatedCompounds(
//   areaId: number,
//   page: number,
//   pageSize: number
// ) {
//   try {
//     return await GetAreaApi.getPaginatedCompounds(page, pageSize, areaId);
//   } catch (error) {
//     return {
//       data: [],
//       meta: { pagination: { page: 1, pageCount: 1, total: 0 } },
//     };
//   }
// }

// export default async function AreaDetailsPage({
//   params,
//   searchParams,
// }: {
//   params: { slug: string };
//   searchParams: { page?: string };
// }) {
//   const { slug } = await params;
//   const area = await getAreaDetails(slug);
//   if (!area) notFound();

//   const searchParamsData = await searchParams;
//   const page = Number(searchParamsData?.page) || 1;
//   const pageSize = 3;
//   const paginatedResponse = await getPaginatedCompounds(
//     area.id,
//     page,
//     pageSize
//   );

//   const allCompounds = paginatedResponse.data.data;
//   const { pagination } = paginatedResponse.data.meta;
//   const fullResponse = await getPaginatedCompounds(area.id, 1, 1000); // Adjust pageSize as needed
//   const allCompoundsFull = fullResponse.data.data;
//   const trending = allCompoundsFull.filter(
//     (c: { isTrendingProject: any }) => c.isTrendingProject
//   );
//   const newLaunches = allCompoundsFull.filter(
//     (c: { isNewLaunch: any }) => c.isNewLaunch
//   );

//   const offers = allCompoundsFull
//     .filter((compound: { offer: any }) => compound.offer) // First ensure offer exists
//     .flatMap(
//       (compound: {
//         offer: {
//           blocks: any[];
//           compound: any;
//           developer: { name: any; logo: any };
//         };
//       }) => {
//         // If offer has blocks, filter them and map to the desired structure
//         return compound.offer.blocks
//           ? compound.offer.blocks
//               .filter((block) => block.isOriginalPlan === false) // Filter only non-original plans
//               .map((block) => ({
//                 ...block,
//                 compound: compound.offer.compound,
//                 developer: {
//                   name: compound.offer.developer?.name,
//                   logo: compound.offer.developer?.logo,
//                 },
//               }))
//           : []; // Return empty array if no blocks
//       }
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8]">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-[#013344] to-[#05596B] text-white pt-24 md:pt-32 pb-12 md:pb-16">
//         <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
//         <div className="container px-4 mx-auto relative z-10">
//           <div className="mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
//             <BreadcrumbCustom
//               items={[
//                 { title: "Home", href: "/" },
//                 { title: "Destinations", href: "/areas" },
//                 { title: area.name },
//               ]}
//             />
//           </div>

//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
//                 {area.name}
//               </h1>
//               <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/90 mb-3 md:mb-4">
//                 <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
//                   <Building className="h-3 w-3 md:h-4 md:w-4" />
//                   <span className="font-medium">
//                     {pagination.total} Compounds
//                   </span>
//                 </div>
//                 {offers.length > 0 && (
//                   <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
//                     <Gift className="h-3 w-3 md:h-4 md:w-4" />
//                     <span className="font-medium">
//                       {offers.length} Special Offers
//                     </span>
//                   </div>
//                 )}
//                 {newLaunches.length > 0 && (
//                   <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
//                     <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
//                     <span className="font-medium">
//                       {newLaunches.length} New Launches
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-3 md:line-clamp-none">
//                 {area.description}
//               </p>
//             </div>
//             <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-0">
//               <Button
//                 asChild
//                 size="sm"
//                 className="bg-white text-[#013344] hover:bg-white/90 transition-colors text-sm md:text-base"
//               >
//                 <Link href="#contact-form">
//                   <Phone className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
//                   Contact Agent
//                 </Link>
//               </Button>
//               <Button
//                 asChild
//                 variant="outline"
//                 size="sm"
//                 className="bg-transparent border-white text-white hover:bg-white/10 text-sm md:text-base"
//               >
//                 <Link href="#about">
//                   <Info className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
//                   About Area
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container px-4 mx-auto py-8 md:py-12">
//         {/* Area Image */}
//         <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 md:mb-12 shadow-md">
//           {area.banner?.url && (
//             <Image
//               src={area.banner.url || "/placeholder.svg"}
//               alt={area.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
//               priority
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
//           <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
//             <Badge className="bg-white text-[#013344] hover:bg-white/90 shadow-lg text-sm md:text-lg font-medium px-3 md:px-5 py-1 md:py-2">
//               <MapPin className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
//               Premium Destination
//             </Badge>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 ">
//           <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
//             <div className="hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
//               <Building className=" h-4 w-4 md:h-8 md:w-8 text-[#202324]" />
//             </div>
//             <div>
//               <h3 className="text-xs md:text-lg font-semibold text-[#013344] mb-2">
//                 Total Compounds
//               </h3>
//               <p className="text-xs md:text-base text-[#05596B]">
//                 {pagination.total} Available
//               </p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
//             <div className="hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
//               <TrendingUp className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
//             </div>
//             <div>
//               <h3 className="text-xs md:text-lg font-semibold text-[#013344] mb-2">
//                 Trending Projects
//               </h3>
//               <p className="text-xs md:text-base text-[#05596B]">
//                 {trending.length} Compound
//               </p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
//             <div className=" hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
//               <Sparkles className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
//             </div>
//             <div>
//               <h3 className="text-xs md:text-lg font-semibold text-[#013344]">
//                 New Launches
//               </h3>
//               <p className="text-xs md:text-base text-[#05596B]">
//                 {newLaunches.length} Properties
//               </p>
//             </div>
//           </div>
//         </div>

//         <Suspense fallback={<Skeleton className="h-64 md:h-96 w-full" />}>
//           {offers.length > 0 && (
//             <section className="mb-8 md:mb-16">
//               <div className="flex justify-between items-center mb-4 md:mb-8">
//                 <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
//                   <Gift className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
//                   Special Offers
//                 </h2>
//               </div>
//               <OfferCardSlider offers={offers} />
//             </section>
//           )}
//         </Suspense>

//         {trending.length > 0 && (
//           <section className="mb-8 md:mb-16">
//             <div className="flex justify-between items-center mb-4 md:mb-8">
//               <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
//                 Trending Compounds
//               </h2>
//               <Link
//                 href="/trending"
//                 className="text-[#05596B] hover:text-[#013344] flex items-center gap-1 font-medium text-sm md:text-base"
//               >
//                 View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
//               </Link>
//             </div>
//             <TrendingCompoundSlider compounds={trending} />
//           </section>
//         )}

//         {newLaunches.length > 0 && (
//           <section className="mb-8 md:mb-16">
//             <div className="flex justify-between items-center mb-4 md:mb-8">
//               <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
//                 <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
//                 New Launches
//               </h2>
//               <Link
//                 href="/new-launches"
//                 className="text-[#05596B] hover:text-[#013344] flex items-center gap-1 font-medium text-sm md:text-base"
//               >
//                 View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
//               </Link>
//             </div>
//             <NewLaunchesCardSlider compounds={newLaunches} />
//           </section>
//         )}

//         <section className="mb-8 md:mb-16">
//           <div className="flex justify-between items-center mb-4 md:mb-8">
//             <div>
//               <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-1 md:mb-2 flex items-center gap-2">
//                 All Compounds
//               </h2>
//               <p className="text-sm md:text-base text-[#05596B] flex items-center gap-1">
//                 <Tag className="h-3 w-3 md:h-4 md:w-4" />
//                 {pagination.total} Premium Compounds
//               </p>
//             </div>
//             <Link
//               href="/search"
//               className="text-[#05596B] hover:text-[#013344] transition-colors font-medium flex items-center gap-1 text-sm md:text-base"
//             >
//               Browse All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
//             </Link>
//           </div>

//           <div className="md:hidden">
//             <CompoundCardSlider compounds={allCompoundsFull} />
//           </div>

//           <div className="hidden md:grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {allCompounds.map((compound: any) => (
//               <CompoundCard key={compound.id} compound={compound} />
//             ))}
//           </div>
//         </section>

//         {/* Pagination Controls */}
//         {pagination.pageCount > 1 && (
//           <div className="hidden md:flex flex-wrap justify-center items-center gap-2 mt-8 md:mt-12 mb-8 md:mb-16">
//             {page > 1 && (
//               <Link
//                 href={`/areas/${slug}?page=${page - 1}`}
//                 className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
//                 scroll={false}
//               >
//                 <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
//               </Link>
//             )}
//             <div className="flex items-center gap-1 md:gap-2">
//               {Array.from(
//                 { length: pagination.pageCount },
//                 (_, i) => i + 1
//               ).map((pageNum) => {
//                 // Show first page, last page, current page, and pages around current
//                 const shouldShow =
//                   pageNum === 1 ||
//                   pageNum === pagination.pageCount ||
//                   (pageNum >= page - 1 && pageNum <= page + 1);

//                 // Show ellipsis for gaps
//                 if (!shouldShow) {
//                   // Only show ellipsis at the start of a gap
//                   if (pageNum === 2 || pageNum === pagination.pageCount - 1) {
//                     return (
//                       <span
//                         key={`ellipsis-${pageNum}`}
//                         className="px-1 md:px-2 text-[#05596B] text-sm md:text-base"
//                       >
//                         ...
//                       </span>
//                     );
//                   }
//                   return null;
//                 }

//                 return (
//                   <Link
//                     key={pageNum}
//                     href={`/areas/${slug}?page=${pageNum}`}
//                     scroll={false}
//                     className={`min-w-[32px] md:min-w-[40px] h-8 md:h-10 flex items-center justify-center rounded-md transition-colors text-sm md:text-base ${
//                       pageNum === page
//                         ? "bg-[#05596B] text-white font-bold shadow-md"
//                         : "bg-white text-[#013344] border border-[#013344]/20 hover:bg-[#E6F7F6]"
//                     }`}
//                   >
//                     {pageNum}
//                   </Link>
//                 );
//               })}
//             </div>
//             {page < pagination.pageCount && (
//               <Link
//                 href={`/areas/${slug}?page=${page + 1}`}
//                 className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
//                 scroll={false}
//               >
//                 <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
//               </Link>
//             )}
//           </div>
//         )}

//         {/* About Section */}
//         <div
//           id="about"
//           className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
//         >
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//             <h2 className="text-xl md:text-2xl font-bold text-[#013344] p-4 md:p-6 border-b flex items-center gap-2">
//               About {area.name}
//             </h2>
//             <ScrollArea className="h-[400px] md:h-[800px] p-4 md:p-6">
//               <div className="pr-4 md:pr-6">
//                 <div className="prose prose-sm md:prose-lg text-[#05596B] max-w-none">
//                   {area.about ? (
//                     <RichTextRenderer content={area.about} />
//                   ) : (
//                     <p className="text-base md:text-xl text-gray-500">
//                       No information available about this area.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </ScrollArea>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-1" id="contact-form">
//             <div className="sticky top-20 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//               <div className="relative z-10">
//                 <ContactForm />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
