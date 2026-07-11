"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { orders } from "@/data/orders";

const statusSteps = [
  { key: "pending", label: "Pending", icon: Package },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

export default function OrderDetailPage() {
  const params = useParams();
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-heading font-bold text-dark">Order not found</h2>
        <Link href="/admin/orders" className="text-gold hover:underline mt-2 inline-block">
          Back to orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark">{order.orderNumber}</h1>
          <p className="text-medium-gray text-sm mt-1">Order details and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-lighter-gray/50 rounded-lg">
                  <div className="w-16 h-16 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark">{item.product.name}</p>
                    <p className="text-xs text-medium-gray">
                      {item.selectedColor.name} / {item.selectedSize.name} x {item.quantity}
                    </p>
                    <p className="text-xs text-medium-gray">SKU: {item.product.sku}</p>
                  </div>
                  <span className="text-sm font-medium text-dark">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? "bg-gold text-white" : "bg-lighter-gray text-medium-gray"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isCurrent ? "text-gold" : isCompleted ? "text-dark" : "text-medium-gray"}`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                {order.status === "pending" && (
                  <Button variant="gold" size="sm" className="flex-1">Confirm Order</Button>
                )}
                {(order.status === "pending" || order.status === "confirmed" || order.status === "processing") && (
                  <Button variant="destructive" size="sm" className="flex-1">
                    <XCircle className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Subtotal</span>
                <span className="text-dark">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Shipping</span>
                <span className="text-dark">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Discount</span>
                <span className="text-success">{order.discount > 0 ? `-${formatPrice(order.discount)}` : "None"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Tax</span>
                <span className="text-dark">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-heading font-bold pt-3 border-t border-border">
                <span className="text-dark">Total</span>
                <span className="text-gold">{formatPrice(order.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-dark">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-medium-gray">{order.shippingAddress.street}</p>
          <p className="text-sm text-medium-gray">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
          <p className="text-sm text-medium-gray">{order.shippingAddress.country}</p>
          <p className="text-sm text-medium-gray">{order.shippingAddress.phone}</p>
        </CardContent>
      </Card>
    </div>
  );
}