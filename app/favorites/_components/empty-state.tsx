import Link from "next/link";
import { Building, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "compounds" | "properties";
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function EmptyState({
  type,
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <div className="mx-auto w-16 h-16 rounded-full bg-[#F7F8F8] flex items-center justify-center mb-4">
        {type === "compounds" ? (
          <Building className="h-8 w-8 text-gray-400" />
        ) : (
          <Home className="h-8 w-8 text-gray-400" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-[#013344] mb-2">{title}</h3>
      <p className="text-gray-500 mb-5 max-w-md mx-auto text-sm">
        {description}
      </p>
      <Button asChild className="bg-[#05596B] hover:bg-[#05596B]/90">
        <Link href={buttonLink}>
          <Search className="h-4 w-4 mr-2" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}
