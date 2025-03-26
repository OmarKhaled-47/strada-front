// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { useFavorites } from "./contexts/FavoritesContext";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   MapPin,
//   Home,
//   Building,
//   Search,
//   ChevronRight,
//   Trash2,
//   ExternalLink,
//   Gift,
//   Building2,
//   Bed,
//   Bath,
//   Maximize2,
//   Calendar,
//   Sparkle,
//   TrendingUp,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import GetCompoundApi from "@/app/api/CompoundApi";
// import GetPropertyApi from "@/app/api/PropertyApi";
// import { motion, AnimatePresence } from "framer-motion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { CallButton } from "@/components/CallButton";
// import { WhatsAppButton } from "@/components/WhatsAppBtn";
// import axiosClient from "@/app/api/axiosClient";
// import { Separator } from "@/components/ui/separator";

// interface CompoundCardProps {
//   compound: any;
//   onRemove: () => void;
// }

// export default function FavoritesPage() {
//   const { favorites, removeFromFavorites } = useFavorites();
//   const [activeTab, setActiveTab] = useState<"compounds" | "properties">(
//     "compounds"
//   );
//   const [favoriteCompounds, setFavoriteCompounds] = useState<any[]>([]);
//   const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       setLoading(true);

//       try {
//         // Fetch favorite compounds
//         if (favorites.compounds.length > 0) {
//           const compoundPromises = favorites.compounds.map(async (item) => {
//             try {
//               const response = await GetCompoundApi.getCompoundApi(
//                 item.slug || item.id
//               );
//               return response.data.data[0];
//             } catch (error) {
//               console.error(`Failed to fetch compound ${item.id}:`, error);
//               return null;
//             }
//           });

//           const compounds = await Promise.all(compoundPromises);
//           setFavoriteCompounds(compounds.filter(Boolean));
//         } else {
//           setFavoriteCompounds([]);
//         }

//         // Fetch favorite properties
//         if (favorites.properties.length > 0) {
//           const propertyPromises = favorites.properties.map(async (item) => {
//             try {
//               // First try to get the property directly
//               const response = await GetPropertyApi.getPropertyBySlug(
//                 item.slug || item.id
//               );

//               if (response.data.data && response.data.data.length > 0) {
//                 return response.data.data[0];
//               }

//               // If that fails, try to get it from the compound
//               if (item.compoundSlug) {
//                 const compoundResponse =
//                   await GetCompoundApi.getCompoundWithProperty(
//                     item.compoundSlug
//                   );
//                 const compound = compoundResponse.data.data[0];
//                 if (compound && compound.properties) {
//                   const property = compound.properties.find(
//                     (p: any) => p.id === item.id || p.slug === item.slug
//                   );
//                   if (property) {
//                     property.compound = {
//                       name: compound.name,
//                       slug: compound.slug,
//                       developer: compound.developer,
//                     };
//                     return property;
//                   }
//                 }
//               }
//               return null;
//             } catch (error) {
//               console.error(`Failed to fetch property ${item.id}:`, error);
//               return null;
//             }
//           });

//           const properties = await Promise.all(propertyPromises);
//           setFavoriteProperties(properties.filter(Boolean));
//         } else {
//           setFavoriteProperties([]);
//         }
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, [favorites]);

//   return (
//     <div className="min-h-screen bg-[#F7F8F8]">
//       {/* Hero Section */}
//       <div className="relative h-[200px] md:h-[400px] overflow-hidden">
//         <Image
//           src="/search-header.png"
//           alt="Favorites"
//           fill
//           priority
//           className="object-cover"
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#013344]/90 to-[#013344]/60" />

//         <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
//           <h1 className="text-3xl md:text-4xl font-bold mb-2">My Favorites</h1>
//           <p className="text-lg max-w-2xl">
//             Your collection of dream properties and compounds
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-28 relative z-10">
//         <Card className="border-none shadow-md mb-6">
//           <CardContent className="p-5">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
//               <div>
//                 <h2 className="text-xl font-bold text-[#013344]">
//                   Saved Items
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   {favorites.compounds.length + favorites.properties.length}{" "}
//                   items in your collection
//                 </p>
//               </div>
//             </div>

//             <Tabs
//               defaultValue="compounds"
//               value={activeTab}
//               onValueChange={(value) =>
//                 setActiveTab(value as "compounds" | "properties")
//               }
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-2 mb-5 bg-[#F7F8F8] p-1 rounded-lg">
//                 <TabsTrigger
//                   value="compounds"
//                   className="data-[state=active]:bg-[#05596B] data-[state=active]:text-white rounded-md text-sm"
//                 >
//                   <Building className="h-4 w-4 mr-2" />
//                   Compounds ({favorites.compounds.length})
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="properties"
//                   className="data-[state=active]:bg-[#05596B] data-[state=active]:text-white rounded-md text-sm"
//                 >
//                   <Home className="h-4 w-4 mr-2" />
//                   Properties ({favorites.properties.length})
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="compounds" className="mt-0">
//                 {loading ? (
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {[1, 2, 3, 4].map((i) => (
//                       <Card
//                         key={i}
//                         className="animate-pulse bg-white border-none shadow-sm"
//                       >
//                         <div className="flex flex-col sm:flex-row">
//                           <div className="bg-gray-200 sm:w-[30%] h-48"></div>
//                           <CardContent className="p-4 flex-1">
//                             <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
//                             <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
//                             <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
//                             <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
//                             <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
//                           </CardContent>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : favorites.compounds.length === 0 ? (
//                   <EmptyState
//                     type="compounds"
//                     title="No saved compounds"
//                     description="You haven't saved any compounds yet. Browse compounds and click the heart icon to add them to your favorites."
//                     buttonText="Browse Compounds"
//                     buttonLink="/search?type=compounds"
//                   />
//                 ) : (
//                   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     <AnimatePresence>
//                       {favoriteCompounds.map((compound) => (
//                         <motion.div
//                           key={compound.id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -20 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <CompoundCard
//                             compound={compound}
//                             onRemove={() =>
//                               removeFromFavorites(compound.id, "compound")
//                             }
//                           />
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="properties" className="mt-0">
//                 {loading ? (
//                   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     {[1, 2, 3, 4, 5, 6].map((i) => (
//                       <Card
//                         key={i}
//                         className="animate-pulse bg-white border-none shadow-sm h-full"
//                       >
//                         <div className="bg-gray-200 h-44"></div>
//                         <CardContent className="p-4">
//                           <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                           <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
//                           <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
//                           <div className="grid grid-cols-3 gap-2 mb-3">
//                             <div className="h-4 bg-gray-200 rounded"></div>
//                             <div className="h-4 bg-gray-200 rounded"></div>
//                             <div className="h-4 bg-gray-200 rounded"></div>
//                           </div>
//                           <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
//                           <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : favorites.properties.length === 0 ? (
//                   <EmptyState
//                     type="properties"
//                     title="No saved properties"
//                     description="You haven't saved any properties yet. Browse properties and click the heart icon to add them to your favorites."
//                     buttonText="Browse Properties"
//                     buttonLink="/search?type=properties"
//                   />
//                 ) : (
//                   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     <AnimatePresence>
//                       {favoriteProperties.map((property) => (
//                         <motion.div
//                           key={property.id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -20 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <PropertyCard
//                             property={property}
//                             onRemove={() =>
//                               removeFromFavorites(property.id, "property")
//                             }
//                           />
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// function EmptyState({
//   type,
//   title,
//   description,
//   buttonText,
//   buttonLink,
// }: {
//   type: "compounds" | "properties";
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonLink: string;
// }) {
//   return (
//     <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//       <div className="mx-auto w-16 h-16 rounded-full bg-[#F7F8F8] flex items-center justify-center mb-4">
//         {type === "compounds" ? (
//           <Building className="h-8 w-8 text-gray-400" />
//         ) : (
//           <Home className="h-8 w-8 text-gray-400" />
//         )}
//       </div>
//       <h3 className="text-lg font-semibold text-[#013344] mb-2">{title}</h3>
//       <p className="text-gray-500 mb-5 max-w-md mx-auto text-sm">
//         {description}
//       </p>
//       <Button asChild className="bg-[#05596B] hover:bg-[#05596B]/90">
//         <Link href={buttonLink}>
//           <Search className="h-4 w-4 mr-2" />
//           {buttonText}
//         </Link>
//       </Button>
//     </div>
//   );
// }

// export function CompoundCard({ compound, onRemove }: CompoundCardProps) {
//   const [developerLogo, setDeveloperLogo] = useState<string | null>(null);
//   const [developerName, setDeveloperName] =
//     useState<string>("Unknown Developer");
//   const [showMore, setShowMore] = useState(false);
//   const [, setIsHovered] = useState(false);
//   const [hasNonOriginalPlan, setHasNonOriginalPlan] = useState(false);

//   useEffect(() => {
//     if (!compound) return;

//     const fetchDeveloperData = async () => {
//       try {
//         const response = await GetCompoundApi.getCompoundWithDeveloper(
//           compound.slug
//         );
//         const developerData = response.data.data[0]?.developer;

//         if (developerData) {
//           setDeveloperLogo(developerData.logo?.url || null);
//           setDeveloperName(developerData.name || "Unknown Developer");
//         }
//       } catch (error) {
//         console.error("Failed to fetch developer data:", error);
//       }
//     };

//     const fetchOfferData = async () => {
//       try {
//         const response = await axiosClient.get(
//           `/compounds?filters[id][$eq]=${compound.id}&populate[0]=offer.blocks`
//         );
//         const compoundData = response.data.data[0];

//         if (
//           compoundData?.offer?.blocks &&
//           Array.isArray(compoundData.offer.blocks)
//         ) {
//           // Check if any block has isOriginalPlan=false
//           const hasSpecialOffer = compoundData.offer.blocks.some(
//             (block: any) => block.isOriginalPlan === false
//           );
//           setHasNonOriginalPlan(hasSpecialOffer);
//         }
//       } catch (error) {
//         console.error("Failed to fetch offer data:", error);
//       }
//     };

//     fetchDeveloperData();
//     fetchOfferData();
//   }, [compound]);

//   if (!compound) return null;

//   const bannerUrl =
//     compound.banner?.url || "/placeholder.svg?height=300&width=400";
//   const areaName = compound.area?.name || "Unknown Location";
//   const propertyTypes = Array.isArray(compound.propertyTypes)
//     ? compound.propertyTypes
//     : Array.isArray(compound.properties)
//       ? compound.properties
//           .map((property: any) => property.propertyType)
//           .filter(Boolean)
//       : [];

//   const uniquePropertyTypes = [...new Set(propertyTypes)];
//   let propertyTypesDisplay = "";

//   if (uniquePropertyTypes.length > 0) {
//     const displayTypes = uniquePropertyTypes.slice(0, 3);
//     propertyTypesDisplay = displayTypes.join(" | ");

//     if (uniquePropertyTypes.length > 3) {
//       propertyTypesDisplay += ` | +${uniquePropertyTypes.length - 3} More`;
//     }
//   }

//   const compoundUrl = `/compounds/${compound.slug || compound.id}`;

//   // Format delivery date
//   const deliveryDate = compound.deliveryDate || "2025";

//   return (
//     <Card
//       className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white rounded-xl"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex flex-col">
//         {/* Image Section */}
//         <div className="relative h-[220px] overflow-hidden">
//           <Image
//             src={bannerUrl || "/placeholder.svg"}
//             alt={compound.name || "Compound"}
//             fill
//             className="object-cover transition-transform duration-700 ease-in-out"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//           {/* Top Badges */}
//           <div className="absolute top-3 left-3 flex flex-wrap gap-2">
//             {compound.isNewLaunch && (
//               <Badge className="bg-[#E3A325] text-white font-medium px-2.5 py-1 rounded-md">
//                 <Sparkle className="h-3.5 w-3.5 mr-1" fill="currentColor" /> New
//                 Launch
//               </Badge>
//             )}
//             {compound.isTrendingProject && (
//               <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1 rounded-md">
//                 <TrendingUp className="h-3.5 w-3.5 mr-1" fill="currentColor" />{" "}
//                 Trending
//               </Badge>
//             )}
//             {compound.isRecommended && (
//               <Badge className="bg-[#05596B] text-white font-medium px-2.5 py-1 rounded-md">
//                 Recommended
//               </Badge>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="absolute top-3 right-3 flex gap-2">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 onRemove();
//               }}
//               className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
//               aria-label="Remove from favorites"
//             >
//               <Trash2 className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Developer Logo */}
//           <div className="absolute bottom-3 right-3">
//             <Avatar className="border-2 border-white h-14 w-14 bg-white/90 shadow-md">
//               {developerLogo ? (
//                 <AvatarImage
//                   src={developerLogo}
//                   alt={developerName}
//                   className="object-contain p-1"
//                 />
//               ) : (
//                 <AvatarFallback className="bg-[#05596B] text-white">
//                   {developerName.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               )}
//             </Avatar>
//           </div>

//           {/* Title & Location */}
//           <div className="absolute bottom-3 left-3 right-20">
//             <div className="flex items-center gap-1.5 text-white/90">
//               <MapPin className="h-3.5 w-3.5" />
//               <span className="text-sm font-medium">{areaName}</span>
//             </div>
//             <h3 className="font-bold text-xl text-white mt-1 line-clamp-1">
//               {compound.name}
//             </h3>
//           </div>
//         </div>

//         {/* Content Section */}
//         <CardContent className="p-5">
//           {/* Developer & Property Types */}
//           <div className="flex items-center gap-2 mb-4">
//             <Badge
//               variant="outline"
//               className="text-xs border-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1"
//             >
//               By {developerName}
//             </Badge>

//             {hasNonOriginalPlan && (
//               <Badge className="bg-[#E3A325]/20 text-[#E3A325] font-medium flex items-center gap-1">
//                 <Gift className="h-3.5 w-3.5" />
//                 Special Offer
//               </Badge>
//             )}
//           </div>

//           {/* Key Details */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             {propertyTypesDisplay && (
//               <div>
//                 <h4 className="text-xs text-gray-500 mb-1">Property Types</h4>
//                 <p className="text-sm font-medium text-[#013344]">
//                   {propertyTypesDisplay}
//                 </p>
//               </div>
//             )}

//             {Array.isArray(compound.properties) &&
//               compound.properties.length > 0 && (
//                 <div>
//                   <h4 className="text-xs text-gray-500 mb-1">
//                     Available Units
//                   </h4>
//                   <p className="text-sm font-medium text-[#013344]">
//                     {compound.properties.length} Units
//                   </p>
//                 </div>
//               )}

//             <div>
//               <h4 className="text-xs text-gray-500 mb-1">Delivery</h4>
//               <p className="text-sm font-medium text-[#013344]">
//                 {deliveryDate}
//               </p>
//             </div>
//           </div>

//           {/* Available Units (Expandable) */}
//           {showMore &&
//             Array.isArray(compound.properties) &&
//             compound.properties.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="mb-4"
//               >
//                 <Separator className="my-4" />
//                 <h4 className="text-sm font-medium text-[#013344] mb-2">
//                   Available Units
//                 </h4>
//                 <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//                   {compound.properties
//                     .slice(0, 5)
//                     .map((property: any, index: number) => (
//                       <Link
//                         href={`/properties/${property.slug || property.id}`}
//                         key={index}
//                         className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm transition-colors"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <div className="flex items-center gap-2">
//                           <div className="p-1.5 rounded-full bg-[#F7F8F8]">
//                             <Home className="h-3.5 w-3.5 text-[#05596B]" />
//                           </div>
//                           <span className="font-medium">{property.name}</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           {property.startPrice && (
//                             <span className="text-[#05596B] font-medium">
//                               {property.startPrice.toLocaleString()} EGP
//                             </span>
//                           )}
//                           <ChevronRight className="h-4 w-4 text-gray-400" />
//                         </div>
//                       </Link>
//                     ))}
//                   {compound.properties.length > 5 && (
//                     <div className="text-center text-sm text-[#05596B] font-medium py-1">
//                       +{compound.properties.length - 5} more units
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//           <Separator className="my-4" />

//           {/* Price Section */}
//           <div className="flex items-end justify-between mb-4">
//             <div>
//               <p className="text-sm text-gray-500">Starting From</p>
//               {compound.startPrice ? (
//                 <p className="font-bold text-[#05596B] text-xl">
//                   {compound.startPrice.toLocaleString()} EGP
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-500">Price on request</p>
//               )}
//               {compound.offer?.paymentPercentage && (
//                 <p className="text-xs text-[#E3A325] font-medium mt-1">
//                   {compound.offer.paymentPercentage}% Down Payment
//                 </p>
//               )}
//             </div>

//             {compound.monthlyPayment && (
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Monthly</p>
//                 <p className="font-semibold text-[#013344]">
//                   {compound.monthlyPayment.toLocaleString()} EGP
//                 </p>
//               </div>
//             )}
//             {Array.isArray(compound.properties) &&
//               compound.properties.length > 0 && (
//                 <Button
//                   variant="outline"
//                   className="border-[#CBBBAC] text-[#013344] hover:bg-gray-50"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setShowMore(!showMore);
//                   }}
//                 >
//                   <Building2 className="h-4 w-4 mr-2" />
//                   {showMore ? "Hide" : "Units"}
//                 </Button>
//               )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-row gap-3 items-center justify-between">
//             <Link
//               href={compoundUrl}
//               className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#05596B] text-white rounded-lg hover:bg-[#05596B]/90 transition-colors font-medium"
//             >
//               <ExternalLink className="h-4 w-4" />
//               View Details
//             </Link>

//             <div className="flex flex-col">
//               <div className="flex gap-3">
//                 <CallButton
//                   phoneNumber="+0201123960001"
//                   className="rounded-lg bg-[#05596B]/10 text-[#05596B] hover:bg-[#05596B]/20 p-2.5"
//                   variant="rounded"
//                 />
//                 <WhatsAppButton
//                   phoneNumber="+0201123960001"
//                   message={`Hi, I'm interested in ${compound.name} in ${areaName}`}
//                   className="rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2.5"
//                   variant="rounded"
//                 />
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </div>
//     </Card>
//   );
// }

// function PropertyCard({
//   property,
//   onRemove,
// }: {
//   property: any;
//   onRemove: () => void;
// }) {
//   const [developerLogo, setDeveloperLogo] = useState<string | null>(null);
//   const [developerName, setDeveloperName] =
//     useState<string>("Unknown Developer");

//   useEffect(() => {
//     if (!property || !property.compound?.slug) return;

//     const fetchDeveloperData = async () => {
//       try {
//         if (property.compound?.developer) {
//           setDeveloperLogo(property.compound.developer.logo?.url || null);
//           setDeveloperName(
//             property.compound.developer.name || "Unknown Developer"
//           );
//           return;
//         }

//         const response = await GetCompoundApi.getCompoundWithDeveloper(
//           property.compound.slug
//         );
//         const developerData = response.data.data[0]?.developer;

//         if (developerData) {
//           setDeveloperLogo(developerData.logo?.url || null);
//           setDeveloperName(developerData.name || "Unknown Developer");
//         }
//       } catch (error) {
//         console.error("Failed to fetch developer data:", error);
//       }
//     };

//     fetchDeveloperData();
//   }, [property]);

//   if (!property) return null;

//   const bannerUrl =
//     property.banner?.url || "/placeholder.svg?height=240&width=400";
//   const areaName = property.compound?.name || "Unknown Location";
//   const propertyType = property.propertyType || "Property";
//   const propertyUrl = `/properties/${property.slug || property.id}`;

//   return (
//     <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
//       <Link href={propertyUrl} className="flex-1 flex flex-col">
//         <div className="relative h-52 overflow-hidden">
//           <Image
//             src={bannerUrl || "/placeholder.svg"}
//             alt={property.name || "Property"}
//             fill
//             className="object-cover  transition-transform duration-500"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

//           <div className="absolute top-3 left-3 flex flex-wrap gap-2">
//             {property.isRecommended && (
//               <Badge className="bg-[#028180] text-white font-medium px-2.5 py-1">
//                 Recommended
//               </Badge>
//             )}
//             {property.isSoldout && (
//               <Badge className="bg-[#CBBBAC] text-[#013344] font-medium px-2.5 py-1">
//                 Sold Out
//               </Badge>
//             )}
//           </div>

//           <div className="absolute top-3 right-3 flex gap-2">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 onRemove();
//               }}
//               className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
//               aria-label="Remove from favorites"
//             >
//               <Trash2 className="h-5 w-5" />
//             </button>
//           </div>

//           <div className="absolute bottom-3 left-3 right-3">
//             <div className="flex items-center gap-1.5 text-white">
//               <MapPin className="h-3.5 w-3.5" />
//               <span className="text-sm font-medium">{areaName}</span>
//             </div>
//             <h3 className="font-bold text-lg text-white mt-1 line-clamp-1">
//               {property.name}
//             </h3>
//           </div>

//           {developerLogo && (
//             <div className="absolute bottom-3 right-3">
//               <Avatar className="h-10 w-10 border-2 border-white bg-white">
//                 <AvatarImage
//                   src={developerLogo}
//                   className="object-contain p-1"
//                 />
//                 <AvatarFallback className="bg-[#05596B] text-white">
//                   {developerName.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//           )}
//         </div>

//         <CardContent className="p-5 flex-1 flex flex-col">
//           <div className="flex items-center gap-2 mb-3">
//             <Badge
//               variant="outline"
//               className="text-xs border-[#CBBBAC] text-[#013344] font-medium"
//             >
//               {propertyType}
//             </Badge>
//             <span className="text-xs text-gray-500">By {developerName}</span>
//           </div>

//           <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
//             {property.bedrooms && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="p-1.5 rounded-full bg-[#F7F8F8]">
//                   <Bed className="h-3.5 w-3.5 text-[#05596B]" />
//                 </div>
//                 <span>
//                   <span className="font-medium">{property.bedrooms}</span> Beds
//                 </span>
//               </div>
//             )}
//             {property.bathrooms && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="p-1.5 rounded-full bg-[#F7F8F8]">
//                   <Bath className="h-3.5 w-3.5 text-[#05596B]" />
//                 </div>
//                 <span>
//                   <span className="font-medium">{property.bathrooms}</span>{" "}
//                   Baths
//                 </span>
//               </div>
//             )}
//             {property.squareMeters && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="p-1.5 rounded-full bg-[#F7F8F8]">
//                   <Maximize2 className="h-3.5 w-3.5 text-[#05596B]" />
//                 </div>
//                 <span>
//                   <span className="font-medium">{property.squareMeters}</span>{" "}
//                   m²
//                 </span>
//               </div>
//             )}
//             {property.deliveryIn && (
//               <div className="flex items-center gap-2 text-sm">
//                 <div className="p-1.5 rounded-full bg-[#F7F8F8]">
//                   <Calendar className="h-3.5 w-3.5 text-[#05596B]" />
//                 </div>
//                 <span>{property.deliveryIn}</span>
//               </div>
//             )}
//           </div>

//           <div className="mt-auto">
//             {property.startPrice ? (
//               <p className="font-bold text-[#05596B] text-lg">
//                 {property.startPrice.toLocaleString()} EGP
//               </p>
//             ) : (
//               <p className="text-sm text-gray-500">Price on request</p>
//             )}
//           </div>
//         </CardContent>
//       </Link>

//       <div className="flex justify-end gap-2 p-4 pt-0">
//         <CallButton
//           phoneNumber="+0201123960001"
//           className="rounded-lg bg-[#05596B]/10 text-[#05596B] hover:bg-[#05596B]/20 p-2.5"
//           variant="rounded"
//         />
//         <WhatsAppButton
//           phoneNumber="+0201123960001"
//           message={`Hi, I'm interested in this ${propertyType} in ${areaName}`}
//           className="rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 p-2.5"
//           variant="rounded"
//         />
//       </div>
//     </Card>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "./contexts/FavoritesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Home } from "lucide-react";
import Image from "next/image";
import GetCompoundApi from "@/app/api/CompoundApi";
import GetPropertyApi from "@/app/api/PropertyApi";
import { motion, AnimatePresence } from "framer-motion";
import { CompoundCard } from "./_components/compound-card";
import { EmptyState } from "./_components/empty-state";
import { PropertyCard } from "./_components/property-card";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<"compounds" | "properties">(
    "compounds"
  );
  const [favoriteCompounds, setFavoriteCompounds] = useState<any[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      try {
        // Fetch favorite compounds
        if (favorites.compounds.length > 0) {
          const compoundPromises = favorites.compounds.map(async (item) => {
            try {
              const response = await GetCompoundApi.getCompoundApi(
                item.slug || item.id
              );
              return response.data.data[0];
            } catch (error) {
              console.error(`Failed to fetch compound ${item.id}:`, error);
              return null;
            }
          });

          const compounds = await Promise.all(compoundPromises);
          setFavoriteCompounds(compounds.filter(Boolean));
        } else {
          setFavoriteCompounds([]);
        }

        // Fetch favorite properties
        if (favorites.properties.length > 0) {
          const propertyPromises = favorites.properties.map(async (item) => {
            try {
              // First try to get the property directly
              const response = await GetPropertyApi.getPropertyBySlug(
                item.slug || item.id
              );

              if (response.data.data && response.data.data.length > 0) {
                return response.data.data[0];
              }

              // If that fails, try to get it from the compound
              if (item.compoundSlug) {
                const compoundResponse =
                  await GetCompoundApi.getCompoundWithProperty(
                    item.compoundSlug
                  );
                const compound = compoundResponse.data.data[0];
                if (compound && compound.properties) {
                  const property = compound.properties.find(
                    (p: any) => p.id === item.id || p.slug === item.slug
                  );
                  if (property) {
                    property.compound = {
                      name: compound.name,
                      slug: compound.slug,
                      developer: compound.developer,
                    };
                    return property;
                  }
                }
              }
              return null;
            } catch (error) {
              console.error(`Failed to fetch property ${item.id}:`, error);
              return null;
            }
          });

          const properties = await Promise.all(propertyPromises);
          setFavoriteProperties(properties.filter(Boolean));
        } else {
          setFavoriteProperties([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      {/* Hero Section */}
      <div className="relative h-[200px] md:h-[500px] overflow-hidden">
        <Image
          src="/search-header.png"
          alt="Favorites"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#013344]/90 to-[#013344]/60" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-lg max-w-2xl">
            Your collection of dream properties and compounds
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-28 relative z-10">
        <Card className="border-none shadow-md mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#013344]">
                  Saved Items
                </h2>
                <p className="text-gray-500 text-sm">
                  {favorites.compounds.length + favorites.properties.length}{" "}
                  items in your collection
                </p>
              </div>
            </div>

            <Tabs
              defaultValue="compounds"
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "compounds" | "properties")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-5 bg-[#F7F8F8] p-1 rounded-lg">
                <TabsTrigger
                  value="compounds"
                  className="data-[state=active]:bg-[#05596B] data-[state=active]:text-white rounded-md text-sm"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Compounds ({favorites.compounds.length})
                </TabsTrigger>
                <TabsTrigger
                  value="properties"
                  className="data-[state=active]:bg-[#05596B] data-[state=active]:text-white rounded-md text-sm"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Properties ({favorites.properties.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compounds" className="mt-0">
                {loading ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Card
                        key={i}
                        className="animate-pulse bg-white border-none shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="bg-gray-200 sm:w-[30%] h-48"></div>
                          <CardContent className="p-4 flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                            <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : favorites.compounds.length === 0 ? (
                  <EmptyState
                    type="compounds"
                    title="No saved compounds"
                    description="You haven't saved any compounds yet. Browse compounds and click the heart icon to add them to your favorites."
                    buttonText="Browse Compounds"
                    buttonLink="/search?type=compounds"
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                      {favoriteCompounds.map((compound) => (
                        <motion.div
                          key={compound.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CompoundCard
                            compound={compound}
                            onRemove={() =>
                              removeFromFavorites(compound.id, "compound")
                            }
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="properties" className="mt-0">
                {loading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card
                        key={i}
                        className="animate-pulse bg-white border-none shadow-sm h-full"
                      >
                        <div className="bg-gray-200 h-44"></div>
                        <CardContent className="p-4">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                          </div>
                          <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : favorites.properties.length === 0 ? (
                  <EmptyState
                    type="properties"
                    title="No saved properties"
                    description="You haven't saved any properties yet. Browse properties and click the heart icon to add them to your favorites."
                    buttonText="Browse Properties"
                    buttonLink="/search?type=properties"
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                      {favoriteProperties.map((property) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <PropertyCard
                            property={property}
                            onRemove={() =>
                              removeFromFavorites(property.id, "property")
                            }
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
