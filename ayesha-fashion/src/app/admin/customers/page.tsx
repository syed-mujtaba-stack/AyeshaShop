"use client";

import { useState } from "react";
import { Search, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { currentCustomer } from "@/data/customers";

const allCustomers = [
  { ...currentCustomer, id: "c-1", totalOrders: 4, totalSpent: 1219000, joinedAt: new Date("2025-09-01") },
  {
    id: "c-2",
    firstName: "Zara",
    lastName: "Ahmed",
    email: "zara.ahmed@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    totalOrders: 8,
    totalSpent: 2450000,
    joinedAt: new Date("2025-07-15"),
  },
  {
    id: "c-3",
    firstName: "Maya",
    lastName: "Shah",
    email: "maya.shah@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    totalOrders: 12,
    totalSpent: 3890000,
    joinedAt: new Date("2025-05-20"),
  },
  {
    id: "c-4",
    firstName: "Sarah",
    lastName: "Ali",
    email: "sarah.ali@example.com",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=80",
    totalOrders: 6,
    totalSpent: 1875000,
    joinedAt: new Date("2025-10-01"),
  },
  {
    id: "c-5",
    firstName: "Nadia",
    lastName: "Hussain",
    email: "nadia.h@example.com",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
    totalOrders: 15,
    totalSpent: 4520000,
    joinedAt: new Date("2025-03-10"),
  },
  {
    id: "c-6",
    firstName: "Fatima",
    lastName: "Khan",
    email: "fatima.k@example.com",
    avatar: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=200&q=80",
    totalOrders: 3,
    totalSpent: 980000,
    joinedAt: new Date("2026-01-05"),
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = allCustomers.filter(
    (c) =>
      !search ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Customers</h1>
        <p className="text-medium-gray text-sm mt-1">View and manage your customer base.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Email</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Orders</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Total Spent</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Joined</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white border border-border overflow-hidden flex-shrink-0">
                          {customer.avatar ? (
                            <img src={customer.avatar} alt={customer.firstName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full gold-gradient flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {customer.firstName[0]}{customer.lastName[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-dark">
                          {customer.firstName} {customer.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-medium-gray">{customer.email}</td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{customer.totalOrders}</td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{formatPrice(customer.totalSpent)}</td>
                    <td className="px-4 py-4 text-medium-gray">{formatDate(customer.joinedAt)}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium">
                        <Mail className="h-4 w-4" /> Contact
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-medium-gray">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}