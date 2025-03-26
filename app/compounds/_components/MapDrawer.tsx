// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { MapPin, Navigation, Share2, Maximize2, Minimize2 } from "lucide-react";
// import dynamic from "next/dynamic";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// // Dynamically import the Map component to avoid SSR issues
// const Map = dynamic(() => import("./Map"), { ssr: false });

// interface MapDrawerProps {
//   locationOnMap: {
//     lat: number;
//     lng: number;
//   };
//   compoundName: string;
//   areaName?: string;
// }

// export function MapDrawer({
//   locationOnMap,
//   compoundName,
//   areaName,
// }: MapDrawerProps) {
//   const [open, setOpen] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const handleShare = async () => {
//     try {
//       await navigator.share({
//         title: `${compoundName} Location`,
//         text: `Check out ${compoundName}'s location${areaName ? ` in ${areaName}` : ""}`,
//         url: `https://maps.google.com/?q=${locationOnMap.lat},${locationOnMap.lng}`,
//       });
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   const handleNavigate = () => {
//     window.open(
//       `https://www.google.com/maps/dir/?api=1&destination=${locationOnMap.lat},${locationOnMap.lng}`,
//       "_blank"
//     );
//   };

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button
//           variant="outline"
//           className="bg-white/80 hover:bg-white text-[#013344] border-[#013344]/20 w-full sm:w-auto"
//         >
//           <MapPin className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
//           <span className="hidden sm:inline">Location</span>
//           <span className="sm:hidden">Map</span>
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent
//         className={cn(
//           "h-[95vh] max-w-full transition-all duration-300",
//           isFullscreen
//             ? "!fixed inset-0 h-screen max-w-none rounded-none"
//             : "sm:max-w-3xl sm:ml-auto"
//         )}
//       >
//         <div className="mx-auto w-full max-w-7xl">
//           <DrawerHeader className="relative">
//             <DrawerTitle className="text-xl sm:text-2xl flex items-center gap-2">
//               <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#05596B]" />
//               {compoundName} Location
//             </DrawerTitle>
//             <DrawerDescription>
//               {areaName ? (
//                 <Badge variant="secondary" className="mt-2">
//                   Located in {areaName}
//                 </Badge>
//               ) : (
//                 "View the compound location on the map"
//               )}
//             </DrawerDescription>
//             <div className="absolute right-4 top-4 flex gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="rounded-full hidden sm:flex"
//                 onClick={handleShare}
//               >
//                 <Share2 className="h-4 w-4" />
//                 <span className="sr-only">Share location</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="rounded-full"
//                 onClick={handleNavigate}
//               >
//                 <Navigation className="h-4 w-4" />
//                 <span className="sr-only">Navigate to location</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="rounded-full"
//                 onClick={() => setIsFullscreen(!isFullscreen)}
//               >
//                 {isFullscreen ? (
//                   <Minimize2 className="h-4 w-4" />
//                 ) : (
//                   <Maximize2 className="h-4 w-4" />
//                 )}
//                 <span className="sr-only">Toggle fullscreen</span>
//               </Button>
//             </div>
//           </DrawerHeader>
//           <div
//             className={cn(
//               "relative transition-all duration-300",
//               isFullscreen ? "h-[calc(100vh-8rem)]" : "h-[calc(90vh-10rem)]",
//               "w-full p-4 "
//             )}
//           >
//             <Map
//               latitude={locationOnMap.lat}
//               longitude={locationOnMap.lng}
//               compoundName={compoundName}
//               areaName={areaName}
//             />
//           </div>
//           <DrawerFooter className="flex-row justify-between items-center">
//             <div className="text-xs sm:text-sm text-muted-foreground">
//               <p>Latitude: {locationOnMap.lat}</p>
//               <p>Longitude: {locationOnMap.lng}</p>
//             </div>
//             <DrawerClose asChild>
//               <Button variant="outline">Close</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MapPin, Navigation, Share2, Maximize2, Minimize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("./Map"), { ssr: false });

interface MapDrawerProps {
  locationOnMap: {
    lat: number;
    lng: number;
  };
  compoundName: string;
  areaName?: string;
}

export function MapDrawer({
  locationOnMap,
  compoundName,
  areaName,
}: MapDrawerProps) {
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${compoundName} Location`,
        text: `Check out ${compoundName}'s location${areaName ? ` in ${areaName}` : ""}`,
        url: `https://maps.google.com/?q=${locationOnMap.lat},${locationOnMap.lng}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleNavigate = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${locationOnMap.lat},${locationOnMap.lng}`,
      "_blank"
    );
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/80 hover:bg-white text-[#013344] border-[#013344]/20 w-full sm:w-auto"
        >
          <MapPin className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden sm:inline">Location</span>
          <span className="sm:hidden">Map</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "h-[95vh] max-w-full transition-all duration-300",
          isFullscreen
            ? "!fixed inset-0 h-screen max-w-none rounded-none"
            : "sm:max-w-3xl sm:ml-auto"
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader className="relative">
            <DrawerTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#05596B]" />
              {compoundName} Location
            </DrawerTitle>
            <DrawerDescription>
              {areaName ? (
                <Badge variant="secondary" className="mt-2">
                  Located in {areaName}
                </Badge>
              ) : (
                "View the compound location on the map"
              )}
            </DrawerDescription>
            <div className="absolute right-4 top-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hidden sm:flex"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share location</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handleNavigate}
              >
                <Navigation className="h-4 w-4" />
                <span className="sr-only">Navigate to location</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle fullscreen</span>
              </Button>
            </div>
          </DrawerHeader>
          <div
            className={cn(
              "relative transition-all duration-300",
              isFullscreen ? "h-[calc(100vh-8rem)]" : "h-[calc(90vh-10rem)]",
              "w-full p-4 "
            )}
          >
            <Map
              latitude={locationOnMap.lat}
              longitude={locationOnMap.lng}
              compoundName={compoundName}
              areaName={areaName}
            />
          </div>
          <DrawerFooter className="flex-row justify-between items-center">
            <div className="text-xs sm:text-sm text-muted-foreground">
              <p>Latitude: {locationOnMap.lat}</p>
              <p>Longitude: {locationOnMap.lng}</p>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
