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
import { Maximize2 } from "lucide-react";
import Image from "next/image";

interface FloorPlanDrawerProps {
  floorPlanImage: string;
  propertyName: string;
}

export function FloorPlanDrawer({
  floorPlanImage,
  propertyName,
}: FloorPlanDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex-3 h-auto py-2 px-3">
          <Maximize2 className="mr-2 h-4 w-4" />
          View Floor Plan
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Floor Plan: {propertyName}</DrawerTitle>
            <DrawerDescription>Click on the image to zoom in</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={floorPlanImage || "/placeholder.svg"}
                alt={`Floor plan for ${propertyName}`}
                fill
                className="object-contain"
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
