"use client";

import { useState } from "react";
import { Search, Check, X, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

const reviewsData = [
  { id: "r-1", product: "Midnight Rose Evening Gown", customer: "Zara Ahmed", rating: 5, comment: "Absolutely stunning! The craftsmanship is incredible and the fit is perfect.", date: new Date("2026-01-20"), status: "approved" },
  { id: "r-2", product: "Celestial Wonder Handbag", customer: "Maya Shah", rating: 4, comment: "Beautiful bag, but the strap is a bit long for my height.", date: new Date("2026-02-05"), status: "pending" },
  { id: "r-3", product: "Imperial Pearl Necklace", customer: "Sarah Ali", rating: 5, comment: "Worth every penny. The pearls are absolutely luminous.", date: new Date("2026-01-28"), status: "approved" },
  { id: "r-4", product: "Stiletto Noir Pumps", customer: "Nadia Hussain", rating: 3, comment: "Beautiful design but runs small. Would recommend sizing up.", date: new Date("2026-02-12"), status: "pending" },
  { id: "r-5", product: "Rose Éclat Eau de Parfum", customer: "Fatima Khan", rating: 5, comment: "The most beautiful rose fragrance I have ever worn.", date: new Date("2026-02-01"), status: "approved" },
  { id: "r-6", product: "Velvet Noir Blazer", customer: "Ayesha Khan", rating: 4, comment: "Elegant and well-tailored. The velvet is incredibly soft.", date: new Date("2026-02-15"), status: "pending" },
  { id: "r-7", product: "Diamond Symphony Cocktail Dress", customer: "Zara Ahmed", rating: 5, comment: "Stole the show at my event. Everyone asked where I got it.", date: new Date("2026-01-10"), status: "approved" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(reviewsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = reviews.filter((r) => {
    const matchSearch = !search || r.product.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (id: string, newStatus: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Reviews</h1>
        <p className="text-medium-gray text-sm mt-1">Moderate customer reviews and ratings.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Search reviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select
              options={[
                { label: "All Status", value: "" },
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
              ]}
              placeholder="Status"
              className="w-full sm:w-36"
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Rating</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Comment</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((review) => (
                  <tr key={review.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-dark">{review.product}</td>
                    <td className="px-4 py-4 text-dark">{review.customer}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < review.rating ? "text-gold fill-gold" : "text-light-gray"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-medium-gray max-w-[250px] truncate">{review.comment}</td>
                    <td className="px-4 py-4 text-medium-gray whitespace-nowrap">{formatDate(review.date)}</td>
                    <td className="px-4 py-4">
                      <Badge variant={review.status === "approved" ? "success" : "warning"}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {review.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleAction(review.id, "approved")}
                              className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleAction(review.id, "rejected")}
                              className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {review.status === "approved" && (
                          <span className="text-xs text-success font-medium">Approved</span>
                        )}
                        {review.status === "rejected" && (
                          <span className="text-xs text-error font-medium">Rejected</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-medium-gray">
                      No reviews found.
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