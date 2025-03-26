"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/InfiniteSlider";

const logos = [
  "/logo/logo1.png",
  "/logo/logo2.png",
  "/logo/logo3.png",
  "/logo/logo4.png",
  "/logo/logo5.png",
  "/logo/logo6.jpg",
  "/logo/logo7.jpg",
  "/logo/logo8.png",
  "/logo/logo9.png",
  "/logo/logo10.png",
  "/logo/logo11.jpg",
  "/logo/logo12.png",
];

export function LogoSlider() {
  return (
    <div className="w-full overflow-hidden py-6">
      <InfiniteSlider gap={48} speed={30} speedOnHover={0} className="py-4">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white rounded-lg shadow-sm p-4 h-[120px] w-[180px]"
          >
            <div className="relative h-[80px] w-[140px]">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`Partner logo ${index + 1}`}
                fill
                className="object-contain transition-opacity hover:opacity-100 filter grayscale hover:grayscale-0"
                sizes="140px"
              />
            </div>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
