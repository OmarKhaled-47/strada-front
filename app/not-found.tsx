import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8F8] py-20 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#05596B]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#013344] mb-4">Not Found</h2>
        <p className="text-[#05596B] mb-6">
          We couldn&apos;t find the page you&apos;re looking for. They may have
          been removed or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#05596B] hover:bg-[#013344]">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
