import { Skeleton } from "@/components/ui/skeleton";
import { BreadcrumbCustom } from "@/components/BreadCrumbCustom";

export default function DeveloperLoading() {
  return (
    <main className="min-h-screen bg-[#F7F8F8] py-20">
      <div className="container px-4 mx-auto">
        <div className="mb-8">
          <BreadcrumbCustom
            items={[
              { title: "Home", href: "/" },
              { title: "Developers", href: "/developers" },
              { title: "Loading..." },
            ]}
          />
        </div>

        {/* Header Section Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-lg" />
            <div>
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        </div>

        {/* Areas Skeleton */}
        <div className="mb-8 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 rounded flex-shrink-0" />
              ))}
          </div>
        </div>

        {/* Special Offers Skeleton */}
        <section className="mb-16">
          <Skeleton className="h-10 w-72 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
          </div>
        </section>

        {/* New Launch Compounds Skeleton */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-[350px] w-[350px] rounded-lg flex-shrink-0"
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Regular Compounds Skeleton */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-10 w-72 mb-2" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-lg" />
              ))}
          </div>
        </section>

        {/* Description and Contact Form Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-8xl mx-auto">
          <div className="lg:col-span-2 h-[900px] backdrop-blur-sm p-6">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-6 w-full mb-4" />
              ))}
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[600px] rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
