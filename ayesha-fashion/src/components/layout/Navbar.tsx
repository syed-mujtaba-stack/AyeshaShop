"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUI } from "@/hooks/use-ui";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useIsMobile } from "@/hooks/use-media-query";
import { SITE_NAME, NAV_LINKS, CATEGORIES } from "@/constants";
import { SearchDrawer } from "./SearchDrawer";
import { CartDrawer } from "./CartDrawer";

const megaMenuData = {
  "Categories": {
    columns: [
      {
        title: "Clothing",
        links: ["Luxury Dresses", "Designer Shoes", "Premium Beauty", "Luxury Perfumes", "Fine Jewelry", "Designer Bags"],
      },
      {
        title: "Featured",
        links: ["New Arrivals", "Best Sellers", "Luxury Collection", "Sale Items", "Limited Edition"],
      },
      {
        title: "Collections",
        links: ["Spring 2026", "Evening Wear", "Casual Luxury", "Accessories", "Gift Guide"],
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      alt: "Featured Collection",
    },
  },
  "Brands": {
    columns: [
      {
        title: "Luxury Brands",
        links: ["Maison Luxe", "Bella Couture", "Artisan Leather Co.", "Éclat Jewels", "Opulence Atelier"],
      },
      {
        title: "Designer Brands",
        links: ["Luminous Skin", "Parfums d'Élégance", "Luxe Footwear", "Velvet Designs", "Crystal House"],
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
      alt: "Designer Brands",
    },
  },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openSearch } = useUI();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryLinks = NAV_LINKS.filter((l) => ["Home", "Shop", "New Arrivals", "Best Sellers", "Offers", "About", "Contact"].includes(l.label));
  const megaLinks = ["Categories", "Brands"];

  return (
    <>
      <header
        className={cn(
          "bg-white/95 backdrop-blur-md border-b border-border transition-all duration-500",
          isScrolled ? "shadow-sm" : "shadow-none"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 -ml-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl lg:text-3xl font-bold tracking-[0.2em] text-dark hover:text-gold transition-colors duration-300"
            >
              {SITE_NAME}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-dark/80 hover:text-gold transition-colors duration-200 rounded-lg hover:bg-lighter-gray"
                >
                  {link.label}
                </Link>
              ))}
              {megaLinks.map((label) => (
                <div
                  key={label}
                  className="relative"
                  onMouseEnter={() => setActiveMega(label)}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      activeMega === label ? "text-gold bg-lighter-gray" : "text-dark/80 hover:text-gold hover:bg-lighter-gray"
                    )}
                  >
                    {label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeMega === label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {activeMega === label && megaMenuData[label as keyof typeof megaMenuData] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-border p-6"
                      >
                        <div className="flex gap-8">
                          <div className="flex-1 grid grid-cols-2 gap-6">
                            {megaMenuData[label as keyof typeof megaMenuData].columns.map((col) => (
                              <div key={col.title}>
                                <h4 className="text-xs font-semibold text-medium-gray uppercase tracking-wider mb-3">
                                  {col.title}
                                </h4>
                                <ul className="space-y-2">
                                  {col.links.map((link) => (
                                    <li key={link}>
                                      <Link
                                        href={`/shop?category=${link.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-sm text-dark/70 hover:text-gold transition-colors duration-200"
                                        onClick={() => setActiveMega(null)}
                                      >
                                        {link}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="w-48">
                            <div
                              className="w-full h-48 rounded-lg bg-cover bg-center"
                              style={{ backgroundImage: `url(${megaMenuData[label as keyof typeof megaMenuData].image.src})` }}
                            />
                            <p className="text-xs text-medium-gray mt-2 text-center">{megaMenuData[label as keyof typeof megaMenuData].image.alt}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={openSearch}
                className="p-2 hover:bg-lighter-gray rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-dark" />
              </button>
              <Link
                href="/wishlist"
                className="p-2 hover:bg-lighter-gray rounded-lg transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 text-dark" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className="hidden sm:flex p-2 hover:bg-lighter-gray rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5 text-dark" />
              </Link>
              <CartButton />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block px-3 py-2.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border pt-3 mt-3">
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist ({wishlistItems.length})
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchDrawer />
      <CartDrawer />
    </>
  );
}

function CartButton() {
  const { openDrawer, getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? getItemCount() : 0;

  return (
    <button
      onClick={openDrawer}
      className="p-2 hover:bg-lighter-gray rounded-lg transition-colors relative"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="h-5 w-5 text-dark" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
