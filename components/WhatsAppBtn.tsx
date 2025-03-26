// "use client";

// import { Button } from "@/components/ui/button";
// import { MessageCircle } from "lucide-react";

// interface WhatsAppButtonProps {
//   phoneNumber: string;
//   message: string;
//   className?: string;
//   variant?: "default" | "outline" | "secondary" | "rounded";
// }

// export function WhatsAppButton({
//   phoneNumber,
//   message,
//   className,
//   variant = "default",
// }: WhatsAppButtonProps) {
//   const handleWhatsAppClick = () => {
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <Button
//       variant={variant === "rounded" ? "default" : variant}
//       className={`group relative overflow-hidden ${
//         variant === "rounded"
//           ? "bg-gradient-to-r from-[#028180] to-[#013344] text-white hover:from-[#013344] hover:to-[#028180]"
//           : ""
//       } ${className}`}
//       onClick={handleWhatsAppClick}
//     >
//       {variant !== "rounded" && (
//         <>
//           <span className="flex items-center gap-2 transform group-hover:-translate-y-32 transition-transform duration-200">
//             Get Offer
//           </span>
//           <span className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
//             <MessageCircle className="w-4 h-4 mr-2" />
//             WhatsApp
//           </span>
//         </>
//       )}
//       {variant === "rounded" && (
//         <span className="flex items-center gap-2 rounded-full">
//           <MessageCircle className="w-4 h-4" />
//         </span>
//       )}
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "rounded" | "floating";
  showText?: boolean;
}

export function WhatsAppButton({
  phoneNumber,
  message,
  className,
  variant = "default",
  showText = true,
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={cn(
          "fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          "group hover:pr-8",
          className
        )}
      >
        <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-xs">
          WhatsApp
        </span>
      </button>
    );
  }

  if (variant === "rounded") {
    return (
      <Button
        variant="default"
        className={cn(
          "relative h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 p-0 text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl",
          className
        )}
        onClick={handleWhatsAppClick}
      >
        <MessageCircle className="h-5 w-5 transition-transform hover:scale-110" />
        <span className="sr-only">Open WhatsApp</span>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      className={cn(
        "group relative overflow-hidden",
        variant === "default" && "bg-[#25D366] text-white hover:bg-[#128C7E]",
        variant === "outline" &&
          "border-green-500 text-green-500 hover:bg-green-50",
        variant === "secondary" &&
          "bg-green-100 text-green-700 hover:bg-green-200",
        className
      )}
      onClick={handleWhatsAppClick}
    >
      <div className="relative flex items-center gap-2">
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        {showText && (
          <>
            <span className="inline-block ">WhatsApp</span>
          </>
        )}
      </div>
    </Button>
  );
}
