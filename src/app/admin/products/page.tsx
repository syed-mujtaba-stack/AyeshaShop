"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || p.category.slug === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark">Products</h1>
          <p className="text-medium-gray text-sm mt-1">Manage your product catalog.</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select
              options={[
                { label: "All Categories", value: "" },
                { label: "Luxury Dresses", value: "luxury-dresses" },
                { label: "Designer Bags", value: "designer-bags" },
                { label: "Fine Jewelry", value: "fine-jewelry" },
                { label: "Premium Beauty", value: "premium-beauty" },
                { label: "Luxury Perfumes", value: "luxury-perfumes" },
                { label: "Designer Shoes", value: "designer-shoes" },
              ]}
              placeholder="Category"
              className="w-full sm:w-44"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Select
              options={[
                { label: "All Status", value: "" },
                { label: "In Stock", value: "in-stock" },
                { label: "Out of Stock", value: "out-of-stock" },
              ]}
              placeholder="Status"
              className="w-full sm:w-36"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">SKU</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Category</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Price</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Stock</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-dark truncate max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-medium-gray">{product.sku}</td>
                    <td className="px-4 py-4 text-medium-gray">{product.category.name}</td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{formatPrice(product.price)}</td>
                    <td className="px-4 py-4 text-right text-dark">{product.stockQuantity}</td>
                    <td className="px-4 py-4">
                      <Badge variant={product.inStock ? "success" : "error"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium"
                      >
                        <Eye className="h-4 w-4" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-medium-gray">
                      No products found.
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