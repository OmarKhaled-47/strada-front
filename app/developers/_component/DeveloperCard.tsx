

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Building2, MapPin, Award, ChevronRight } from "lucide-react";
// import { useState } from "react";

// interface Developer {
//   id: number;
//   slug: string;
//   name: string;
//   areas: Array<{ name: string }>;
//   startPrice: number | null;
//   logo: { url: string } | null;
//   offers: [];
//   compounds: [];
// }

// export function DeveloperCard({ developer }: { developer: Developer }) {
//   const router = useRouter();
//   const [imageError, setImageError] = useState(false);

//   const handleCardClick = () => {
//     router.push(`/developers/${developer.slug}`);
//   };

//   return (
//     <Card
//       className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white border border-gray-100"
//       onClick={handleCardClick}
//     >
//       <CardContent className="p-0">
//         <div className="relative p-6 bg-gradient-to-b from-white to-[#F7F8F8]">
//           <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[80%]">
//             {developer.areas.slice(0, 2).map((area) => (
//               <Badge
//                 key={area.name}
//                 variant="secondary"
//                 className="bg-white/90 shadow-sm backdrop-blur-sm border border-gray-100"
//               >
//                 <MapPin className="w-3 h-3 mr-1" />
//                 {area.name}
//               </Badge>
//             ))}
//             {developer.areas.length > 2 && (
//               <Badge
//                 variant="secondary"
//                 className="bg-[#05596B]/10 text-[#05596B] shadow-sm"
//               >
//                 +{developer.areas.length - 2} more
//               </Badge>
//             )}
//           </div>
//           <div className="flex items-center gap-4 pt-6">
//             <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
//               <Image
//                 src={
//                   !imageError ? developer.logo?.url || "/logo.png" : "/logo.png"
//                 }
//                 alt={developer.name}
//                 fill
//                 className="object-contain p-2 transition-transform group-hover:scale-110"
//                 onError={() => setImageError(true)}
//               />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-[#013344] group-hover:text-[#05596B] transition-colors">
//                 {developer.name}
//               </h3>
//               <p className="text-sm text-[#05596B] flex items-center">
//                 <Building2 className="w-4 h-4 mr-1 text-[#05596B]" />
//                 {developer.compounds.length} Compounds Available
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t bg-white">
//           <div className="flex justify-between items-center">
//             <span className="text-sm font-medium text-[#05596B]">
//               Starting price
//             </span>
//             {developer.startPrice ? (
//               <div className="text-right">
//                 <p className="text-lg font-semibold text-[#05596B]">
//                   {developer.startPrice.toLocaleString()} EGP
//                 </p>
//               </div>
//             ) : (
//               <p className="text-sm font-medium text-[#05596B]">Coming Soon</p>
//             )}
//           </div>
//           <div className="mt-4 flex justify-between items-center">
//             <div className="flex items-center gap-1 text-xs text-[#05596B]">
//               <Award className="w-3 h-3" />
//               <span>Premium Developer</span>
//             </div>
//             <span className="text-[#05596B] text-sm flex items-center gap-0.5 font-medium">
//               View <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Building2, MapPin, Award, ChevronRight, Tag } from "lucide-react"
import { useState } from "react"

interface Developer {
  id: number
  slug: string
  name: string
  areas: Array<{ name: string }>
  startPrice: number | null
  logo: { url: string } | null
  offers: []
  compounds: []
}

export function DeveloperCard({ developer }: { developer: Developer }) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  const handleCardClick = () => {
    router.push(`/developers/${developer.slug}`)
  }

  const hasOffers = developer.offers && developer.offers.length > 0

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer border-0"
      onClick={handleCardClick}
    >
      <div className="relative h-72 bg-gradient-to-b from-[#F7F8F8] to-[#E6F7F6]">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5"></div>

        {/* Logo centered */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 z-10">
          <Image
            src={!imageError ? developer.logo?.url || "/logo.png" : "/logo.png"}
            alt={developer.name}
            fill
            className="object-contain p-3 transition-transform group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#013344]/80 via-[#013344]/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05596B]/30 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      <CardContent className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div className="space-y-2">
          <Badge className="bg-white/90 hover:bg-white text-[#013344] font-medium px-3 py-1.5">
            <Building2 className="w-3 h-3 mr-1" />
            {hasOffers ? "Special Offers Available" : "Premium Developer"}
          </Badge>
        </div>

        {/* Bottom Section */}
        <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          {/* Title with animated underline */}
          <div className="relative inline-block mb-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">{developer.name}</h3>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
            {developer.areas.slice(0, 3).map((area) => (
              <Badge
                key={area.name}
                variant="secondary"
                className="bg-white/20 text-white/90 shadow-sm backdrop-blur-sm"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {area.name}
              </Badge>
            ))}
            {developer.areas.length > 3 && (
              <Badge variant="secondary" className="bg-white/30 text-white shadow-sm">
                +{developer.areas.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/90">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">{developer.compounds.length} Compounds</span>
              {hasOffers && (
                <span className="flex items-center text-sm font-medium ml-2">
                  <Tag className="w-3 h-3 mr-1" />
                  {developer.offers.length} Offers
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {developer.startPrice ? (
                <span className="text-white text-sm font-medium">From {developer.startPrice.toLocaleString()} EGP</span>
              ) : (
                <span className="text-white/80 text-sm font-medium">Coming Soon</span>
              )}
              <span className="text-white text-sm flex items-center gap-0.5 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                View <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Premium badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#05596B]/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
        <Award className="w-3 h-3" />
        <span>Premium</span>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </Card>
  )
}

