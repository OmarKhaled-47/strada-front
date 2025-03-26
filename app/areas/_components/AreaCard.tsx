import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Building2, MapPin, Tag, ChevronRight } from "lucide-react";

interface AreaCardProps {
  area: {
    id: number;
    name: string;
    description: string;
    banner: {
      url: string;
    };
    compounds: {
      count: number;
    };
    developers?: Array<{
      offer?: {
        blocks: [];
      };
    }>;
  };
}

function AreaCard({ area }: AreaCardProps) {
  const developerOffers = area.developers?.flatMap(
    (dev) => dev.offer?.blocks || []
  );

  const hasOffers = developerOffers && developerOffers.length > 0;

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer border-0">
      <div className="relative h-72">
        <Image
          src={area.banner?.url || "/placeholder.svg"}
          alt={area.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05596B]/30 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      <CardContent className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div className="space-y-2">
          <Badge className="bg-white/90 hover:bg-white text-[#013344] font-medium px-3 py-1.5">
            <MapPin className="w-3 h-3 mr-1" />
            {hasOffers ? "Special Offers Available" : "Featured Destination"}
          </Badge>
        </div>

        {/* Bottom Section */}
        <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          {/* Title with animated underline */}
          <div className="relative inline-block mb-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {area.name}
            </h3>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full" />
          </div>

          <p className="text-white/80 text-sm line-clamp-2 mb-4 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
            {area.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/90">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {area.compounds.count} Compounds
              </span>
              {hasOffers && (
                <span className="flex items-center text-sm font-medium ml-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {developerOffers.length} Offers
                </span>
              )}
            </div>

            <span className="text-white text-sm flex items-center gap-0.5 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
              Explore <ChevronRight className="w-3 h-3" />
            </span>
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

export default AreaCard;
