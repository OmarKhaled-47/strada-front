"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface ContactHeroSectionProps {
  heading: string;
  subHeading: string;
  imageUrl: string;
}

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Extract the base URL without query parameters
  const baseUrl = src.split("?")[0];
  // Append the width and quality parameters
  return `${baseUrl}?w=${width}&q=${quality || 75}`;
};

export function ContactHeroSection({
  heading,
  subHeading,
  imageUrl,
}: ContactHeroSectionProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <Image
        loader={imageLoader}
        src={imageUrl || "/placeholder.svg?height=600&width=1200"}
        alt="Contact Us"
        fill
        priority
        className="object-cover w-full h-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#013344]/80 via-[#013344]/60 to-[#013344]/30" />

      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-100">{subHeading}</p>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white font-medium">
                <a href="tel:+1234567890">Call us: +1 (123) 456-7890</a>
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white font-medium">
                <a href="mailto:sales@strada-properties.com">
                  Email: sales@strada-properties.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
