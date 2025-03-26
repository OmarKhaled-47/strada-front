

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Award, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Developer {
  id: number;
  slug: string;
  name: string;
  areas: Array<{ name: string }>;
  startPrice: number | null;
  logo: { url: string } | null;
  offers: [];
  compounds: [];
}

export function DeveloperCard({ developer }: { developer: Developer }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    router.push(`/developers/${developer.slug}`);
  };

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white border border-gray-100"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative p-6 bg-gradient-to-b from-white to-[#F7F8F8]">
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[80%]">
            {developer.areas.slice(0, 2).map((area) => (
              <Badge
                key={area.name}
                variant="secondary"
                className="bg-white/90 shadow-sm backdrop-blur-sm border border-gray-100"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {area.name}
              </Badge>
            ))}
            {developer.areas.length > 2 && (
              <Badge
                variant="secondary"
                className="bg-[#05596B]/10 text-[#05596B] shadow-sm"
              >
                +{developer.areas.length - 2} more
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 pt-6">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
              <Image
                src={
                  !imageError ? developer.logo?.url || "/logo.png" : "/logo.png"
                }
                alt={developer.name}
                fill
                className="object-contain p-2 transition-transform group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#013344] group-hover:text-[#05596B] transition-colors">
                {developer.name}
              </h3>
              <p className="text-sm text-[#05596B] flex items-center">
                <Building2 className="w-4 h-4 mr-1 text-[#05596B]" />
                {developer.compounds.length} Compounds Available
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#05596B]">
              Starting price
            </span>
            {developer.startPrice ? (
              <div className="text-right">
                <p className="text-lg font-semibold text-[#05596B]">
                  {developer.startPrice.toLocaleString()} EGP
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium text-[#05596B]">Coming Soon</p>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs text-[#05596B]">
              <Award className="w-3 h-3" />
              <span>Premium Developer</span>
            </div>
            <span className="text-[#05596B] text-sm flex items-center gap-0.5 font-medium">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
