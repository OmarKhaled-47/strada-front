import { Metadata } from "next";
import { LogoSlider } from "./_components/LogoSlider";
import { HeroSection } from "./_components/HeroSection";
import { TopAreasSlider } from "./components/sliders/top-areas-slider";
import { TopCompoundsSlider } from "./components/sliders/top-compounds-slider";
import { NewLaunchesSlider } from "./components/sliders/new-launches-slider";
import { RecommendedPropertiesSlider } from "./components/sliders/recommended-properties-slider";

export const metadata: Metadata = {
  title: "Strada Properties | Premier Real Estate Brokerage",
  description:
    "Discover exclusive property listings, connect with expert agents, and find your perfect home with Strada Properties, your trusted real estate brokerage.",
  alternates: {
    canonical: "/",
  },
};
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#003344] mb-2">
              Our Trusted Partners
            </h2>
            <p className="text-gray-600">
              Working with Egypt&apos;s leading real estate developers
            </p>
          </div>
          <LogoSlider />
        </div>
      </section>
      {/* New Launches Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <NewLaunchesSlider />
        </div>
      </section>

      {/* Top Compounds Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TopCompoundsSlider />
        </div>
      </section>

      {/* Top Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <TopAreasSlider />
        </div>
      </section>

      {/* Recommended Properties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <RecommendedPropertiesSlider />
        </div>
      </section>
    </main>
  );
}
