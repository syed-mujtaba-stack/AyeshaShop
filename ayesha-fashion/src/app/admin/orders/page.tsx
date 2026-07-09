"use client";

import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { orders } from "@/data/orders";

const statusTabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = orders.filter((o) => {
    const matchStatus = activeTab === "All" || o.status.toLowerCase() === activeTab.toLowerCase();
    const matchSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark">Orders</h1>
          <p className="text-medium-gray text-sm mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-gold text-white"
                : "bg-white text-dark border border-border hover:border-gold/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select
              options={[
                { label: "All Status", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
              ]}
              placeholder="Filter"
              className="w-full sm:w-40"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Order</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Payment</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Total</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-dark">{order.orderNumber}</td>
                    <td className="px-4 py-4 text-dark">{order.shippingAddress.fullName}</td>
                    <td className="px-4 py-4 text-medium-gray">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-4 text-medium-gray capitalize">{order.paymentMethod.replace("-", " ")}</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{formatPrice(order.total)}</td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium"
                      >
                        <Eye className="h-4 w-4" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-medium-gray">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <span className="text-sm text-medium-gray">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}