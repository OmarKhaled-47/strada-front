"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Map, Maximize2, Minimize2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasterPlanDrawerProps {
  masterPlanImage: string | undefined;
  compoundName: string;
}

export function MasterPlanDrawer({
  masterPlanImage,
  compoundName,
}: MasterPlanDrawerProps) {
  const [open, setOpen] = useState(false);
  const [isFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = () => {
    if (!masterPlanImage) return;

    const link = document.createElement("a");
    link.href = masterPlanImage;
    link.download = `${compoundName.replace(/\s+/g, "-").toLowerCase()}-master-plan.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/80 hover:bg-white text-[#013344] border-[#013344]/20 w-full sm:w-auto"
        >
          <Map className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Master Plan</span>
          <span className="sm:hidden">Plan</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "h-[95vh] max-w-full transition-all duration-300",
          isFullscreen
            ? "!fixed inset-0 h-screen max-w-none rounded-none"
            : "sm:max-w-3xl sm:ml-auto"
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Map className="h-4 w-4 sm:h-5 sm:w-5 text-[#05596B]" />
              {compoundName} Master Plan
            </DrawerTitle>
            <DrawerDescription>
              Explore the layout and design of the compound
            </DrawerDescription>
            <div className="absolute right-4 top-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hidden sm:flex"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download master plan</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle zoom</span>
              </Button>
            </div>
          </DrawerHeader>
          <div
            className={cn(
              "relative transition-all duration-300",
              isFullscreen ? "h-[calc(100vh-8rem)]" : "h-[calc(90vh-10rem)]",
              "w-full p-4 overflow-auto",
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            )}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div
              className={cn(
                "relative h-full w-full transition-transform duration-300",
                isZoomed ? "scale-150 transform-origin-center" : "scale-100"
              )}
            >
              <Image
                src={masterPlanImage || "/placeholder.svg"}
                alt={`${compoundName} Master Plan`}
                fill
                className={cn(
                  "object-contain",
                  isZoomed ? "object-contain" : "object-scale-down"
                )}
                quality={100}
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
