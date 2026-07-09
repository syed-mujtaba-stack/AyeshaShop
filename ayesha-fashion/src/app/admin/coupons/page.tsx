"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { Coupon } from "@/types";

const initialCoupons: Coupon[] = [
  { id: "cp-1", code: "WELCOME20", discount: 20, type: "percentage", minPurchase: 5000, maxDiscount: 20000, expiresAt: new Date("2026-06-30"), usageLimit: 100, usedCount: 45 },
  { id: "cp-2", code: "LUXE500", discount: 500, type: "fixed", minPurchase: 10000, expiresAt: new Date("2026-05-15"), usageLimit: 50, usedCount: 12 },
  { id: "cp-3", code: "VIP30", discount: 30, type: "percentage", minPurchase: 15000, maxDiscount: 50000, expiresAt: new Date("2026-12-31"), usageLimit: 200, usedCount: 78 },
  { id: "cp-4", code: "FREESHIP", discount: 499, type: "fixed", minPurchase: 5000, expiresAt: new Date("2026-04-01"), usageLimit: 500, usedCount: 234 },
  { id: "cp-5", code: "SPRING15", discount: 15, type: "percentage", minPurchase: 8000, maxDiscount: 15000, expiresAt: new Date("2026-03-31"), usageLimit: 150, usedCount: 89 },
];

export default function CouponsPage() {
  const [coupons] = useState(initialCoupons);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark">Coupons</h1>
          <p className="text-medium-gray text-sm mt-1">Manage discount coupons and promotions.</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-1" /> Add Coupon
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Code</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Discount</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Min Purchase</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Usage</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Expiry</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => {
                  const isExpired = new Date() > coupon.expiresAt;
                  const usagePercent = (coupon.usedCount / coupon.usageLimit) * 100;
                  return (
                    <tr key={coupon.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-mono font-bold text-dark bg-gold/10 px-2 py-1 rounded text-sm">
                          {coupon.code}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium text-dark">
                        {coupon.type === "percentage" ? `${coupon.discount}%` : formatPrice(coupon.discount)}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={coupon.type === "percentage" ? "gold" : "secondary"}>
                          {coupon.type === "percentage" ? "Percentage" : "Fixed"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-medium-gray">{formatPrice(coupon.minPurchase)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-dark font-medium">
                            {coupon.usedCount}/{coupon.usageLimit}
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-lighter-gray overflow-hidden">
                            <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(usagePercent, 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-medium-gray">{formatDate(coupon.expiresAt)}</td>
                      <td className="px-4 py-4">
                        <Badge variant={isExpired ? "error" : "success"}>
                          {isExpired ? "Expired" : "Active"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-medium-gray hover:text-error transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}