"use client";

import { Card } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import { CallButton } from "@/components/CallButton";
import { Building2, ArrowRight, Check, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Offer {
  paymentDuration?: number;
  paymentPercentage?: number;
  paymentType?: string;
  isOriginalPlan?: boolean;
  features?: string[];
  compound: {
    name: string;
    slug: string;
    banner?: {
      url: string;
    };
  };
  developer?: {
    name: string;
    slug: string;
    logo?: {
      url: string;
    };
  };
}

export function OfferCard({ offer }: { offer: Offer }) {
  const message = `Hi, I'm interested in the ${
    offer.compound?.name || "this property"
  } offer (${offer.paymentPercentage}% ${offer.paymentType})`;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {offer.compound.banner?.url ? (
          <Image
            src={offer.compound.banner.url || "/placeholder.svg"}
            alt={offer.compound.name}
            fill
            className="object-cover opacity-10 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05596B]/5 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
      </div>

      <div className="relative p-4 sm:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            {offer.developer?.logo?.url ? (
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#05596B]/20 bg-white">
                <Image
                  src={offer.developer.logo.url || "/placeholder.svg"}
                  alt={offer.developer.name || "Developer"}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#05596B]/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-[#05596B]" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-[#013344]">
                Special Offer
              </p>
              <p className="text-xs text-[#05596B]">{offer.developer?.name}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6 flex-grow">
          {/* Payment Details */}
          <div className="grid grid-cols-2 gap-3">
            {/* Percentage */}
            <div className="bg-[#F7F8F8] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                {/* <Percent className="h-4 w-4 text-[#05596B]" /> */}
                <span className="text-xs text-[#05596B]">Down Payment</span>
              </div>
              <p className="text-xl font-bold text-[#013344]">
                {offer.paymentPercentage}%
              </p>
              <p className="text-xs text-[#05596B]/80">{offer.paymentType}</p>
            </div>

            {/* Duration */}
            <div className="bg-[#F7F8F8] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-[#05596B]" />
                <span className="text-xs text-[#05596B]">Duration</span>
              </div>
              <p className="text-xl font-bold text-[#013344]">
                {offer.paymentDuration}
              </p>
              <p className="text-xs text-[#05596B]/80">
                {offer.paymentDuration === 1 ? "Year" : "Years"}
              </p>
            </div>
          </div>

          {/* Features */}
          {offer.features && offer.features.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#05596B]">Key Features</p>
              <div className="space-y-1.5">
                {offer.features
                  .slice(0, 3)
                  .map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#05596B]">{feature}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Link
            href={`/compounds/${offer.compound.slug}`}
            className="block p-3 sm:p-4 rounded-lg bg-white shadow-sm border border-[#05596B]/10 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#013344] mb-1 text-sm sm:text-base">
                  {offer.compound.name}
                </p>
                <p className="text-xs sm:text-sm text-[#05596B]">
                  View Compound Details
                </p>
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#05596B]" />
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          <WhatsAppButton
            phoneNumber="+0201123960001"
            message={message}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
          />
          <CallButton
            phoneNumber="+0201123960001"
            className="w-full"
            variant="outline"
          />
        </div>
      </div>

      {/* Corner Ribbon - Only for limited time offers */}
      {!offer.isOriginalPlan && (
        <div className="absolute -right-12 top-6 rotate-45 bg-[#e4a62c] px-12 py-1 text-xs font-semibold text-primary-foreground">
          New Offer
        </div>
      )}
    </Card>
  );
}
