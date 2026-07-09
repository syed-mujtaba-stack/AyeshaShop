"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-heading font-bold text-dark">Product not found</h2>
        <Link href="/admin/products" className="text-gold hover:underline mt-2 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold text-dark">{product.name}</h1>
            <p className="text-medium-gray text-sm mt-1">SKU: {product.sku}</p>
          </div>
        </div>
        <Button variant="gold">
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Product Name" defaultValue={product.name} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="SKU" defaultValue={product.sku} />
                <Input label="Price (PKR)" defaultValue={product.price} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Compare Price" defaultValue={product.comparePrice || ""} />
                <Input label="Stock Quantity" defaultValue={product.stockQuantity} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Category</label>
                <Select
                  options={[
                    { label: "Luxury Dresses", value: "luxury-dresses" },
                    { label: "Designer Bags", value: "designer-bags" },
                    { label: "Fine Jewelry", value: "fine-jewelry" },
                    { label: "Premium Beauty", value: "premium-beauty" },
                    { label: "Luxury Perfumes", value: "luxury-perfumes" },
                    { label: "Designer Shoes", value: "designer-shoes" },
                  ]}
                  placeholder={product.category.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Description</label>
                <textarea
                  className="flex h-24 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-dark transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold hover:border-gold/30"
                  defaultValue={product.description}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white border border-border overflow-hidden">
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-medium-gray">Status</span>
                <Badge variant={product.inStock ? "success" : "error"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-medium-gray">Price</span>
                <span className="text-sm font-heading font-bold text-dark">{formatPrice(product.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-medium-gray">Rating</span>
                <span className="text-sm font-medium text-dark">{product.rating} / 5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-medium-gray">Reviews</span>
                <span className="text-sm font-medium text-dark">{product.reviewCount}</span>
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={product.isNew} className="rounded border-border text-gold focus:ring-gold/30" />
                  <span className="text-sm text-dark">New Arrival</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={product.isBestSeller} className="rounded border-border text-gold focus:ring-gold/30" />
                  <span className="text-sm text-dark">Best Seller</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={product.isFeatured} className="rounded border-border text-gold focus:ring-gold/30" />
                  <span className="text-sm text-dark">Featured</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand & Material</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Brand" defaultValue={product.brand.name} />
              <Input label="Material" defaultValue={product.material || ""} />
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Care Instructions</label>
                <textarea
                  className="w-full h-20 rounded-lg border border-border bg-white px-4 py-2 text-sm text-dark transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold hover:border-gold/30"
                  defaultValue={product.careInstructions || ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}