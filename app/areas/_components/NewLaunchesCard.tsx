"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Custom Image Loader
const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const baseUrl = src.split("?")[0];
  return `${baseUrl}?w=${width}&q=${quality || 75}`;
};

interface CompoundCardProps {
  compound: {
    id: number;
    name: string;
    slug: string;
    banner?: {
      url: string;
    };
    offer?: {
      blocks: Array<{
        paymentDuration?: number;
        paymentPercentage?: number;
        isOriginalPlan?: boolean;
      }>;
    };
  };
}

export default function NewLaunchesCard({ compound }: CompoundCardProps) {
  const { offer } = compound;
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    router.push(`/compounds/${compound.slug}`);
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border-0"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
          {compound.banner?.url ? (
            <Image
              loader={imageLoader}
              src={compound.banner.url || "/placeholder.svg"}
              alt={compound.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 rounded-lg ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#013344] to-[#028180] rounded-lg" />
          )}

          {/* Loading skeleton */}
          {!imageLoaded && compound.banner?.url && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}

          {offer &&
            offer.blocks &&
            offer.blocks.some((block) => block?.isOriginalPlan === false) && (
              <div className="absolute -right-12 top-6 rotate-45 bg-[#e4a62c] px-12 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                New Offer
              </div>
            )}
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300 rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-lg" />

          {/* New Launch Badge */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-2 animate-fade-in">
            <Badge className="bg-white/90 hover:bg-white text-[#013344] font-medium px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm shadow-md">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#028180]" />
              New Launch
            </Badge>
          </div>

          {/* Content Container */}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {/* Title with animated underline */}
            <div className="relative inline-block">
              <h3 className="text-lg md:text-2xl font-semibold text-white mb-1 md:mb-2 tracking-tight line-clamp-2">
                {compound.name}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full" />
            </div>

            {/* Coming Soon Text */}
            <p className="text-white/80 text-xs md:text-sm mt-1 md:mt-2 font-medium tracking-wide opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              Coming Soon • Register Your Interest
            </p>
          </div>
        </div>
      </CardContent>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </Card>
  );
}
