import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  viewAllLink?: string
  viewAllText?: string
  className?: string
}

export function SectionHeader({
  title,
  description,
  viewAllLink,
  viewAllText = "View All",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8", className)}
    >
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#003344] mb-2 sm:mb-3">{title}</h2>
        {description && <p className="text-sm sm:text-base text-gray-600">{description}</p>}
      </div>
      {viewAllLink && (
        <Link href={viewAllLink} className="mt-4 md:mt-0">
          <Button
            variant="outline"
            className="rounded-full border-[#05596B]/20 text-[#05596B] hover:bg-[#05596B]/5 hover:text-[#05596B] hover:border-[#05596B]/30"
          >
            {viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}

