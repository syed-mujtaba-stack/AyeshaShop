"use client";

import { useState } from "react";
import Link from "next/link";
import { useFirestoreOrders } from "@/hooks/use-firestore-user";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight } from "lucide-react";
import type { OrderStatus } from "@/types";
import { ORDER_STATUSES } from "@/constants";

const statusFilters: (OrderStatus | "all")[] = ["all", ...ORDER_STATUSES];

export default function OrdersPage() {
  const { orders, loading } = useFirestoreOrders();
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredOrders =
    activeFilter === "all"
      ? sortedOrders
      : sortedOrders.filter((o) => o.status === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-dark">My Orders</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
              activeFilter === status
                ? "bg-gold text-white border-gold"
                : "bg-white text-medium-gray border-border hover:border-gold/30 hover:text-dark"
            }`}
          >
            {status === "all" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-border bg-white p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-lighter-gray" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-lighter-gray rounded w-28" />
                  <div className="h-2 bg-lighter-gray rounded w-40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-light-gray mb-4" />
            <h3 className="font-heading text-xl font-semibold text-dark mb-1">
              No orders found
            </h3>
            <p className="text-medium-gray text-sm mb-6">
              {activeFilter === "all"
                ? "You haven&apos;t placed any orders yet"
                : `No orders with status "${activeFilter}"`}
            </p>
            <Link href="/shop">
              <Button variant="gold">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-lighter-gray flex items-center justify-center">
                        <Package className="w-6 h-6 text-medium-gray" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-dark">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-medium-gray mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-semibold text-dark">
                          {formatPrice(order.total)}
                        </p>
                        <p className="text-xs text-medium-gray">
                          {order.items.length} item(s)
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-light-gray" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
