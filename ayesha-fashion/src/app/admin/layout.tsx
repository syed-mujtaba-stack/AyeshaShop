"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  Warehouse,
  Tag,
  Star,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-off-white">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-dark border-r border-dark-gray transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-dark-gray">
          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-white font-heading font-bold text-sm">A</span>
            </div>
            {!collapsed && (
              <span className="text-white font-heading font-bold text-lg whitespace-nowrap">AYESHA</span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-light-gray hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-light-gray hover:text-white hover:bg-dark-gray"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-dark-gray space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg text-light-gray hover:text-white hover:bg-dark-gray transition-all"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-light-gray hover:text-white hover:bg-dark-gray transition-all w-full">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300 min-h-screen",
          collapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-dark"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:block w-64 lg:w-80">
                <Input
                  placeholder="Search..."
                  icon={<Search className="h-4 w-4" />}
                  className="bg-lighter-gray border-0 h-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-medium-gray hover:text-dark hover:bg-lighter-gray transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">AK</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-dark">Ayesha Khan</p>
                  <p className="text-xs text-light-gray">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}