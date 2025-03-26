// "use client";

// import { useState } from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { PhoneInput } from "@/components/ui/phone-input";
// import { SmartDatetimeInput } from "@/components/ui/extension/smart-date-time-input";
// import {
//   Calendar,
//   Clock,
//   User,
//   Phone,
//   Loader2,
//   X,
//   CalendarClock,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   phone: z.string().min(1, "Phone number is required"),
//   preferredDate: z.date(),
//   meetingType: z.enum(["in-person", "virtual"]),
//   message: z.string().optional(),
// });

// export function RequestMeetingForm() {
//   const [open, setOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       preferredDate: new Date(),
//       meetingType: "in-person",
//       message: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       setIsSubmitting(true);

//       const response = await fetch("/api/meeting-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to submit request");
//       }

//       setIsSuccess(true);
//       toast.success("Meeting request submitted successfully!");

//       // Reset form after success
//       setTimeout(() => {
//         setOpen(false);
//         setIsSuccess(false);
//         form.reset();
//       }, 2000);
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Failed to submit the form. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant="default"
//           className="bg-[#013344] hover:bg-[#05596B] text-white flex items-center gap-2 w-auto"
//         >
//           <CalendarClock className="h-4 w-4" />
//           Schedule Visit
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-lg">
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           className="h-full flex flex-col"
//         >
//           <SheetHeader className="space-y-2">
//             <SheetTitle className="text-2xl font-bold text-[#013344]">
//               Schedule a Visit
//             </SheetTitle>
//             <SheetDescription>
//               Fill out the form below to request a property viewing appointment.
//             </SheetDescription>
//           </SheetHeader>

//           <div className="flex-1 overflow-y-auto py-6 px-3">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <AnimatePresence mode="wait">
//                   {!isSuccess ? (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="space-y-6"
//                     >
//                       <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <User className="h-4 w-4" />
//                               Your Name
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter your name"
//                                 {...field}
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <Phone className="h-4 w-4" />
//                               Phone Number
//                             </FormLabel>
//                             <FormControl>
//                               <PhoneInput
//                                 placeholder="Enter your phone number"
//                                 {...field}
//                                 defaultCountry="EG"
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="meetingType"
//                         render={({ field }) => (
//                           <FormItem className="space-y-3">
//                             <FormLabel className="text-[#05596B]">
//                               Meeting Type
//                             </FormLabel>
//                             <FormControl>
//                               <RadioGroup
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                                 className="grid grid-cols-2 gap-4"
//                               >
//                                 <div>
//                                   <RadioGroupItem
//                                     value="in-person"
//                                     id="in-person"
//                                     className="peer sr-only"
//                                   />
//                                   <Label
//                                     htmlFor="in-person"
//                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
//                                   >
//                                     <Calendar className="mb-2 h-6 w-6" />
//                                     Physical Meeting
//                                   </Label>
//                                 </div>
//                                 <div>
//                                   <RadioGroupItem
//                                     value="virtual"
//                                     id="virtual"
//                                     className="peer sr-only"
//                                   />
//                                   <Label
//                                     htmlFor="virtual"
//                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
//                                   >
//                                     <Clock className="mb-2 h-6 w-6" />
//                                     Zoom
//                                   </Label>
//                                 </div>
//                               </RadioGroup>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="preferredDate"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <Calendar className="h-4 w-4" />
//                               Preferred Date & Time
//                             </FormLabel>
//                             <FormControl>
//                               <SmartDatetimeInput
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                                 placeholder="e.g. Tomorrow morning 9am"
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormDescription className="flex items-center gap-2">
//                               <Clock className="h-4 w-4" />
//                               Please select your preferred meeting time
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="message"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-[#05596B]">
//                               Additional Message (Optional)
//                             </FormLabel>
//                             <FormControl>
//                               <textarea
//                                 {...field}
//                                 className={cn(
//                                   "flex min-h-[100px] w-full rounded-md border border-[#05596B]/20",
//                                   "bg-background px-3 py-2 text-sm ring-offset-background",
//                                   "placeholder:text-muted-foreground focus-visible:outline-none",
//                                   "focus-visible:ring-2 focus-visible:ring-[#05596B] focus-visible:ring-offset-2",
//                                   "disabled:cursor-not-allowed disabled:opacity-50"
//                                 )}
//                                 placeholder="Any specific requirements or questions?"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="flex flex-col items-center justify-center py-10 space-y-4"
//                     >
//                       <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
//                         <motion.svg
//                           className="h-6 w-6 text-green-600"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 0.5, ease: "easeOut" }}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 13l4 4L19 7"
//                           />
//                         </motion.svg>
//                       </div>
//                       <h3 className="text-xl font-semibold text-[#013344]">
//                         Visit Request Submitted!
//                       </h3>
//                       <p className="text-[#05596B] text-center">
//                         We&apos;ll get back to you shortly to confirm your
//                         appointment.
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </Form>
//           </div>

//           <div className="border-t pt-4">
//             <div className="flex gap-2">
//               {!isSuccess && (
//                 <Button
//                   type="submit"
//                   onClick={form.handleSubmit(onSubmit)}
//                   disabled={isSubmitting}
//                   className="bg-[#013344] hover:bg-[#05596B] text-white flex-1 "
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     "Submit Request"
//                   )}
//                 </Button>
//               )}
//               <SheetClose asChild>
//                 <Button variant="outline" className="flex-1">
//                   <X className="mr-2 h-4 w-4" />
//                   {isSuccess ? "Close" : "Cancel"}
//                 </Button>
//               </SheetClose>
//             </div>
//           </div>
//         </motion.div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// "use client";

// import { useState } from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { PhoneInput } from "@/components/ui/phone-input";
// import { SmartDatetimeInput } from "@/components/ui/extension/smart-date-time-input";
// import {
//   Calendar,
//   Clock,
//   User,
//   Phone,
//   Loader2,
//   X,
//   CalendarClock,
//   Video,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   phone: z.string().min(1, "Phone number is required"),
//   preferredDate: z.date(),
//   meetingType: z.enum(["in-person", "virtual"]),
//   message: z.string().optional(),
// });

// export function RequestMeetingForm() {
//   const [open, setOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       preferredDate: new Date(),
//       meetingType: "in-person",
//       message: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       setIsSubmitting(true);

//       const response = await fetch("/api/meeting-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to submit request");
//       }

//       setIsSuccess(true);
//       toast.success("Meeting request submitted successfully!");

//       // Reset form after success
//       setTimeout(() => {
//         setOpen(false);
//         setIsSuccess(false);
//         form.reset({
//           preferredDate: new Date(),
//           meetingType: "in-person",
//           message: "",
//         });
//       }, 2000);
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "Failed to submit the form. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant="default"
//           className="bg-[#013344] hover:bg-[#05596B] text-white flex items-center gap-2 w-auto"
//         >
//           <CalendarClock className="h-4 w-4" />
//           Schedule Visit
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-lg">
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           className="h-full flex flex-col"
//         >
//           <SheetHeader className="space-y-2">
//             <SheetTitle className="text-2xl font-bold text-[#013344]">
//               Schedule a Visit
//             </SheetTitle>
//             <SheetDescription>
//               Fill out the form below to request a property viewing appointment.
//             </SheetDescription>
//           </SheetHeader>

//           <div className="flex-1 overflow-y-auto py-6 px-3">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <AnimatePresence mode="wait">
//                   {!isSuccess ? (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="space-y-6"
//                     >
//                       <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <User className="h-4 w-4" />
//                               Your Name
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter your name"
//                                 {...field}
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <Phone className="h-4 w-4" />
//                               Phone Number
//                             </FormLabel>
//                             <FormControl>
//                               <PhoneInput
//                                 placeholder="Enter your phone number"
//                                 {...field}
//                                 defaultCountry="EG"
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="meetingType"
//                         render={({ field }) => (
//                           <FormItem className="space-y-3">
//                             <FormLabel className="text-[#05596B]">
//                               Meeting Type
//                             </FormLabel>
//                             <FormControl>
//                               <RadioGroup
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                                 className="grid grid-cols-2 gap-4"
//                               >
//                                 <div>
//                                   <RadioGroupItem
//                                     value="in-person"
//                                     id="in-person"
//                                     className="peer sr-only"
//                                   />
//                                   <Label
//                                     htmlFor="in-person"
//                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
//                                   >
//                                     <Calendar className="mb-2 h-6 w-6" />
//                                     Physical Meeting
//                                   </Label>
//                                 </div>
//                                 <div>
//                                   <RadioGroupItem
//                                     value="virtual"
//                                     id="virtual"
//                                     className="peer sr-only"
//                                   />
//                                   <Label
//                                     htmlFor="virtual"
//                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
//                                   >
//                                     <Video className="mb-2 h-6 w-6" />
//                                     Zoom
//                                   </Label>
//                                 </div>
//                               </RadioGroup>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="preferredDate"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-[#05596B]">
//                               <Calendar className="h-4 w-4" />
//                               Preferred Date & Time
//                             </FormLabel>
//                             <FormControl>
//                               <SmartDatetimeInput
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                                 placeholder="e.g. Tomorrow morning 9am"
//                                 className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
//                               />
//                             </FormControl>
//                             <FormDescription className="flex items-center gap-2">
//                               <Clock className="h-4 w-4" />
//                               Please select your preferred meeting time
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="message"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-[#05596B]">
//                               Additional Message (Optional)
//                             </FormLabel>
//                             <FormControl>
//                               <textarea
//                                 {...field}
//                                 className={cn(
//                                   "flex min-h-[100px] w-full rounded-md border border-[#05596B]/20",
//                                   "bg-background px-3 py-2 text-sm ring-offset-background",
//                                   "placeholder:text-muted-foreground focus-visible:outline-none",
//                                   "focus-visible:ring-2 focus-visible:ring-[#05596B] focus-visible:ring-offset-2",
//                                   "disabled:cursor-not-allowed disabled:opacity-50"
//                                 )}
//                                 placeholder="Any specific requirements or questions?"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="flex flex-col items-center justify-center py-10 space-y-4"
//                     >
//                       <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
//                         <motion.svg
//                           className="h-6 w-6 text-green-600"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 0.5, ease: "easeOut" }}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 13l4 4L19 7"
//                           />
//                         </motion.svg>
//                       </div>
//                       <h3 className="text-xl font-semibold text-[#013344]">
//                         Visit Request Submitted!
//                       </h3>
//                       <p className="text-[#05596B] text-center">
//                         We&apos;ll get back to you shortly to confirm your
//                         appointment.
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </Form>
//           </div>

//           <div className="border-t pt-4">
//             <div className="flex gap-2">
//               {!isSuccess && (
//                 <Button
//                   type="submit"
//                   onClick={form.handleSubmit(onSubmit)}
//                   disabled={isSubmitting}
//                   className="bg-[#013344] hover:bg-[#05596B] text-white flex-1 "
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     "Submit Request"
//                   )}
//                 </Button>
//               )}
//               <SheetClose asChild>
//                 <Button variant="outline" className="flex-1">
//                   <X className="mr-2 h-4 w-4" />
//                   {isSuccess ? "Close" : "Cancel"}
//                 </Button>
//               </SheetClose>
//             </div>
//           </div>
//         </motion.div>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-date-time-input";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Loader2,
  X,
  CalendarClock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SuccessToast, ToastContainer } from "@/components/ui/success-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  preferredDate: z.date(),
  meetingType: z.enum(["in-person", "virtual"]),
  message: z.string().optional(),
});

export function RequestMeetingForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCustomToast, setShowCustomToast] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      preferredDate: new Date(),
      meetingType: "in-person",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/meeting-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit request");
      }

      setIsSuccess(true);
      setShowCustomToast(true);
      setTimeout(() => setShowCustomToast(false), 5000); // Hide after 5 seconds
      toast.success("Meeting request submitted!", {
        description: "We'll contact you shortly to confirm your appointment.",
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
        duration: 5000,
      });

      // Reset form after success with defined values
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        form.reset({
          name: "",
          phone: "",
          preferredDate: new Date(),
          meetingType: "in-person",
          message: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit the form. Please try again.",
        {
          description: "Please check your information and try again.",
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="bg-[#013344] hover:bg-[#05596B] text-white flex items-center gap-2 w-auto"
        >
          <CalendarClock className="h-4 w-4" />
          Schedule Visit
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="h-full flex flex-col"
        >
          <SheetHeader className="space-y-2">
            <SheetTitle className="text-2xl font-bold text-[#013344]">
              Schedule a Visit
            </SheetTitle>
            <SheetDescription>
              Fill out the form below to request a property viewing appointment.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6 px-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-[#05596B]">
                              <User className="h-4 w-4" />
                              Your Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                {...field}
                                className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
                              />
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
                            <FormLabel className="flex items-center gap-2 text-[#05596B]">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <PhoneInput
                                placeholder="Enter your phone number"
                                {...field}
                                defaultCountry="EG"
                                className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="meetingType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[#05596B]">
                              Meeting Type
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="in-person"
                                    id="in-person"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="in-person"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
                                  >
                                    <Calendar className="mb-2 h-6 w-6" />
                                    Physical Meeting
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="virtual"
                                    id="virtual"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="virtual"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#05596B] [&:has([data-state=checked])]:border-[#05596B]"
                                  >
                                    <Clock className="mb-2 h-6 w-6" />
                                    Zoom
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-[#05596B]">
                              <Calendar className="h-4 w-4" />
                              Preferred Date & Time
                            </FormLabel>
                            <FormControl>
                              <SmartDatetimeInput
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="e.g. Tomorrow morning 9am"
                                className="border-[#05596B]/20 focus:border-[#05596B] focus:ring-[#05596B]"
                              />
                            </FormControl>
                            <FormDescription className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Please select your preferred meeting time
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#05596B]">
                              Additional Message (Optional)
                            </FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                className={cn(
                                  "flex min-h-[100px] w-full rounded-md border border-[#05596B]/20",
                                  "bg-background px-3 py-2 text-sm ring-offset-background",
                                  "placeholder:text-muted-foreground focus-visible:outline-none",
                                  "focus-visible:ring-2 focus-visible:ring-[#05596B] focus-visible:ring-offset-2",
                                  "disabled:cursor-not-allowed disabled:opacity-50"
                                )}
                                placeholder="Any specific requirements or questions?"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 space-y-4"
                    >
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <motion.svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#013344]">
                        Visit Request Submitted!
                      </h3>
                      <p className="text-[#05596B] text-center">
                        We&apos;ll get back to you shortly to confirm your
                        appointment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
              {!isSuccess && (
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="bg-[#013344] hover:bg-[#05596B] text-white flex-1 "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              )}
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  <X className="mr-2 h-4 w-4" />
                  {isSuccess ? "Close" : "Cancel"}
                </Button>
              </SheetClose>
            </div>
          </div>
        </motion.div>
      </SheetContent>
      {showCustomToast && (
        <ToastContainer>
          <SuccessToast
            title="Meeting request submitted!"
            description="We'll contact you shortly to confirm your appointment."
            onClose={() => setShowCustomToast(false)}
          />
        </ToastContainer>
      )}
    </Sheet>
  );
}
