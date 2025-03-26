import Image from "next/image"
import Link from "next/link"
import { Building, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface CompoundCardProps {
  compound: {
    id: string
    name: string
    slug: string
    banner?: {
      url: string
    }
    area?: {
      name: string
    }
    developer?: {
      name: string
      logo?: {
        url: string
      }
    }
  }
  className?: string
}

export function CompoundCard({ compound, className }: CompoundCardProps) {
  return (
    <Card className={cn("border-2 shadow-md overflow-hidden rounded-2xl h-full group cursor-pointer", className)}>
      <Link href={`/compounds/${compound.slug}`}>
        <div className="relative h-56 sm:h-64 overflow-hidden">
          {compound.banner?.url ? (
            <Image
              src={compound.banner.url || "/placeholder.svg"}
              alt={compound.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/20 to-[#05596B]/5 flex items-center justify-center">
              <span className="text-[#05596B]">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent/20 transition-opacity"></div>

          {/* Developer Logo */}
          {compound.developer?.logo?.url && (
            <Avatar className="absolute top-4 left-4 bg-white p-1.5 rounded-full size-14 sm:size-16 border-2 border-white shadow-lg">
              <AvatarImage
                src={compound.developer.logo.url}
                alt={compound.developer.name || "Developer"}
                className="object-contain"
              />
            </Avatar>
          )}

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3 w-fit shadow-md">
              <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-[#05596B]" />
              <span className="text-sm font-medium text-[#003344]">{compound.area?.name}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#003344] group-hover:text-[#05596B] transition-colors">
              {compound.name}
            </h3>

            <div className="flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-2 flex-shrink-0 text-[#05596B]" />
              <span className="text-sm line-clamp-1">{compound.developer?.name}</span>
            </div>

            <div className="pt-2 flex items-center text-[#05596B] font-medium">
              <span>View Details</span>
              <div className="ml-2 size-6 rounded-full bg-[#05596B]/10 flex items-center justify-center group-hover:bg-[#05596B] group-hover:text-white transition-colors">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

