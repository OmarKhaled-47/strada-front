/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import { CreditCard, Check, Calendar } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppBtn";
import { CallButton } from "@/components/CallButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PaymentPlanProps {
  offers: any;
  compound: any;
  isActive?: boolean;
}

export function PaymentPlanCard({
  offers,
  compound,
  isActive = false,
}: PaymentPlanProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const message = `Hi, I'm interested in the ${compound.name} payment plan (${
    offers.paymentPercentage
  }% ${offers.paymentType}) by ${compound.developer?.name || "the developer"}.`;

  return (
    <div className="min-w-[250px] sm:min-w-[300px] w-full sm:w-[350px]">
      <Card
        className={cn(
          "relative overflow-hidden h-full border-l-4 transition-all duration-300 hover:shadow-lg",
          isActive ? "border-l-[#05596B]" : "border-l-[#05596B]/30"
        )}
      >
        {/* Top accent color */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#05596B] to-[#013344]" />

        <div className="relative p-4 sm:p-6 bg-white h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-full bg-[#013344]/5">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-[#013344]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#013344]">
                  Payment Plan
                </h3>
                <p className="text-xs text-[#05596B]/80">
                  {compound.developer?.name
                    ? `By ${compound.developer.name}`
                    : compound.name}
                </p>
              </div>
            </div>

            {isActive && (
              <Badge className="bg-[#05596B] text-white text-xs">
                Recommended
              </Badge>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-4 sm:space-y-5 flex-grow">
            {/* Payment Details */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Percentage */}
              <div className="bg-[#F7F8F8] rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <span className="text-xs text-[#05596B]">Down Payment</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-[#013344]">
                  {offers.paymentPercentage}%
                </p>
                <p className="text-xs text-[#05596B]/80">
                  {offers.paymentType}
                </p>
              </div>

              {/* Duration */}
              <div className="bg-[#F7F8F8] rounded-lg p-2 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-[#05596B]" />
                  <span className="text-xs text-[#05596B]">Duration</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-[#013344]">
                  {offers.paymentDuration}
                </p>
                <p className="text-xs text-[#05596B]/80">
                  {offers.paymentDuration === 1 ? "Year" : "Years"}
                </p>
              </div>
            </div>

            {/* Features */}
            {offers.features && offers.features.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#05596B]">
                  Key Features
                </p>
                <div className="space-y-1.5">
                  {offers.features
                    .slice(0, showAllFeatures ? offers.features.length : 3)
                    .map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#05596B]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  {offers.features.length > 3 && !showAllFeatures && (
                    <Button
                      variant="link"
                      className="text-xs text-[#05596B] p-0 h-auto"
                      onClick={() => setShowAllFeatures(true)}
                    >
                      +{offers.features.length - 3} more features
                    </Button>
                  )}
                  {showAllFeatures && offers.features.length > 3 && (
                    <Button
                      variant="link"
                      className="text-xs text-[#05596B] p-0 h-auto"
                      onClick={() => setShowAllFeatures(false)}
                    >
                      Show less
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Buttons */}
          <div className="pt-4 mt-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <WhatsAppButton
                phoneNumber="+0201123960001"
                variant="rounded"
                message={message}
                className="text-xs sm:text-sm"
              />
              <CallButton
                phoneNumber="+0201123960001"
                variant="rounded"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
