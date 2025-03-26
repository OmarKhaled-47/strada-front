/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeveloperCard } from "./_component/DeveloperCard";
import { LoadingCard } from "./_component/LoadingCard";
import GetDeveloperApi from "../api/DeveloperApi";
import { Building2, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate Developers | Strada Properties",
  description:
    "Discover top real estate developers partnered with Strada Properties. Explore their projects, compounds, and properties in prime locations.",
  alternates: {
    canonical: "/developers",
  },
  openGraph: {
    title: "Real Estate Developers | Strada Properties",
    description:
      "Discover top real estate developers partnered with Strada Properties. Explore their projects, compounds, and properties in prime locations.",
    url: "/developers",
  },
};
async function getDevelopers() {
  try {
    const response = await GetDeveloperApi.getDeveloper();
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch developers:", error);
    notFound();
  }
}

function LoadingState() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return (
    <main className="min-h-screen bg-[#F7F8F8]">
      <div className="bg-gradient-to-r from-[#013344] to-[#05596B] text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Real Estate Developers</h1>
            <p className="text-xl text-gray-200 mb-6">
              Discover top real estate developers and their exclusive properties
              across the country
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/search"
                className="bg-white text-[#013344] px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </Link>
              <Link
                href="/new-launches"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                New Launches
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#013344]">
            Browse All Developers
          </h2>
          <div className="text-[#05596B]">
            {developers.length} Developers Available
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          {developers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {developers.map((developer: any) => (
                <DeveloperCard key={developer.slug} developer={developer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-[#013344] mb-2">
                  No Developers Found
                </h3>
                <p className="text-[#05596B]">
                  We couldn&apos;t find any developers matching your criteria.
                  Please try adjusting your search.
                </p>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
