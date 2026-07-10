"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { currentCustomer } from "@/data/customers";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Notifications", href: "/account/notifications", icon: Bell },
  { label: "Profile", href: "/account/profile", icon: User },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const customer = currentCustomer;

  return (
    <div className="min-h-screen bg-off-white">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-lighter-gray transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-heading text-lg font-semibold">My Account</span>
        <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm font-semibold">
          {getInitials(`${customer.firstName} ${customer.lastName}`)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={cn(
              "lg:w-64 flex-shrink-0",
              mobileMenuOpen
                ? "fixed inset-0 z-30 bg-white lg:relative lg:inset-auto lg:z-auto"
                : "hidden lg:block"
            )}
          >
            {mobileMenuOpen && (
              <div
                className="lg:hidden absolute inset-0 bg-black/20 -z-10"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            <div className={cn("lg:sticky lg:top-8", mobileMenuOpen && "p-4")}>
              {/* Desktop User Card */}
              <div className="hidden lg:block mb-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold text-lg overflow-hidden">
                    {customer.avatar ? (
                      <img
                        src={customer.avatar}
                        alt={customer.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(`${customer.firstName} ${customer.lastName}`)
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-xs text-medium-gray">{customer.email}</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    link.href === "/account"
                      ? pathname === "/account"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gold/10 text-gold border border-gold/20"
                          : "text-medium-gray hover:text-dark hover:bg-lighter-gray border border-transparent"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/5 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}