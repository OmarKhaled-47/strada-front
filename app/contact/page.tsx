/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";

import GetContactApi from "../api/ContactApi";
import { Loader2, MessageSquare } from "lucide-react";
import ContactForm from "../_components/Form";
import { ContactHeroSection } from "./_components/ContactHeroSection";
import ContactInfo from "./_components/ContactInfo";
import { RequestMeetingForm } from "../_components/RequestMeetingForm";

export default function ContactPage() {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await GetContactApi.getContact();
        setContactData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact information. Please try again later.");
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F8]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#003344] mx-auto mb-4" />
          <p className="text-[#003344] font-medium">
            Loading contact information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F8]">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#003344] text-white rounded-md hover:bg-[#002233] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Extract hero section data
  const heroBlock = contactData?.blocks?.find(
    (block: any) => block.__component === "layout.hero-section"
  );

  return (
    <div className="min-h-screen bg-[#F7F8F8] ">
      <ContactHeroSection
        heading={heroBlock?.heading || "Contact Us"}
        subHeading={
          heroBlock?.subHeading ||
          "We're here to help with all your real estate needs"
        }
        imageUrl={heroBlock?.image?.url || "/sections-bg.png"}
      />

      <div className="container mx-auto py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-28">
            <div className="lg:col-span-3">
              <ContactInfo />
            </div>
            <div className="lg:col-span-2  overflow-hidden">
              <ContactForm />
              <div className="bg-gradient-to-r from-[s#ffffff] to-[#fafbfc] p-6 rounded-xl text-[#004455] mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#004455] p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl">
                    Need Immediate Assistance?
                  </h3>
                </div>
                <p className="mb-4">
                  Our team is available for virtual consultations. Schedule a
                  video call with one of our real estate experts.
                </p>
                <RequestMeetingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
