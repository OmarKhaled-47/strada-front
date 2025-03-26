"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Footer() {
  const [openDrawer, setOpenDrawer] = useState<
    "faqs" | "privacy" | "terms" | null
  >(null);

  return (
    <footer className="bg-[#003344] text-white">
      {/* Newsletter Section */}
      {/* <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[#004455] to-[#002233] rounded-xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with New Properties
              </h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter and be the first to know about
                exclusive listings and market insights.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our privacy policy and consent to
                receive updates.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Strada Logo"
                width={110}
                height={60}
                className="h-auto w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted partner in finding the perfect property in Egypt.
              With years of experience and a commitment to excellence, we help
              you make informed real estate decisions.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/people/Strada-properties/61565371004923/"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/strada.properties/"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://eg.linkedin.com/company/strada-properties-egypt"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">Information</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setOpenDrawer("faqs")}
                  className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setOpenDrawer("privacy")}
                  className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setOpenDrawer("terms")}
                  className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                <a
                  href="https://maps.app.goo.gl/5niD4jy1occGCjxP6"
                  target="_blank"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  One Kattameya, 215, Maadi Kattameya Ringroad - Cairo, Egypt
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+0201123960001"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Get in touch
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:sales@strada-properties.com"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  sales@strada-properties.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Strada Properties. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button
              onClick={() => setOpenDrawer("privacy")}
              className="text-gray-400 hover:text-orange-500 transition-colors text-left"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setOpenDrawer("terms")}
              className="text-gray-400 hover:text-orange-500 transition-colors text-left"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      <Drawer
        open={openDrawer === "faqs"}
        onOpenChange={(open) => !open && setOpenDrawer(null)}
      >
        <DrawerContent className="max-h-[90vh] overflow-hidden">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#003344]">
              Frequently Asked Questions
            </DrawerTitle>
            <DrawerDescription>
              Common questions about our real estate services
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#003344] font-medium">
                  How do I schedule a property viewing?
                </AccordionTrigger>
                <AccordionContent>
                  You can schedule a property viewing by contacting our team
                  through the website&apos;s contact form, calling our office
                  directly, or using the chat feature. Our agents will arrange a
                  convenient time for you to visit the property.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[#003344] font-medium">
                  What documents do I need to buy a property?
                </AccordionTrigger>
                <AccordionContent>
                  To purchase a property, you&apos;ll typically need
                  identification (passport or ID), proof of address, proof of
                  income or employment, bank statements, and sometimes tax
                  returns. For foreign buyers, additional documentation may be
                  required. Our agents will guide you through the specific
                  requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[#003344] font-medium">
                  How long does the buying process take?
                </AccordionTrigger>
                <AccordionContent>
                  The property buying process in Egypt typically takes between
                  2-3 months from offer acceptance to completion. This timeline
                  can vary based on property type, location, financing
                  arrangements, and legal requirements. Our team will provide
                  you with a more specific timeline based on your situation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-[#003344] font-medium">
                  What are the additional costs when buying property?
                </AccordionTrigger>
                <AccordionContent>
                  When purchasing property, you should budget for additional
                  costs including registration fees (typically 2-3% of property
                  value), real estate agent commission (if applicable), legal
                  fees, property tax, and sometimes maintenance or community
                  fees. We provide a detailed breakdown of all costs before you
                  proceed with a purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-[#003344] font-medium">
                  Do you offer property management services?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer comprehensive property management services for
                  investors and homeowners. Our services include tenant
                  sourcing, rent collection, property maintenance, regular
                  inspections, and financial reporting. Contact our property
                  management team for a tailored solution.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="bg-[#003344] text-white py-2 px-4 rounded-md hover:bg-[#002233] transition-colors">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={openDrawer === "privacy"}
        onOpenChange={(open) => !open && setOpenDrawer(null)}
      >
        <DrawerContent className="max-h-[90vh] overflow-hidden">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#003344]">
              Privacy Policy
            </DrawerTitle>
            <DrawerDescription>Last updated: March 2025</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                1. Information We Collect
              </h3>
              <p className="text-gray-700">
                We collect personal information that you voluntarily provide to
                us when you register on our website, express interest in
                obtaining information about our properties or services,
                participate in activities on our website, or otherwise contact
                us.
              </p>
              <p className="text-gray-700 mt-2">
                The personal information we collect may include names, email
                addresses, phone numbers, home addresses, and other information
                you choose to provide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-700">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                <li>Provide, operate, and maintain our website and services</li>
                <li>
                  Improve, personalize, and expand our website and services
                </li>
                <li>Understand and analyze how you use our website</li>
                <li>
                  Develop new products, services, features, and functionality
                </li>
                <li>
                  Communicate with you about our properties, services, and
                  events
                </li>
                <li>Process transactions and send related information</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                3. Sharing Your Information
              </h3>
              <p className="text-gray-700">
                We may share your information with third parties that perform
                services for us or on our behalf, including payment processing,
                data analysis, email delivery, hosting services, customer
                service, and marketing assistance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                4. Cookies and Tracking Technologies
              </h3>
              <p className="text-gray-700">
                We may use cookies and similar tracking technologies to track
                activity on our website and store certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                5. Your Privacy Rights
              </h3>
              <p className="text-gray-700">
                Depending on your location, you may have certain rights
                regarding your personal information, such as the right to
                request access, correction, or deletion of your data.
              </p>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="bg-[#003344] text-white py-2 px-4 rounded-md hover:bg-[#002233] transition-colors">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={openDrawer === "terms"}
        onOpenChange={(open) => !open && setOpenDrawer(null)}
      >
        <DrawerContent className="max-h-[90vh] overflow-hidden">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#003344]">
              Terms of Service
            </DrawerTitle>
            <DrawerDescription>Last updated: March 2025</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                1. Acceptance of Terms
              </h3>
              <p className="text-gray-700">
                By accessing or using our website, you agree to be bound by
                these Terms of Service and all applicable laws and regulations.
                If you do not agree with any of these terms, you are prohibited
                from using or accessing this site.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                2. Use License
              </h3>
              <p className="text-gray-700">
                Permission is granted to temporarily view the materials on
                Strada Properties&apos; website for personal, non-commercial use
                only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or
                  &ldquo;mirror&ldquo; the materials on any other server
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                3. Property Information
              </h3>
              <p className="text-gray-700">
                While we strive to provide accurate and up-to-date information
                about properties, we cannot guarantee that all information is
                current or error-free. Property details, prices, and
                availability are subject to change without notice.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                4. Limitation of Liability
              </h3>
              <p className="text-gray-700">
                In no event shall Strada Properties or its suppliers be liable
                for any damages arising out of the use or inability to use the
                materials on our website, even if we have been notified of the
                possibility of such damage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#003344] mb-2">
                5. Governing Law
              </h3>
              <p className="text-gray-700">
                These terms and conditions are governed by and construed in
                accordance with the laws of Egypt, and you irrevocably submit to
                the exclusive jurisdiction of the courts in that location.
              </p>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="bg-[#003344] text-white py-2 px-4 rounded-md hover:bg-[#002233] transition-colors">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </footer>
  );
}
