"use client";

import { useState } from "react";
import { Download, FileText, BarChart3, ShoppingBag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatPrice, formatDate } from "@/lib/utils";

const reportTypes = [
  { id: "sales", label: "Sales Report", icon: BarChart3, desc: "Complete sales data with revenue, orders, and trends." },
  { id: "products", label: "Products Report", icon: ShoppingBag, desc: "Product performance, best sellers, and category analysis." },
  { id: "customers", label: "Customers Report", icon: Users, desc: "Customer demographics, acquisition, and retention data." },
  { id: "inventory", label: "Inventory Report", icon: FileText, desc: "Stock levels, low stock alerts, and inventory value." },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this-month");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark">Reports</h1>
          <p className="text-medium-gray text-sm mt-1">Download and analyze store reports.</p>
        </div>
        <div className="w-44">
          <Select
            options={[
              { label: "This Month", value: "this-month" },
              { label: "Last Month", value: "last-month" },
              { label: "This Quarter", value: "this-quarter" },
              { label: "This Year", value: "this-year" },
              { label: "Custom Range", value: "custom" },
            ]}
            placeholder="Date Range"
            defaultValue="this-month"
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-medium-gray">Total Revenue</p>
            <p className="text-2xl font-heading font-bold text-dark mt-1">{formatPrice(3270000)}</p>
            <p className="text-xs text-success mt-1">↑ 12.5% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-medium-gray">Total Orders</p>
            <p className="text-2xl font-heading font-bold text-dark mt-1">234</p>
            <p className="text-xs text-success mt-1">↑ 8.2% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-medium-gray">Avg. Order Value</p>
            <p className="text-2xl font-heading font-bold text-dark mt-1">{formatPrice(13974)}</p>
            <p className="text-xs text-success mt-1">↑ 3.5% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-medium-gray">Conversion Rate</p>
            <p className="text-2xl font-heading font-bold text-dark mt-1">3.8%</p>
            <p className="text-xs text-success mt-1">↑ 0.6% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-heading font-bold text-dark">{report.label}</h3>
                    <p className="text-sm text-medium-gray mt-1">{report.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="gold" size="sm">
                        <Download className="h-4 w-4 mr-1" /> PDF
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4 mr-1" /> CSV
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}