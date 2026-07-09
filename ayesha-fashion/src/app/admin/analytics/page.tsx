"use client";

import {
  AreaChart,
  Area,
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
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

const revenueProfitData = [
  { month: "Jan", revenue: 450000, profit: 180000 },
  { month: "Feb", revenue: 520000, profit: 210000 },
  { month: "Mar", revenue: 480000, profit: 190000 },
  { month: "Apr", revenue: 610000, profit: 250000 },
  { month: "May", revenue: 550000, profit: 220000 },
  { month: "Jun", revenue: 670000, profit: 280000 },
  { month: "Jul", revenue: 720000, profit: 310000 },
];

const ordersTrendData = [
  { month: "Jan", orders: 28 },
  { month: "Feb", orders: 35 },
  { month: "Mar", orders: 30 },
  { month: "Apr", orders: 42 },
  { month: "May", orders: 38 },
  { month: "Jun", orders: 45 },
  { month: "Jul", orders: 52 },
];

const categoryData = [
  { name: "Luxury Dresses", value: 35 },
  { name: "Designer Bags", value: 25 },
  { name: "Fine Jewelry", value: 18 },
  { name: "Designer Shoes", value: 12 },
  { name: "Premium Beauty", value: 7 },
  { name: "Luxury Perfumes", value: 3 },
];

const customerGrowthData = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 135 },
  { month: "Mar", customers: 148 },
  { month: "Apr", customers: 162 },
  { month: "May", customers: 175 },
  { month: "Jun", customers: 189 },
  { month: "Jul", customers: 210 },
];

const PIE_COLORS = ["#b8860b", "#daa520", "#8b6914", "#f5e6b8", "#2a2a2a", "#6b7280"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Analytics</h1>
        <p className="text-medium-gray text-sm mt-1">Track your store performance and growth metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" /> 12.5%
              </span>
            </div>
            <p className="text-2xl font-heading font-bold text-dark">{formatPrice(3270000)}</p>
            <p className="text-sm text-medium-gray mt-1">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-gold" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" /> 8.2%
              </span>
            </div>
            <p className="text-2xl font-heading font-bold text-dark">234</p>
            <p className="text-sm text-medium-gray mt-1">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" /> 15.3%
              </span>
            </div>
            <p className="text-2xl font-heading font-bold text-dark">189</p>
            <p className="text-sm text-medium-gray mt-1">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-warning" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-error bg-error/10 px-2 py-1 rounded-full">
                <TrendingDown className="h-3 w-3" /> 3.1%
              </span>
            </div>
            <p className="text-2xl font-heading font-bold text-dark">3.2%</p>
            <p className="text-sm text-medium-gray mt-1">Bounce Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue vs Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueProfitData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#b8860b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `PKR ${(v / 100000).toFixed(1)}L`} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} formatter={(value) => formatPrice(Number(value))} />
                  <Area type="monotone" dataKey="revenue" stroke="#b8860b" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue" />
                  <Area type="monotone" dataKey="profit" stroke="#059669" fill="url(#profitGrad)" strokeWidth={2} name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                  <Line type="monotone" dataKey="orders" stroke="#b8860b" strokeWidth={2} dot={{ r: 4, fill: "#b8860b" }} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerGrowthData}>
                  <defs>
                    <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#b8860b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                  <Area type="monotone" dataKey="customers" stroke="#b8860b" fill="url(#custGrad)" strokeWidth={2} name="Customers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}