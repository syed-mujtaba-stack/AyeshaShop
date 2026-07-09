"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { orders } from "@/data/orders";

const revenueData = [
  { month: "Jan", revenue: 450000, profit: 180000 },
  { month: "Feb", revenue: 520000, profit: 210000 },
  { month: "Mar", revenue: 480000, profit: 190000 },
  { month: "Apr", revenue: 610000, profit: 250000 },
  { month: "May", revenue: 550000, profit: 220000 },
  { month: "Jun", revenue: 670000, profit: 280000 },
];

const categoryData = [
  { name: "Luxury Dresses", value: 35 },
  { name: "Designer Bags", value: 25 },
  { name: "Fine Jewelry", value: 18 },
  { name: "Designer Shoes", value: 12 },
  { name: "Others", value: 10 },
];

const PIE_COLORS = ["#b8860b", "#daa520", "#8b6914", "#f5e6b8", "#2a2a2a"];

const topProducts = [
  { name: "Midnight Rose Evening Gown", sales: 42, revenue: 7938000 },
  { name: "Celestial Wonder Handbag", sales: 38, revenue: 9310000 },
  { name: "Imperial Pearl Necklace", sales: 25, revenue: 13000000 },
  { name: "Rose Éclat Eau de Parfum", sales: 67, revenue: 3015000 },
  { name: "Stiletto Noir Pumps", sales: 55, revenue: 3575000 },
];

const stats = [
  { title: "Total Revenue", value: 3270000, growth: 12.5, icon: DollarSign, prefix: true },
  { title: "Total Orders", value: 234, growth: 8.2, icon: ShoppingBag, prefix: false },
  { title: "Total Customers", value: 189, growth: 15.3, icon: Users, prefix: false },
  { title: "Total Products", value: 12, growth: -3.1, icon: Package, prefix: false },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Dashboard</h1>
        <p className="text-medium-gray text-sm mt-1">Welcome back, Ayesha. Here is your store overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.growth >= 0;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      isPositive ? "bg-success/10 text-success" : "bg-error/10 text-error"
                    }`}
                  >
                    <ArrowUpRight className={`h-3 w-3 ${!isPositive ? "rotate-180" : ""}`} />
                    {Math.abs(stat.growth)}%
                  </span>
                </div>
                <p className="text-2xl font-heading font-bold text-dark">
                  {stat.prefix ? formatPrice(stat.value) : stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-medium-gray mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `PKR ${(v / 100000).toFixed(1)}L`} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    formatter={(value) => formatPrice(Number(value))}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#b8860b" strokeWidth={2} dot={{ r: 4, fill: "#b8860b" }} name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={2} dot={{ r: 4, fill: "#059669" }} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-dark">{cat.name}</span>
                  </div>
                  <span className="text-medium-gray font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-medium-gray font-medium">Order</th>
                    <th className="text-left px-6 py-3 text-medium-gray font-medium">Customer</th>
                    <th className="text-left px-6 py-3 text-medium-gray font-medium">Date</th>
                    <th className="text-left px-6 py-3 text-medium-gray font-medium">Status</th>
                    <th className="text-right px-6 py-3 text-medium-gray font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-lighter-gray/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-dark">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-dark">{order.shippingAddress.fullName}</td>
                      <td className="px-6 py-4 text-medium-gray">{formatDate(order.createdAt)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-dark">{formatPrice(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3 px-6 py-3">
                  <span className="text-sm font-bold text-gold w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{product.name}</p>
                    <p className="text-xs text-medium-gray">{product.sales} sold</p>
                  </div>
                  <span className="text-sm font-medium text-dark">{formatPrice(product.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}