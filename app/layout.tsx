import type React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { FavoritesProvider } from "./favorites/contexts/FavoritesContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#05596B",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://strada-properties.com"
  ),
  title: {
    default: "Strada Properties | Premier Real Estate Brokerage",
    template: "%s | Strada Properties",
  },
  description:
    "Strada Properties offers exclusive real estate listings, luxury homes, and investment properties in prime locations. Connect with our expert agents to find your dream home.",
  keywords: [
    "real estate",
    "Strada Properties",
    "property listings",
    "luxury homes",
    "investment properties",
    "real estate agents",
    "compounds",
    "developers",
  ],
  authors: [{ name: "Strada Properties" }],
  creator: "Strada Properties",
  publisher: "Strada Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Strada Properties",
    title: "Strada Properties | Premier Real Estate Brokerage",
    description:
      "Strada Properties offers exclusive real estate listings, luxury homes, and investment properties in prime locations. Connect with our expert agents to find your dream home.",
    images: [
      {
        url: "/images/strada-properties-og.jpg",
        width: 1200,
        height: 630,
        alt: "Strada Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strada Properties | Premier Real Estate Brokerage",
    description:
      "Strada Properties offers exclusive real estate listings, luxury homes, and investment properties in prime locations. Connect with our expert agents to find your dream home.",
    images: ["/images/strada-properties-twitter.jpg"],
    creator: "@StradaProperties",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <FavoritesProvider>
        <body className={`${montserrat.variable} font-sans antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </FavoritesProvider>
    </html>
  );
}
