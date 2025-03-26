"use client";

import type React from "react";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessToastProps {
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export function SuccessToast({
  title,
  description,
  onClose,
  className,
}: SuccessToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        " bg-white rounded-lg shadow-lg border border-green-100 p-4 max-w-md w-full",
        "flex items-start gap-3",
        className
      )}
    >
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        </div>
      </div>

      <div className="flex-1 pt-0.5">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#05596B] rounded-full"
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      {children}
    </div>
  );
}
