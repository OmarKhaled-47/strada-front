"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  Search,
  Users,
  Phone,
  Rocket,
  MapPinned,
  HardHat,
  Heart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/app/favorites/contexts/FavoritesContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { favorites } = useFavorites();

  const favoritesCount =
    favorites.compounds.length + favorites.properties.length;

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { href: "/", icon: Home, label: "Home" },
    {
      href: "/about-us",
      icon: Users,
      label: "About Us",
    },
    {
      href: "/areas",
      icon: MapPinned,
      label: "Destinations",
    },
    {
      href: "/developers",
      icon: HardHat,
      label: "Developers",
    },
    {
      href: "/new-launches",
      icon: Rocket,
      label: "New Launches",
    },
    {
      href: "/search",
      icon: Search,
      label: "Search",
    },
    {
      href: "/contact",
      icon: Phone,
      label: "Contact Us",
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-gradient-to-b from-[#003344]/95 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center transition-transform hover:scale-105"
            aria-label="Go to homepage"
          >
            <Image
              src={isScrolled ? "/LogoD.png" : "/logo.png"}
              alt="Strada Logo"
              width={110}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium hover:text-orange-500 transition-colors duration-200 py-2 ${
                  isScrolled ? "text-[#003344]" : "text-white"
                }`}
              >
                <span className="relative group">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </div>

          {/* Favorites and Contact Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/favorites"
              className={`relative p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? "text-[#003344] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="View favorites"
            >
              <Heart
                className="h-6 w-6"
                fill={favoritesCount > 0 ? "#E3A325" : "none"}
              />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs rounded-full">
                  {favoritesCount}
                </Badge>
              )}
            </Link>

            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/favorites"
              className={`relative p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? "text-[#003344] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="View favorites"
            >
              <Heart
                className="h-6 w-6"
                fill={favoritesCount > 0 ? "#E3A325" : "none"}
              />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs rounded-full">
                  {favoritesCount}
                </Badge>
              )}
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isScrolled
                      ? "text-[#003344] hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-white"
              >
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="text-left">
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/LogoD.png"
                        alt="Strada Logo"
                        width={110}
                        height={50}
                        className="h-10 w-auto"
                        priority
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col mt-8"
                  aria-label="Mobile navigation"
                >
                  <SheetClose asChild>
                    <Link
                      href="/favorites"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Heart
                        className="h-5 w-5"
                        fill={favoritesCount > 0 ? "#E3A325" : "none"}
                      />
                      <span>Favorites</span>
                      {favoritesCount > 0 && (
                        <Badge className="ml-auto bg-orange-500 text-white">
                          {favoritesCount}
                        </Badge>
                      )}
                    </Link>
                  </SheetClose>

                  {navigationLinks.map(({ href, icon: Icon, label }) => (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="mt-8 px-4">
                    <Button
                      asChild
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
