/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Building,
  Tag,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Info,
  Phone,
  Gift,
} from "lucide-react";
import GetAreaApi from "@/app/api/AreaApi";
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import CompoundCard from "../_components/CompoundCard";
import { TrendingCompoundSlider } from "../_components/TrendingCompoundSlider";
import { NewLaunchesCardSlider } from "../_components/NewLauncherCardSlider";
import { ScrollArea } from "@/components/ui/scroll-area";
import RichTextRenderer from "@/app/_components/RichTextRenderer";
import ContactForm from "@/app/_components/Form";
import { Button } from "@/components/ui/button";
import { OfferCardSlider } from "@/app/_components/OfferCardSlider";
import { CompoundCardSlider } from "../_components/CompoundCardSlider";
async function getAreaDetails(slug: string) {
  try {
    const response = await GetAreaApi.getAreaBySlug(slug);
    return response.data.data[0];
  } catch (error) {
    return notFound();
  }
}

async function getPaginatedCompounds(
  areaId: number,
  page: number,
  pageSize: number
) {
  try {
    return await GetAreaApi.getPaginatedCompounds(page, pageSize, areaId);
  } catch (error) {
    return {
      data: [],
      meta: { pagination: { page: 1, pageCount: 1, total: 0 } },
    };
  }
}

export default async function AreaDetailsPage(props: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await props.params;
  const area = await getAreaDetails(slug);
  if (!area) notFound();

  const searchParamsData = await props.searchParams;
  const page = Number(searchParamsData?.page) || 1;
  const pageSize = 3;
  const paginatedResponse = await getPaginatedCompounds(
    area.id,
    page,
    pageSize
  );

  const allCompounds = paginatedResponse.data.data;
  const { pagination } = paginatedResponse.data.meta;
  const fullResponse = await getPaginatedCompounds(area.id, 1, 1000); // Adjust pageSize as needed
  const allCompoundsFull = fullResponse.data.data;
  const trending = allCompoundsFull.filter(
    (c: { isTrendingProject: any }) => c.isTrendingProject
  );
  const newLaunches = allCompoundsFull.filter(
    (c: { isNewLaunch: any }) => c.isNewLaunch
  );

  const offers = allCompoundsFull
    .filter((compound: { offer: any }) => compound.offer) // First ensure offer exists
    .flatMap(
      (compound: {
        offer: {
          blocks: any[];
          compound: any;
          developer: { name: any; logo: any };
        };
      }) => {
        // If offer has blocks, filter them and map to the desired structure
        return compound.offer.blocks
          ? compound.offer.blocks
              .filter((block) => block.isOriginalPlan === false) // Filter only non-original plans
              .map((block) => ({
                ...block,
                compound: compound.offer.compound,
                developer: {
                  name: compound.offer.developer?.name,
                  logo: compound.offer.developer?.logo,
                },
              }))
          : []; // Return empty array if no blocks
      }
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#013344] to-[#05596B] text-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
            <BreadcrumbCustom
              items={[
                { title: "Home", href: "/" },
                { title: "Destinations", href: "/areas" },
                { title: area.name },
              ]}
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
                {area.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/90 mb-3 md:mb-4">
                <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                  <Building className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="font-medium">
                    {pagination.total} Compounds
                  </span>
                </div>
                {offers.length > 0 && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                    <Gift className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">
                      {offers.length} Special Offers
                    </span>
                  </div>
                )}
                {newLaunches.length > 0 && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-sm">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">
                      {newLaunches.length} New Launches
                    </span>
                  </div>
                )}
              </div>
              <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-3 md:line-clamp-none">
                {area.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-0">
              <Button
                asChild
                size="sm"
                className="bg-white text-[#013344] hover:bg-white/90 transition-colors text-sm md:text-base"
              >
                <Link href="#contact-form">
                  <Phone className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                  Contact Agent
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent border-white text-white hover:bg-white/10 text-sm md:text-base"
              >
                <Link href="#about">
                  <Info className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                  About Area
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-8 md:py-12">
        {/* Area Image */}
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 md:mb-12 shadow-md">
          {area.banner?.url && (
            <Image
              src={area.banner.url || "/placeholder.svg"}
              alt={area.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <Badge className="bg-white text-[#013344] hover:bg-white/90 shadow-lg text-sm md:text-lg font-medium px-3 md:px-5 py-1 md:py-2">
              <MapPin className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
              Premium Destination
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 ">
          <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
            <div className="hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
              <Building className=" h-4 w-4 md:h-8 md:w-8 text-[#202324]" />
            </div>
            <div>
              <h3 className="text-xs md:text-lg font-semibold text-[#013344] mb-2">
                Total Compounds
              </h3>
              <p className="text-xs md:text-base text-[#05596B]">
                {pagination.total} Available
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
            <div className="hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
              <TrendingUp className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
            </div>
            <div>
              <h3 className="text-xs md:text-lg font-semibold text-[#013344] mb-2">
                Trending Projects
              </h3>
              <p className="text-xs md:text-base text-[#05596B]">
                {trending.length} Compound
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-2 md:p-6 shadow-md border border-gray-100 flex items-center gap-3 md:gap-4 transform transition-all hover:translate-y-[-4px]">
            <div className=" hidden md:block bg-[#E6F7F6] p-2 md:p-3 rounded-xl">
              <Sparkles className="h-4 w-4 md:h-8 md:w-8 text-[#05596B]" />
            </div>
            <div>
              <h3 className="text-xs md:text-lg font-semibold text-[#013344]">
                New Launches
              </h3>
              <p className="text-xs md:text-base text-[#05596B]">
                {newLaunches.length} Properties
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-64 md:h-96 w-full" />}>
          {offers.length > 0 && (
            <section className="mb-8 md:mb-16">
              <div className="flex justify-between items-center mb-4 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
                  <Gift className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                  Special Offers
                </h2>
              </div>
              <OfferCardSlider offers={offers} />
            </section>
          )}
        </Suspense>

        {trending.length > 0 && (
          <section className="mb-8 md:mb-16">
            <div className="flex justify-between items-center mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#013344] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#05596B]" />
                Trending Compounds
              </h2>
              <Link
                href="/trending"
                className="text-[#05596B] hover:text-[#013344] flex items-center gap-1 font-medium text-sm md:text-base"
              >
                View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </div>
            <TrendingCompoundSlider compounds={trending} />
          </section>
        )}

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
                View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </div>
            <NewLaunchesCardSlider compounds={newLaunches} />
          </section>
        )}

        <section className="mb-8 md:mb-16">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#013344] mb-1 md:mb-2 flex items-center gap-2">
                All Compounds
              </h2>
              <p className="text-sm md:text-base text-[#05596B] flex items-center gap-1">
                <Tag className="h-3 w-3 md:h-4 md:w-4" />
                {pagination.total} Premium Compounds
              </p>
            </div>
            <Link
              href="/search"
              className="text-[#05596B] hover:text-[#013344] transition-colors font-medium flex items-center gap-1 text-sm md:text-base"
            >
              Browse All <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </div>

          <div className="md:hidden">
            <CompoundCardSlider compounds={allCompoundsFull} />
          </div>

          <div className="hidden md:grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allCompounds.map((compound: any) => (
              <CompoundCard key={compound.id} compound={compound} />
            ))}
          </div>
        </section>

        {/* Pagination Controls */}
        {pagination.pageCount > 1 && (
          <div className="hidden md:flex flex-wrap justify-center items-center gap-2 mt-8 md:mt-12 mb-8 md:mb-16">
            {page > 1 && (
              <Link
                href={`/areas/${slug}?page=${page - 1}`}
                className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
                scroll={false}
              >
                <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            )}
            <div className="flex items-center gap-1 md:gap-2">
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
                  if (pageNum === 2 || pageNum === pagination.pageCount - 1) {
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
                    href={`/areas/${slug}?page=${pageNum}`}
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
                href={`/areas/${slug}?page=${page + 1}`}
                className="p-1.5 md:p-2 bg-[#05596B] text-white rounded-md hover:bg-[#013344] transition-colors flex items-center gap-1 shadow-md"
                scroll={false}
              >
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            )}
          </div>
        )}

        {/* About Section */}
        <div
          id="about"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
        >
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-[#013344] p-4 md:p-6 border-b flex items-center gap-2">
              About {area.name}
            </h2>
            <ScrollArea className="h-[400px] md:h-[800px] p-4 md:p-6">
              <div className="pr-4 md:pr-6">
                <div className="prose prose-sm md:prose-lg text-[#05596B] max-w-none">
                  {area.about ? (
                    <RichTextRenderer content={area.about} />
                  ) : (
                    <p className="text-base md:text-xl text-gray-500">
                      No information available about this area.
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
  );
}
