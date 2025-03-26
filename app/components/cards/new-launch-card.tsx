/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NewLaunchCardProps {
  compound: {
    id: string;
    name: string;
    slug: string;
    banner?: {
      url: string;
      formats?: {
        large?: {
          url: string;
        };
      };
    };
    area?: {
      name: string;
    };
    developer?: {
      name: string;
      logo?: {
        url: string;
      };
    };
    properties?: Array<any>;
  };
  className?: string;
  onClick?: () => void;
}

export function NewLaunchCard({
  compound,
  className,
  onClick,
}: NewLaunchCardProps) {
  return (
    <Card
      className={cn("border-0 overflow-hidden cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="relative h-[400px] sm:h-[500px]">
        {compound.banner ? (
          <Image
            src={
              compound.banner.formats?.large?.url ||
              compound.banner.url ||
              "/placeholder.svg" ||
              "/placeholder.svg"
            }
            alt={compound.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/20 to-[#05596B]/5 flex items-center justify-center">
            <span className="text-[#05596B]">No image available</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* New Launch Badge */}
        <Badge className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-orange-500 hover:bg-orange-600 text-white z-10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full">
          New Launch
        </Badge>

        {/* Developer Logo */}
        {compound.developer?.logo?.url && (
          <Avatar className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 size-16 sm:size-20 bg-white/90 p-1.5 sm:p-2 rounded-full border-2 border-white shadow-lg">
            <AvatarImage
              src={compound.developer.logo.url || "/placeholder.svg"}
              alt={compound.developer.name || "Developer"}
              className="object-contain"
            />
          </Avatar>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                {compound.name}
              </h3>
              <div className="flex items-center gap-2 text-base sm:text-xl text-white/90">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5" />
                {compound.area?.name}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {compound.properties && compound.properties.length > 0 && (
                <Badge className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5">
                  {compound.properties.length} Properties
                </Badge>
              )}
            </div>

            <Button className="bg-[#05596B] hover:bg-[#05596B]/90 rounded-full text-white px-4 sm:px-6 py-2">
              Explore Compound
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
