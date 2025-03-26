/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Building, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AreaCardProps {
  area: {
    id: string;
    name: string;
    slug: string;
    banner?: {
      url: string;
    };
    compounds?: Array<any>;
  };
  className?: string;
}

export function AreaCard({ area, className }: AreaCardProps) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className={cn("block w-full", className)}
    >
      <div className="group relative h-[280px] sm:h-[320px] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
        {area.banner?.url ? (
          <Image
            src={area.banner.url || "/placeholder.svg"}
            alt={area.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/20 to-[#05596B]/5 flex items-center justify-center">
            <span className="text-[#05596B]">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003344]/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {area.name}
          </h3>
          <div className="flex items-center justify-between text-white/80 text-sm">
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              <span>{area.compounds?.length || 0} Compounds</span>
            </div>
            <div className="size-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#05596B] transition-colors">
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
