/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import GetAreaApi from "@/app/api/AreaApi";
import { SuccessToast, ToastContainer } from "@/components/ui/success-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(1, "Please select a location"),
  message: z.string().optional(),
  notifications: z.boolean().default(false),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [showCustomToast, setShowCustomToast] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      message: "",
      notifications: false,
    },
  });

  useEffect(() => {
    const fetchAreas = async () => {
      setIsLoadingAreas(true);
      try {
        const response = await GetAreaApi.getAreaCard();
        if (response.data && response.data.data) {
          const formattedAreas = response.data.data.map((area: any) => ({
            id: area.id,
            name: area.name,
            slug: area.slug,
          }));
          setAreas(formattedAreas);
        }
      } catch (error) {
        console.error("Failed to fetch areas:", error);
        toast.error("Failed to load locations. Please try again.");
      } finally {
        setIsLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 5000); // Hide after 5 seconds

      form.reset({
        name: "",
        phone: "",
        location: "",
        message: "",
        notifications: false,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
        {
          description: "Please check your information and try again.",
          duration: 5000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-[#013344]">
          Contact Us
        </CardTitle>
        <p className="text-sm text-[#05596B]">
          Fill out the form below and we&apos;ll get back to you shortly.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter your phone number"
                      {...field}
                      defaultCountry="EG"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Preferred Location
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingAreas}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:ring-[#013344]">
                        <SelectValue
                          placeholder={
                            isLoadingAreas
                              ? "Loading locations..."
                              : "Select a location"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingAreas ? (
                        <div className="flex items-center justify-center py-2">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Loading...
                        </div>
                      ) : areas.length > 0 ? (
                        areas.map((area) => (
                          <SelectItem key={area.id} value={area.slug}>
                            {area.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-locations" disabled>
                          No locations available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#013344] hover:bg-[#05596B]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {showCustomToast && (
        <ToastContainer>
          <SuccessToast
            title="Message sent successfully!"
            description="We'll get back to you soon."
            onClose={() => setShowCustomToast(false)}
          />
        </ToastContainer>
      )}
    </Card>
  );
}
