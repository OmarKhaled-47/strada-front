import { Skeleton } from "@/components/ui/skeleton"

export default function AreasLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F8F8] to-white">
      {/* Hero Section Skeleton */}
      <div className="bg-[#013344] text-white py-28">
        <div className="container px-4 mx-auto">
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-[500px] mb-6" />
          <Skeleton className="h-12 w-[400px] rounded-lg" />

          <div className="flex gap-6 mt-8">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-32" />
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="group relative">
              <Skeleton className="h-72 w-full rounded-lg" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    </main>
  )
}

