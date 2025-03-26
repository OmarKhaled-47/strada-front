// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Icon } from "leaflet";
// import { Button } from "@/components/ui/button";
// import { Locate } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Custom marker icon
// const customIcon = new Icon({
//   iconUrl: "/marker-icon.png",
//   iconSize: [50, 50],
//   iconAnchor: [25, 50],
//   popupAnchor: [0, -50],
//   shadowSize: [41, 41],
// });

// interface MapProps {
//   latitude: number;
//   longitude: number;
//   compoundName: string;
//   areaName?: string;
//   className?: string;
//   height?: string;
// }

// // Recenter map component
// function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView([lat, lng]);
//   }, [lat, lng, map]);
//   return null;
// }

// // Location button component
// function LocationButton() {
//   const map = useMap();
//   const [loading, setLoading] = useState(false);

//   const handleClick = () => {
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         map.setView(
//           [position.coords.latitude, position.coords.longitude],
//           map.getZoom()
//         );
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       className="absolute top-4 right-4 z-[1000] bg-white shadow-lg hover:bg-gray-100"
//       onClick={handleClick}
//       disabled={loading}
//       aria-label="Find my location"
//     >
//       <Locate className={loading ? "animate-spin" : ""} />
//       <span className="sr-only">Find my location</span>
//     </Button>
//   );
// }

// export default function Map({
//   latitude,
//   longitude,
//   compoundName,
//   areaName,
//   className,
//   height = "100%",
// }: MapProps) {
//   return (
//     <div
//       className={cn(
//         "relative w-full rounded-lg overflow-hidden shadow-lg",
//         className
//       )}
//       style={{ height }}
//     >
//       <MapContainer
//         center={[latitude, longitude]}
//         zoom={15}
//         style={{ height: "100%", width: "100%" }}
//         className="z-0"
//         attributionControl={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[latitude, longitude]} icon={customIcon}>
//           <Popup>
//             <div className="p-2">
//               <h3 className="font-bold mb-1">{compoundName}</h3>
//               {areaName && <p className="text-sm text-gray-600">{areaName}</p>}
//             </div>
//           </Popup>
//         </Marker>
//         <RecenterMap lat={latitude} lng={longitude} />
//         <LocationButton />
//       </MapContainer>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Button } from "@/components/ui/button";
import { Locate } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
  shadowSize: [41, 41],
});

interface MapProps {
  latitude: number;
  longitude: number;
  compoundName: string;
  areaName?: string;
  className?: string;
  height?: string;
}

// Recenter map component
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

// Location button component
function LocationButton() {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.setView(
          [position.coords.latitude, position.coords.longitude],
          map.getZoom()
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-4 right-4 z-[1000] bg-white shadow-lg hover:bg-gray-100"
      onClick={handleClick}
      disabled={loading}
      aria-label="Find my location"
    >
      <Locate className={loading ? "animate-spin" : ""} />
      <span className="sr-only">Find my location</span>
    </Button>
  );
}

export default function Map({
  latitude,
  longitude,
  compoundName,
  areaName,
  className,
  height = "100%",
}: MapProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden shadow-lg",
        className
      )}
      style={{ height }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold mb-1">{compoundName}</h3>
              {areaName && <p className="text-sm text-gray-600">{areaName}</p>}
            </div>
          </Popup>
        </Marker>
        <RecenterMap lat={latitude} lng={longitude} />
        <LocationButton />
      </MapContainer>
    </div>
  );
}
