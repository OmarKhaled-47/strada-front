/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
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
    startPrice?: number;
    properties?: [];
    area?: {
      name: string;
    };
    offer?: {
      blocks: Array<{
        paymentDuration?: number;
        paymentPercentage?: number;
        isOriginalPlan?: boolean;
      }>;
    };
    developer?: {
      name: string;
      logo?: {
        url: string;
      };
    };
  };
}

export default function CompoundCard({ compound }: CompoundCardProps) {
  const { offer, developer } = compound;
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    router.push(`/compounds/${compound.slug}`);
  };

  return (
    <Card
      className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-100 rounded-xl"
      onClick={handleCardClick}
    >
      {/* Banner Image with Custom Loader */}
      <div className="relative aspect-video bg-gray-100">
        {compound.banner?.url ? (
          <Image
            loader={imageLoader}
            src={compound.banner.url || "/placeholder.svg"}
            alt={compound.name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#013344]/20 to-[#013344]/10 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-[#013344]/50">
              {compound.name}
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && compound.banner?.url && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Offer Badge */}
        {offer &&
          offer.blocks &&
          offer.blocks.some(
            (block: any) => block?.isOriginalPlan === false
          ) && (
            <div className="absolute -right-12 top-6 rotate-45 bg-[#e4a62c] px-12 py-1 text-xs font-semibold text-primary-foreground shadow-md">
              New Offer
            </div>
          )}

        {/* Developer Logo */}
        {compound.developer?.logo?.url && (
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
            <Avatar className="border-2 border-white size-12 md:size-16 bg-white/90 p-2 md:p-3 shadow-md">
              {compound.developer?.logo?.url ? (
                <AvatarImage
                  src={compound.developer.logo.url}
                  alt={compound.developer.name}
                  className="object-contain"
                />
              ) : (
                <AvatarFallback className="bg-[#013344] text-white text-xs md:text-sm">
                  {compound.developer?.name?.charAt(0).toUpperCase() || "D"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        )}
      </div>

      <CardContent className="p-3 md:p-4">
        <div className="flex justify-between items-start mb-3 md:mb-5 gap-2 md:gap-4">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#013344] mb-0.5 md:mb-1 line-clamp-1">
              {compound.name}
            </h3>
            <p className="text-xs md:text-sm text-[#05596B] line-clamp-1">
              {compound.area?.name || "Coming Soon"}
            </p>
          </div>
          <div className="text-right">
            {compound.startPrice ? (
              <>
                <p className="text-sm md:text-lg font-semibold text-[#028180] line-clamp-1">
                  {compound.startPrice.toLocaleString()} EGP
                </p>
              </>
            ) : (
              <p className="text-xs md:text-sm text-[#05596B]">Prices TBA</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-[#05596B]">
            <p>
              <span className="font-medium">Properties:</span>{" "}
              {compound.properties?.length || 0}
            </p>
            <p>
              <span className="font-medium">Developer:</span>{" "}
              {developer?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex items-center gap-2 flex-row justify-end">
          <div className="flex items-center gap-2">
            <CallButton phoneNumber="+0201123960001" variant="rounded" />
          </div>
          <div className="flex items-center gap-2">
            <WhatsAppButton
              phoneNumber="+0201123960001"
              message={"message"}
              variant="rounded"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
