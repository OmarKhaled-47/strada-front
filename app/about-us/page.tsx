/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import GetAboutApi from "../api/AboutApi";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<{
    heroHeading: string;
    heroSubHeading: string;
    heroImageUrl: string;
    companyOverview: string;
  } | null>(null);

  useEffect(() => {
    getAboutData();
  }, []);

  const getAboutData = () => {
    GetAboutApi.getAboutSection()
      .then((res: any) => {
        const heroBlock = res.data.data.blocks.find(
          (block: any) => block.__component === "layout.hero-section"
        );

        if (heroBlock) {
          setAboutData({
            heroHeading: heroBlock.heading,
            heroSubHeading: heroBlock.subHeading,
            heroImageUrl: heroBlock.image.url,
            companyOverview: res.data.data.description,
          });
        }
      })
      .catch((error: any) => {
        console.error("Error fetching about page data:", error);
      });
  };

  if (!aboutData) {
    return <div>Loading...</div>; // Add a loading state
  }
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative h-[70vh] bg-[#013344]">
        <Image
          src="/placeholder.svg"
          alt="Strada Properties Professionals"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#013344]/70 to-[#013344]/90">
          <div className="h-full flex flex-col justify-center items-center text-white px-4 max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center mb-6"
            >
              More About Strada Properties
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-center max-w-3xl"
            >
              Commitment to redefining luxury real estate.
            </motion.p>
          </div>
        </div>
      </section> */}
      <section className="relative h-[70vh] bg-[#333536]">
        {aboutData.heroImageUrl && (
          <Image
            src={aboutData.heroImageUrl}
            alt="City Sunset"
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#013344]/50">
          <div className="h-full flex flex-col justify-center items-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center mb-4"
            >
              {aboutData.heroHeading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-center"
            >
              {aboutData.heroSubHeading}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-[#028180] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Company Overview</h2>
            <p className="text-lg leading-relaxed max-w-4xl">
              {aboutData.companyOverview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-[#013344] mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                At Strada, we stand by values that guide our journey and shape
                every project we undertake:
              </p>

              <motion.ul
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-[#028180] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#013344]">
                      Integrity
                    </h3>
                    <p className="text-gray-600">
                      Honesty and transparency in every interaction.
                    </p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-[#028180] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#013344]">
                      Innovation
                    </h3>
                    <p className="text-gray-600">
                      Pioneering modern solutions to redefine real estate.
                    </p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-[#028180] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#013344]">
                      Sustainability
                    </h3>
                    <p className="text-gray-600">
                      Prioritizing eco-friendly practices for a better future.
                    </p>
                  </div>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-[#028180] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#013344]">
                      Community
                    </h3>
                    <p className="text-gray-600">
                      Building spaces that foster connection and well-being.
                    </p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden shadow-xl hidden md:block"
            >
              <Image
                src="/Values.png"
                alt="Strada Properties Values"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden shadow-xl hidden md:block"
            >
              <Image
                src="/Mission.png"
                alt="Strada Properties Mission"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial="visible"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-[#013344] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To assist clients in making informed property decisions by
                offering data-backed insights, personalized services, and access
                to exclusive high-value properties. The firm&apos;s approach
                combines technology and industry expertise to provide a unique
                experience in the real estate market.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-[#013344] mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To transform the Egyptian real estate market through innovative
                technology and premium, client-focused services, making Strada
                Properties the go-to consultancy for luxury real estate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative h-[400px] rounded-lg overflow-hidden shadow-xl hidden md:block"
            >
              <Image
                src="/Vision.png"
                alt="Strada Properties Vision"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Now */}
      {/* <section className="py-20 px-4 bg-[#013344] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Join Now</h2>
            <p className="text-lg mb-10">
              Are you ready to shape the future of real estate with us? At
              Strada, we&apos;re always looking for passionate, driven
              professionals to join our growing team.
            </p>
            <Link
              href="/careers"
              className="inline-block bg-white text-[#013344] font-semibold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 text-lg"
            >
              View Opportunities
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* Stats Section */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className="text-center p-6 border-b-4 border-[#028180] bg-gray-50 rounded-lg shadow-sm"
            >
              <h3 className="text-5xl font-bold text-[#013344] mb-2">10+</h3>
              <p className="text-gray-600">Years of Experience</p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="text-center p-6 border-b-4 border-[#028180] bg-gray-50 rounded-lg shadow-sm"
            >
              <h3 className="text-5xl font-bold text-[#013344] mb-2">500+</h3>
              <p className="text-gray-600">Properties Sold</p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="text-center p-6 border-b-4 border-[#028180] bg-gray-50 rounded-lg shadow-sm"
            >
              <h3 className="text-5xl font-bold text-[#013344] mb-2">50+</h3>
              <p className="text-gray-600">Expert Agents</p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="text-center p-6 border-b-4 border-[#028180] bg-gray-50 rounded-lg shadow-sm"
            >
              <h3 className="text-5xl font-bold text-[#013344] mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction</p>
            </motion.div>
          </motion.div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#013344] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why our clients trust Strada Properties for their luxury
              real estate needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#028180] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Ahmed M.</h4>
                  <p className="text-sm text-gray-500">Property Investor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &ldquo;Strada Properties provided exceptional service throughout
                my investment journey. Their market insights were
                invaluable.&ldquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#028180] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sara K.</h4>
                  <p className="text-sm text-gray-500">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &quot;The team at Strada went above and beyond to find us our
                dream home. Their attention to detail and understanding of our
                needs was impressive.&ldquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#028180] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Mohamed R.</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &ldquo;Finding the perfect commercial space was effortless with
                Strada Properties. Their expertise in the Egyptian market is
                unmatched.&ldquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#028180] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let Strada Properties guide you through the luxury real estate
              market with expertise and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-white text-[#028180] font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-all duration-300"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
