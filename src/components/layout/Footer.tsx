"use client";

import Link from "next/link";
import { Globe, Camera, MessageCircle, Video, Heart, Mail, MapPin, Phone } from "lucide-react";
import { SITE_NAME, SITE_FULL_NAME } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Luxury Dresses", href: "/shop?category=luxury-dresses" },
    { label: "Designer Bags", href: "/shop?category=designer-bags" },
    { label: "Fine Jewelry", href: "/shop?category=fine-jewelry" },
    { label: "Luxury Perfumes", href: "/shop?category=luxury-perfumes" },
    { label: "Designer Shoes", href: "/shop?category=designer-shoes" },
    { label: "Offers", href: "/offers" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Blog", href: "/blog" },
    { label: "Careers", href: "/contact" },
    { label: "Press", href: "/contact" },
    { label: "Loyalty Program", href: "/offers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading text-2xl lg:text-3xl text-white mb-3">
              Join the Ayesha Circle
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Subscribe for exclusive access to new collections, private sales, and luxury style inspiration.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="flex gap-2 flex-1"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold flex-1"
                  aria-label="Email address for newsletter"
                />
                <Button variant="gold" className="shrink-0" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link
              href="/"
              className="font-heading text-2xl tracking-[0.2em] text-white hover:text-gold transition-colors inline-block mb-4"
            >
              {SITE_NAME}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              {SITE_FULL_NAME} brings you the finest in luxury fashion. 
              Curated collections from the world&apos;s most prestigious designers, 
              delivered with white-glove service.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@ayesha-fashion.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: MessageCircle, label: "Facebook", href: "#" },
                { icon: Camera, label: "Instagram", href: "#" },
                { icon: Globe, label: "Twitter", href: "#" },
                { icon: Video, label: "Youtube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              &copy; 2026 {SITE_FULL_NAME} SMC Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-white/30 text-xs">
              Made with <Heart className="h-3 w-3 text-gold" /> in Pakistan
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
