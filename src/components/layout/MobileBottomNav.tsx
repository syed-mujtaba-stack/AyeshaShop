"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUI } from "@/hooks/use-ui";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "#", icon: Search, action: "search" },
  { label: "Wishlist", href: "/wishlist", icon: Heart, badge: "wishlist" },
  { label: "Cart", href: "#", icon: ShoppingBag, action: "cart", badge: "cart" },
  { label: "Account", href: "/account", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openSearch } = useUI();
  const { openDrawer, getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleAction = (action?: string) => {
    if (action === "search") openSearch();
    if (action === "cart") openDrawer();
  };

  const adminPaths = ["/admin"];
  if (adminPaths.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {links.map(({ label, href, icon: Icon, action, badge }) => {
          const isActive = href !== "#" && pathname === href;
          const badgeCount = badge === "cart" ? getItemCount() : badge === "wishlist" ? wishlistItems.length : 0;

          const iconEl = (
            <div className="relative">
              <Icon className={cn("h-5 w-5", isActive ? "text-gold" : "text-medium-gray")} />
              {badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {badgeCount > 9 ? "9+" : badgeCount}
                </span>
              )}
            </div>
          );

          const labelEl = (
            <span className={cn("text-[10px] font-medium", isActive ? "text-gold" : "text-medium-gray")}>
              {label}
            </span>
          );

          if (action) {
            return (
              <button
                key={label}
                onClick={() => handleAction(action)}
                className="flex flex-col items-center justify-center gap-0.5 relative min-w-[60px] py-1"
                aria-label={label}
              >
                {iconEl}
                {labelEl}
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 relative min-w-[60px] py-1"
              aria-label={label}
            >
              {iconEl}
              {labelEl}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
