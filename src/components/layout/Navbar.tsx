"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useUI } from "@/hooks/use-ui";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/hooks/use-auth";
import { SITE_NAME, NAV_LINKS } from "@/constants";
import { SearchDrawer } from "./SearchDrawer";
import { CartDrawer } from "./CartDrawer";

const megaMenuData = {
  "Categories": {
    columns: [
      {
        title: "Clothing",
        links: [
          { label: "Luxury Dresses", href: "/shop?category=luxury-dresses" },
          { label: "Evening Wear", href: "/shop?category=evening-wear" },
          { label: "Casual Luxury", href: "/shop?category=casual-luxury" },
          { label: "Limited Edition", href: "/shop?category=limited-edition" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Designer Bags", href: "/shop?category=designer-bags" },
          { label: "Fine Jewelry", href: "/shop?category=fine-jewelry" },
          { label: "Designer Shoes", href: "/shop?category=designer-shoes" },
          { label: "Premium Beauty", href: "/shop?category=premium-beauty" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "New Arrivals", href: "/new-arrivals" },
          { label: "Best Sellers", href: "/best-sellers" },
          { label: "Luxury Collection", href: "/luxury-collection" },
          { label: "Sale", href: "/offers" },
        ],
      },
    ],
    promo: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=480&q=80",
      alt: "Spring 2026 Collection",
      tagline: "Spring / Summer 2026",
      title: "The New\nSilhouette",
      href: "/collections",
    },
  },
  "Brands": {
    columns: [
      {
        title: "Luxury Houses",
        links: [
          { label: "Maison Luxe", href: "/shop?brand=maison-luxe" },
          { label: "Bella Couture", href: "/shop?brand=bella-couture" },
          { label: "Artisan Leather Co.", href: "/shop?brand=artisan-leather" },
          { label: "Opulence Atelier", href: "/shop?brand=opulence-atelier" },
        ],
      },
      {
        title: "Designers",
        links: [
          { label: "Éclat Jewels", href: "/shop?brand=eclat-jewels" },
          { label: "Velvet Designs", href: "/shop?brand=velvet-designs" },
          { label: "Crystal House", href: "/shop?brand=crystal-house" },
          { label: "Luxe Footwear", href: "/shop?brand=luxe-footwear" },
        ],
      },
      {
        title: "Beauty & Fragrance",
        links: [
          { label: "Luminous Skin", href: "/shop?brand=luminous-skin" },
          { label: "Parfums d'Élégance", href: "/shop?brand=parfums-elegance" },
          { label: "View All Brands", href: "/shop" },
        ],
      },
    ],
    promo: {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=480&q=80",
      alt: "Designer Brands",
      tagline: "Curated for You",
      title: "The World's\nFinest",
      href: "/shop",
    },
  },
};

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openSearch } = useUI();
  const { items: wishlistItems } = useWishlist();
  const { user, initialized, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  const primaryLinks = NAV_LINKS.filter((l) => ["Home", "Shop", "New Arrivals", "Best Sellers", "Offers", "About", "Contact"].includes(l.label));
  const megaLinks = ["Categories", "Brands"];

  const displayName = user?.displayName || "User";
  const photoURL = user?.photoURL;

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
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 -ml-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link
              href="/"
              className="font-heading text-2xl lg:text-3xl font-bold tracking-[0.2em] text-dark hover:text-gold transition-colors duration-300"
            >
              {SITE_NAME}
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[13px] font-medium tracking-wide uppercase text-dark/70 hover:text-gold transition-colors duration-300"
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
                      "flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300",
                      activeMega === label ? "text-gold" : "text-dark/70 hover:text-gold"
                    )}
                  >
                    {label}
                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", activeMega === label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {activeMega === label && megaMenuData[label as keyof typeof megaMenuData] && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[780px] bg-white rounded-sm shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden"
                      >
                        <div className="flex">
                          <div className="flex-1 py-8 px-8">
                            <div className="flex gap-8">
                              {megaMenuData[label as keyof typeof megaMenuData].columns.map((col, colIdx) => (
                                <div key={col.title} className={cn(colIdx > 0 && "pl-8 border-l border-border/40")}>
                                  <h4 className="text-[11px] font-semibold text-medium-gray uppercase tracking-[0.15em] mb-4">
                                    {col.title}
                                  </h4>
                                  <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                      <li key={link.label}>
                                        <Link
                                          href={link.href}
                                          className="group/link relative text-[13px] text-dark/60 hover:text-dark transition-colors duration-200 inline-block"
                                          onClick={() => setActiveMega(null)}
                                        >
                                          {link.label}
                                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover/link:w-full" />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-[240px] flex-shrink-0 relative overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                              style={{ backgroundImage: `url(${megaMenuData[label as keyof typeof megaMenuData].promo.src})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                              <p className="text-[10px] font-medium text-white/70 uppercase tracking-[0.2em] mb-1.5">
                                {megaMenuData[label as keyof typeof megaMenuData].promo.tagline}
                              </p>
                              <h3 className="font-heading text-xl font-bold text-white leading-tight whitespace-pre-line mb-3">
                                {megaMenuData[label as keyof typeof megaMenuData].promo.title}
                              </h3>
                              <Link
                                href={megaMenuData[label as keyof typeof megaMenuData].promo.href}
                                onClick={() => setActiveMega(null)}
                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white uppercase tracking-[0.15em] group/link"
                              >
                                <span className="border-b border-white/50 group-hover/link:border-white transition-colors duration-300">
                                  Shop Now
                                </span>
                                <svg className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

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

              {initialized && user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="flex items-center gap-2 p-1.5 hover:bg-lighter-gray rounded-lg transition-colors"
                    aria-label="Account menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-semibold overflow-hidden">
                      {photoURL ? (
                        <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                      ) : (
                        getInitials(displayName)
                      )}
                    </div>
                    <ChevronDown className={cn("h-3.5 w-3.5 text-dark/60 transition-transform duration-200", userMenuOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 border-b border-border">
                          <p className="font-medium text-sm text-dark truncate">{displayName}</p>
                          <p className="text-xs text-medium-gray truncate">{user.email}</p>
                        </div>
                        <div className="p-1.5">
                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                            My Account
                          </Link>
                          <Link
                            href="/account/orders"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                          >
                            <Package className="h-4 w-4" />
                            My Orders
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-error hover:bg-error/5 rounded-lg transition-colors w-full"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : initialized ? (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              ) : (
                <div className="w-8 h-8 rounded-full bg-lighter-gray animate-pulse" />
              )}

              <CartButton />
            </div>
          </div>
        </div>

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
                  {user ? (
                    <>
                      <div className="px-3 py-2 mb-1">
                        <p className="text-sm font-medium text-dark">{displayName}</p>
                        <p className="text-xs text-medium-gray">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); closeMobileMenu(); }}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-error hover:bg-error/5 rounded-lg transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-dark/80 hover:text-gold hover:bg-lighter-gray rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Sign In
                    </Link>
                  )}
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
