import { Slash } from "lucide-react";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbCustomProps {
  items: Array<{ title: string; href?: string }>;
  className?: string;
}

export function BreadcrumbCustom({ items, className }: BreadcrumbCustomProps) {
  return (
    <Breadcrumb className={cn("mb-4 mt-3 overflow-x-hidden flex", className)}>
      <BreadcrumbList className="flex-nowrap">
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem className="whitespace-nowrap">
              {item.href ? (
                <BreadcrumbLink
                  className="text-white hover:text-white/80 transition-colors text-sm sm:text-base"
                  href={item.href}
                >
                  {item.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-white text-sm sm:text-base">
                  {item.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <Slash className="h-4 w-4 text-white/70" />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
