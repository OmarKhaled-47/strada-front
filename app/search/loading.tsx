import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] bg-[#013344]">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <Skeleton className="h-12 w-3/4 max-w-xl mb-4" />
          <Skeleton className="h-6 w-1/2 max-w-md" />
        </div>
      </div>

      {/* Search Header Skeleton */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-12 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar Skeleton */}
          <div className="hidden md:block w-72">
            <Skeleton className="h-[calc(100vh-200px)] w-full" />
          </div>

          {/* Results Skeleton */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-40" />
            </div>

            {/* Property Cards Skeleton */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-3/4" />
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
