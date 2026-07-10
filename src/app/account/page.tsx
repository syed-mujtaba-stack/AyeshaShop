"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  useFirestoreOrders,
  useFirestoreAddresses,
  useFirestoreWishlist,
  useFirestoreNotifications,
} from "@/hooks/use-firestore-user";
import { getUserProfile } from "@/lib/firestore";
import type { FirestoreUserProfile } from "@/lib/firestore";
import { formatPrice, formatDate, cn, getInitials } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Heart,
  MapPin,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useFirestoreOrders();
  const { addresses, loading: addressesLoading } = useFirestoreAddresses();
  const { productIds } = useFirestoreWishlist();
  const { notifications, loading: notifsLoading } = useFirestoreNotifications();
  const [profile, setProfile] = useState<FirestoreUserProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then((snap) => {
      if (snap.exists()) setProfile(snap.data() as FirestoreUserProfile);
    });
  }, [user]);

  const displayName = user?.displayName || profile ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() || "User" : "User";
  const firstName = displayName.split(" ")[0];
  const email = user?.email || profile?.email || "";
  const avatar = user?.photoURL || profile?.avatar || "";
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const recentOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      color: "text-gold bg-gold/10",
      href: "/account/orders",
    },
    {
      label: "Wishlist",
      value: productIds.size,
      icon: Heart,
      color: "text-error bg-error/5",
      href: "/account/wishlist",
    },
    {
      label: "Addresses",
      value: addresses.length,
      icon: MapPin,
      color: "text-blue-600 bg-blue-50",
      href: "/account/addresses",
    },
    {
      label: "Notifications",
      value: unreadNotifications,
      suffix: "unread",
      icon: ShoppingBag,
      color: "text-purple-600 bg-purple-50",
      href: "/account/notifications",
    },
  ];

  const loading = ordersLoading || addressesLoading || notifsLoading;

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-gradient-to-br from-gold/5 via-white to-white border border-gold/10 p-6 sm:p-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-dark">
          Welcome back, {firstName}
        </h1>
        <p className="text-medium-gray mt-1">
          Here&apos;s an overview of your account activity.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      stat.color
                    )}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-light-gray group-hover:text-gold transition-colors" />
                </div>
                <p className="text-2xl font-heading font-bold text-dark">
                  {stat.value}
                </p>
                <p className="text-xs text-medium-gray mt-0.5">
                  {stat.label}
                  {stat.suffix && (
                    <span className="ml-1 text-gold">({stat.suffix})</span>
                  )}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link href="/account/orders">
              <Button variant="link" size="sm" className="flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-lighter-gray" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-lighter-gray rounded w-24" />
                      <div className="h-2 bg-lighter-gray rounded w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-10 h-10 text-light-gray mx-auto mb-3" />
                <p className="text-medium-gray text-sm">No orders yet</p>
                <Link href="/shop">
                  <Button variant="gold" size="sm" className="mt-3">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.slice(0, 3).map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-lighter-gray transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-lighter-gray flex items-center justify-center">
                        <Package className="w-5 h-5 text-medium-gray" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-medium-gray">
                          {formatDate(order.createdAt)} &middot;{" "}
                          {order.items.length} item(s)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-dark">
                        {formatPrice(order.total)}
                      </p>
                      <Badge
                        variant={
                          order.status === "delivered" || order.status === "confirmed"
                            ? "success"
                            : order.status === "cancelled"
                            ? "error"
                            : order.status === "processing" || order.status === "shipped"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                        className="capitalize"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Account Info</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold font-heading font-bold text-xl overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(displayName)
                )}
              </div>
              <div>
                <p className="font-heading font-semibold text-dark">
                  {displayName}
                </p>
                <p className="text-xs text-medium-gray">{email}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-medium-gray">
                <Package className="w-4 h-4" />
                <span>{orders.length} orders placed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-medium-gray">
                <Heart className="w-4 h-4" />
                <span>{productIds.size} items in wishlist</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-medium-gray">
                <MapPin className="w-4 h-4" />
                <span>{addresses.length} saved addresses</span>
              </div>
            </div>

            <Link href="/account/profile">
              <Button variant="secondary" size="sm" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/shop">
              <Button variant="secondary" size="sm" className="flex items-center gap-2 w-full">
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </Button>
            </Link>
            <Link href="/account/wishlist">
              <Button variant="secondary" size="sm" className="flex items-center gap-2 w-full">
                <Heart className="w-4 h-4" />
                Wishlist
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="secondary" size="sm" className="flex items-center gap-2 w-full">
                <Package className="w-4 h-4" />
                Orders
              </Button>
            </Link>
            <Link href="/account/addresses">
              <Button variant="secondary" size="sm" className="flex items-center gap-2 w-full">
                <MapPin className="w-4 h-4" />
                Addresses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
