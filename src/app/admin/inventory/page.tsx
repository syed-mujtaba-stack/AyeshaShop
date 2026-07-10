"use client";

import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const inventoryData = products.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    image: p.images[0],
    inStock: p.stockQuantity,
    reserved: Math.floor(p.stockQuantity * 0.15),
    available: Math.floor(p.stockQuantity * 0.85),
    lowStock: p.stockQuantity <= 10,
  }));

  const filtered = inventoryData.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchStock = stockFilter === "" || (stockFilter === "low" && item.lowStock) || (stockFilter === "normal" && !item.lowStock);
    return matchSearch && matchStock;
  });

  const lowStockCount = inventoryData.filter((i) => i.lowStock).length;
  const totalStock = inventoryData.reduce((sum, i) => sum + i.inStock, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Inventory</h1>
        <p className="text-medium-gray text-sm mt-1">Monitor stock levels and manage inventory.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-heading font-bold text-dark">{totalStock}</p>
            <p className="text-sm text-medium-gray mt-1">Total Items in Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-heading font-bold text-dark">{products.length}</p>
            <p className="text-sm text-medium-gray mt-1">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <p className="text-2xl font-heading font-bold text-dark">{lowStockCount}</p>
            </div>
            <p className="text-sm text-medium-gray mt-1">Low Stock Alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Search inventory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select
              options={[
                { label: "All Stock Levels", value: "" },
                { label: "Low Stock Only", value: "low" },
                { label: "Normal Stock", value: "normal" },
              ]}
              placeholder="Stock Filter"
              className="w-full sm:w-44"
              onChange={(e) => setStockFilter(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">SKU</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">In Stock</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Reserved</th>
                  <th className="text-right px-4 py-3 text-medium-gray font-medium">Available</th>
                  <th className="text-left px-4 py-3 text-medium-gray font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-dark">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-medium-gray">{item.sku}</td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{item.inStock}</td>
                    <td className="px-4 py-4 text-right text-medium-gray">{item.reserved}</td>
                    <td className="px-4 py-4 text-right font-medium text-dark">{item.available}</td>
                    <td className="px-4 py-4">
                      <Badge variant={item.lowStock ? "warning" : "success"}>
                        {item.lowStock ? "Low Stock" : "In Stock"}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-medium-gray">
                      No inventory items found.
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